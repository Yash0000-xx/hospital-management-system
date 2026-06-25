const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
require('dotenv').config();
const dashboardRoutes = require('./routes/dashboard');
const app = express();
const authRoutes = require('./routes/auth');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.get('/api/status', (req, res) => {
  res.json({ message: 'Prisma Server is running perfectly!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
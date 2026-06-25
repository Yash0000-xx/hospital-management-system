const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
require('dotenv').config();
const dashboardRoutes = require('./routes/dashboard');
const app = express();
const billingRoutes = require('./routes/billing');
const authRoutes = require('./routes/auth');
const medicalRoutes = require('./routes/medical');
const pharmacyRoutes = require('./routes/pharmacy');
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
app.use('/api/medical', medicalRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/billing', billingRoutes);
app.use('/api/staff', require('./routes/staff'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/reports', require('./routes/reports'));

app.get('/api/status', (req, res) => {
  res.json({ message: 'Prisma Server is running perfectly!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/summary', async (req, res) => {
  try {
    // Let the database do the work!
    const patientCount = await prisma.patient.count();
    const billingTotal = await prisma.invoice.aggregate({
      _sum: { amount: true }
    });
    const appointmentCount = await prisma.appointment.count();

    res.json({
      totalPatients: patientCount,
      totalRevenue: billingTotal._sum.amount || 0,
      totalAppointments: appointmentCount
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch report data" });
  }
});

module.exports = router;
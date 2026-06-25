const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET: Fetch dashboard statistics
// GET: Fetch dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const patientCount = await prisma.patient.count();
    const doctorCount = await prisma.doctor.count();
    const appointmentCount = await prisma.appointment.count();
    
    // Group appointments by status for our new chart!
    const statusGroups = await prisma.appointment.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    // Format the data perfectly for Recharts [{ name: 'Scheduled', value: 5 }]
    const chartData = statusGroups.map(group => ({
      name: group.status,
      value: group._count.status
    }));
    
    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: {
        patient: true,
        doctor: true
      }
    });

    res.json({
      totalPatients: patientCount,
      totalDoctors: doctorCount,
      totalAppointments: appointmentCount,
      chartData: chartData, // <--- New chart data included!
      recentAppointments: recentAppointments
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

module.exports = router;
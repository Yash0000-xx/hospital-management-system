const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET: Fetch all appointments with patient and doctor details included!
router.get('/', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true, // Magically fetches the full patient profile
        doctor: true   // Magically fetches the full doctor profile
      }
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// POST: Create a new appointment
router.post('/', async (req, res) => {
  try {
    // We need the IDs of the patient and doctor to link them together
    const { patientId, doctorId, date, time, reason, status } = req.body;
    
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: new Date(date), // Prisma requires dates to be formatted as standard Date objects
        time,
        reason,
        status: status || 'Scheduled'
      },
    });
    
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});
// DELETE: Remove an appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.appointment.delete({
      where: { id: id }
    });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Error deleting appointment" });
  }
});
module.exports = router;
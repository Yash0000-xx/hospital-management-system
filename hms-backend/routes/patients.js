const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET: Fetch all patients
router.get('/', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' } // Sort newest first
    });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patients" });
  }
});

// POST: Add a new patient
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, phone, status } = req.body;
    
    // THE FIX: Notice the 'id' field is completely gone! 
    // Prisma will now auto-generate a valid MongoDB ObjectId.
    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: String(age), // Ensuring it matches the schema format safely
        gender,
        phone,
        status: status || 'Active'
      }
    });
    
    res.status(201).json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ message: "Error saving patient" });
  }
});

module.exports = router;
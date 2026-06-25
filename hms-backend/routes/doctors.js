const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); // Import Prisma!

const prisma = new PrismaClient();

// GET: Fetch all doctors
router.get('/', async (req, res) => {
  try {
    // Removed the orderBy rule because we don't have a createdAt field!
    const doctors = await prisma.doctor.findMany(); 
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
});
// POST: Create a new doctor
router.post('/', async (req, res) => {
  try {
    // 1. Grab the correct DOCTOR fields from the frontend
    const { name, specialization, phone, email, status } = req.body;
    
    // 2. Tell Prisma to create a DOCTOR, not a patient
    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        phone,
        email,
        status: status || 'Active'
      },
    });
    
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
});

module.exports = router;
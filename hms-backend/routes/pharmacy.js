const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await prisma.medicine.findMany({
      orderBy: { addedAt: 'desc' }
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory" });
  }
});

// POST a new medicine
router.post('/', async (req, res) => {
  try {
    const { name, category, stock, price, status } = req.body;
    
    // Auto-generate a Medicine ID (e.g. MED-1234)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const medId = `MED-${randomNum}`;

    const newMedicine = await prisma.medicine.create({
      data: { medId, name, category, stock, price, status }
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error: "Error creating medicine" });
  }
});

// DELETE a medicine
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.medicine.delete({
      where: { id: id }
    });
    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting medicine" });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ========================
// CLINICAL RECORDS ROUTES
// ========================

// GET all records
router.get('/records', async (req, res) => {
  try {
    const records = await prisma.clinicalRecord.findMany({ orderBy: { date: 'desc' } });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching records" });
  }
});

// POST new record
router.post('/records', async (req, res) => {
  try {
    const { patient, doctor, diagnosis, prescription } = req.body;
    const randomNum = Math.floor(100 + Math.random() * 900);
    const recordId = `REC-${randomNum}`;

    const newRecord = await prisma.clinicalRecord.create({
      data: { recordId, patient, doctor, diagnosis, prescription }
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: "Error creating record" });
  }
});

// ========================
// LABORATORY TESTS ROUTES
// ========================

// GET all lab tests
router.get('/labs', async (req, res) => {
  try {
    const labs = await prisma.labTest.findMany({ orderBy: { date: 'desc' } });
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching labs" });
  }
});

// POST new lab test
router.post('/labs', async (req, res) => {
  try {
    const { patient, test } = req.body;
    const randomNum = Math.floor(100 + Math.random() * 900);
    const labId = `LAB-${randomNum}`;

    const newLab = await prisma.labTest.create({
      data: { labId, patient, test }
    });
    res.status(201).json(newLab);
  } catch (error) {
    res.status(500).json({ error: "Error creating lab test" });
  }
});

// PUT (Update) lab status
router.put('/labs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, result } = req.body;

    const updatedLab = await prisma.labTest.update({
      where: { id: id },
      data: { status, result }
    });
    res.json(updatedLab);
  } catch (error) {
    res.status(500).json({ error: "Error updating lab" });
  }
});

module.exports = router;
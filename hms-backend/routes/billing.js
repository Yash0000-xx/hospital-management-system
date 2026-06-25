const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Error fetching invoices" });
  }
});

// POST a new invoice
router.post('/', async (req, res) => {
  try {
    const { patient, type, amount, status } = req.body;
    
    // Auto-generate an Invoice ID (e.g. INV-12345)
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const invoiceId = `INV-${randomNum}`;

    const newInvoice = await prisma.invoice.create({
      data: { invoiceId, patient, type, amount, status }
    });
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: "Error creating invoice" });
  }
});

// PUT (Update) invoice status to 'Paid'
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: id },
      data: { status: status }
    });
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: "Error updating invoice" });
  }
});

module.exports = router;
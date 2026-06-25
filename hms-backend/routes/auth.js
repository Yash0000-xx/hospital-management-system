const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = "super_secret_hospital_key_123"; // In a real app, this goes in a .env file!

// POST: Register a new Admin (Run this once to create your account!)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if username already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    // 2. Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save to database
    await prisma.admin.create({
      data: { username, password: hashedPassword }
    });

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Login to get the JWT Wristband
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find the admin
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // 2. Check if password matches the encrypted hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Create the VIP Wristband (Token)
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
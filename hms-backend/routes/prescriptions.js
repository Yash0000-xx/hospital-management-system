const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => res.json(await prisma.prescription.findMany()));
router.post('/', async (req, res) => res.status(201).json(await prisma.prescription.create({ data: req.body })));
module.exports = router;
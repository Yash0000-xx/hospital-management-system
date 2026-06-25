const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const depts = await prisma.department.findMany();
        res.json(depts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
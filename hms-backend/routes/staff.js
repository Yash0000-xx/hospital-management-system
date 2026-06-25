const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => res.json(await prisma.staff.findMany()));
router.post('/', async (req, res) => res.json(await prisma.staff.create({ data: req.body })));
router.put('/:id', async (req, res) => res.json(await prisma.staff.update({ where: { id: req.params.id }, data: req.body })));
router.delete('/:id', async (req, res) => res.json(await prisma.staff.delete({ where: { id: req.params.id } })));

module.exports = router;
const express       = require('express');
const router        = express.Router();
const db            = require('../models');

/* ── GET /api/records ───────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { petId, status, type } = req.query;
    const filter = {};
    if (petId)  filter.petId  = petId;
    if (status) filter.status = status;
    if (type)   filter.type   = type;

    const records = await db.MedicalRecord.findAll({
      where: filter,
      order: [['date', 'DESC']]
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── GET /api/records/:id ───────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const record = await db.MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/records ──────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const record = await db.MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── PUT /api/records/:id ───────────────────────────────── */
router.put('/:id', async (req, res) => {
  try {
    const record = await db.MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    await record.update(req.body);
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── DELETE /api/records/:id ────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const record = await db.MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    await record.destroy();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

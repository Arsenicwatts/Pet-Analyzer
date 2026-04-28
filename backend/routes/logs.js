const express  = require('express');
const router   = express.Router();
const db = require('../models');

/* ── GET /api/logs ──────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { petId, limit = 50, skip = 0 } = req.query;
    const filter = petId ? { petId } : {};
    const logs = await db.DailyLog.findAll({
      where: filter,
      order: [['date', 'DESC']],
      limit: Number(limit),
      offset: Number(skip)
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── GET /api/logs/:id ──────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const log = await db.DailyLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/logs ─────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const log = await db.DailyLog.create(req.body);
    
    // If a weight was included, automatically push it to the pet's weightHistory
    if (req.body.weight !== undefined && req.body.weight !== null && req.body.weight !== '') {
      await db.WeightEntry.create({
        date: req.body.date || new Date(),
        weight: Number(req.body.weight),
        petId: req.body.petId
      });
    }
    
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── PUT /api/logs/:id ──────────────────────────────────── */
router.put('/:id', async (req, res) => {
  try {
    const log = await db.DailyLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    await log.update(req.body);
    res.json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── DELETE /api/logs/:id ───────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const log = await db.DailyLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    await log.destroy();
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const db = require('../models');

/* ── GET /api/pets ──────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const pets = await db.Pet.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: db.WeightEntry, as: 'weightHistory' }]
    });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── GET /api/pets/:id ──────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const pet = await db.Pet.findByPk(req.params.id, {
      include: [{ model: db.WeightEntry, as: 'weightHistory' }]
    });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/pets ─────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const pet = await db.Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── PUT /api/pets/:id ──────────────────────────────────── */
router.put('/:id', async (req, res) => {
  try {
    const pet = await db.Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    await pet.update(req.body);
    const updated = await db.Pet.findByPk(req.params.id, {
      include: [{ model: db.WeightEntry, as: 'weightHistory' }]
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── DELETE /api/pets/:id ───────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const pet = await db.Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    await pet.destroy(); // Cascade is handled by model associations
    res.json({ message: 'Pet and all related data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ── POST /api/pets/:id/weight ──────────────────────────── */
router.post('/:id/weight', async (req, res) => {
  try {
    const pet = await db.Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    const { date, weight } = req.body;
    await db.WeightEntry.create({ date, weight, petId: pet.id });

    const updated = await db.Pet.findByPk(req.params.id, {
      include: [{ model: db.WeightEntry, as: 'weightHistory' }]
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

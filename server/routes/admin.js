const express = require('express');
const Idea = require('../models/idea');
const auth = require('../middleware/auth');
const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ msg: 'Admin only' });
  next();
};

// All ideas
router.get('/ideas', auth, isAdmin, async (req, res) => {
  const ideas = await Idea.find().populate('createdBy', 'name email');
  res.json(ideas);
});

// Review idea
router.put('/idea/:id', auth, isAdmin, async (req, res) => {
  const idea = await Idea.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
      adminReview: req.body.adminReview
    },
    { new: true }
  );
  res.json(idea);
});

// ================= DELETE IDEA =================
router.delete('/idea/:id', auth, isAdmin, async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Idea removed' });
});

module.exports = router;

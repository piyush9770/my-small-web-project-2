const express = require('express');
const Idea = require('../models/idea');
const auth = require('../middleware/auth');
const router = express.Router();

// Submit idea
router.post('/', auth, async (req, res) => {
  const idea = await Idea.create({
    title: req.body.title,
    problem: req.body.problem,
    solution: req.body.solution,
    createdBy: req.user.id
  });
  res.json(idea);
});

// User dashboard ideas
router.get('/my', auth, async (req, res) => {
  const ideas = await Idea.find({ createdBy: req.user.id });
  res.json(ideas);
});


// GET single idea (for result page)
router.get('/:id', auth, async (req, res) => {
  const idea = await Idea.findById(req.params.id)
    .populate('createdBy', 'name email');

  if (!idea) {
    return res.status(404).json({ msg: 'Idea not found' });
  }

  // security: user sirf apni idea dekh sakta
  if (req.user.role !== 'admin' && idea.createdBy._id.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Not allowed' });
  }

  res.json(idea);
});

// ================= USER DASHBOARD IDEAS =================
router.get('/my', auth, async (req, res) => {
  const ideas = await Idea.find({ createdBy: req.user.id });
  res.json(ideas);
});


module.exports = router;

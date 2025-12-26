const router = require('express').Router();
const Idea = require('../models/idea');

router.post('/', async (req, res) => {
  try {
    const score = req.body.problem && req.body.problem.length > 50 ? 80 : 40;

    const idea = await Idea.create({
      ...req.body,
      score,
      risk: score > 60 ? 'Low' : 'High',
      skillGap: score > 60 ? 'None' : 'Backend'
    });

    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
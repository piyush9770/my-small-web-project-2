const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: String,
  problem: String,
  solution: String,

  status: { type: String, default: 'Pending' },

  adminReview: {
    feedbackText: String,
    strengths: [String],
    improvements: [String],
    suggestedSkills: [String],
    readinessPercent: Number
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Idea', IdeaSchema);

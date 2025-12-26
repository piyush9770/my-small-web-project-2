const mongoose = require('mongoose');
module.exports = mongoose.model('Idea', new mongoose.Schema({
  title:String,
  problem:String,
  solution:String,
  score:Number,
  risk:String,
  skillGap:String,
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
}));

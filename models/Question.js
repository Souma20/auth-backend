const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
});

module.exports = mongoose.model('Question', QuestionSchema);
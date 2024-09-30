const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Reply = require('../models/Reply');

// POST a new reply to a question
router.post('/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const reply = new Reply({
      ...req.body,
      question: question._id
    });
    await reply.save();

    question.replies.push(reply);
    await question.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
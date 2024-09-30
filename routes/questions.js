const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST a new question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort('-createdAt');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific question with its replies
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('replies');
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
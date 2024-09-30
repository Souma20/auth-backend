require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questions');
const replyRoutes = require('./routes/replies');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/replies', replyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
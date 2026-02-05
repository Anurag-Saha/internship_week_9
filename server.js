const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Blog API is running',
    time: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

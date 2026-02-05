const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const postRoutes = require('./src/routes/postRoutes');


// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Blog API is running',
    time: new Date().toISOString()
  });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

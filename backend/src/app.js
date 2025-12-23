const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://frontend:3000', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date()
    }
  });
});

module.exports = app;

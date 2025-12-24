const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Core middleware FIRST
app.use(cors({
  origin: ['http://frontend:3000', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/auth.routes');
const tenantRoutes = require('./routes/tenant.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ Health check
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

// ✅ Error handler MUST be last
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

module.exports = app;

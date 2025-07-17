const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const trainingRoutes = require('./routes/training');
const simulationRoutes = require('./routes/simulation');
const analyticsRoutes = require('./routes/analytics');
const reportRoutes = require('./routes/reports');
const adminRoutes = require('./routes/admin');
const consultantRoutes = require('./routes/consultant');
const profileRoutes = require('./routes/profile');
const lawBridgeRoutes = require('./routes/lawBridge');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/consultant', consultantRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/law-bridge', lawBridgeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simplicomply');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.mongoConnected = true;
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed, running in development mode:', error.message);
    global.mongoConnected = false;
    return false;
  }
};

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  const dbConnected = await connectDB();
  if (!dbConnected) {
    console.log('⚠️  Running without MongoDB - For testing only!');
    console.log('\n📋 Available test users for development:');
    console.log('   👤 test@example.com / password123 (User)');
    console.log('   👤 admin@example.com / admin123 (Admin)');
    console.log('   👤 manager@example.com / manager123 (Manager)');
    console.log('');
  }
  app.listen(PORT, () => {
    console.log(`🚀 SimpliComply Backend Server running on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

module.exports = app;

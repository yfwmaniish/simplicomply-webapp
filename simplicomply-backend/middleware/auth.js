const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Conditionally load User model only if MongoDB is available
let User;
try {
  User = require('../models/User');
} catch (error) {
  console.warn('User model not loaded in development mode');
}

// Development mode user storage
let developmentUsers = [
  {
    _id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password123',
    jobTitle: 'Developer',
    department: 'Engineering',
    company: 'Test Company',
    role: 'user',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date()
  },
  {
    _id: 2,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    jobTitle: 'Administrator',
    department: 'IT',
    company: 'Test Company',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date()
  },
  {
    _id: 3,
    firstName: 'Manager',
    lastName: 'User',
    email: 'manager@example.com',
    password: 'manager123',
    jobTitle: 'Manager',
    department: 'Operations',
    company: 'Test Company',
    role: 'manager',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date()
  }
];

// Check if MongoDB is available
const isMongoAvailable = () => {
  return global.mongoConnected === true;
};

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    // Development mode (no MongoDB)
    if (!isMongoAvailable()) {
      user = developmentUsers.find(u => u._id === decoded.id);
    } else {
      // Production mode (with MongoDB)
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

// Middleware to check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please authenticate.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    // Development mode (no MongoDB)
    if (!isMongoAvailable()) {
      user = developmentUsers.find(u => u._id === decoded.id);
    } else {
      // Production mode (with MongoDB)
      user = await User.findById(decoded.id);
    }

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};

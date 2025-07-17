const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// In-memory storage for development mode (when MongoDB is not available)
let developmentUsers = [
  // Default test users for development
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
let developmentUserIdCounter = 4;

// Check if MongoDB is available
const mongoose = require('mongoose');
const isMongoAvailable = () => {
  return mongoose.connection.readyState === 1;
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, jobTitle, department, company, role } = req.body;

    // Development mode (no MongoDB)
    if (!isMongoAvailable()) {
      console.log('🔧 Development mode: Registering user without MongoDB');
      
      // Check if user already exists in development storage
      const existingUser = developmentUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      // Create user in development storage
      const userId = developmentUserIdCounter++;
      const user = {
        _id: userId,
        firstName,
        lastName,
        email,
        password, // In real app, this would be hashed
        jobTitle: jobTitle || '',
        department: department || '',
        company: company || '',
        role: role || 'user',
        isActive: true,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      developmentUsers.push(user);
      console.log('📝 Development user created:', { email, role: user.role });

      // Generate token
      const token = generateToken(userId);

      res.status(201).json({
        success: true,
        message: 'User registered successfully (Development Mode)',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            jobTitle: user.jobTitle,
            department: user.department,
            company: user.company,
            role: user.role,
            isActive: user.isActive
          },
          token
        }
      });
      return;
    }

    // Production mode (with MongoDB)
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      jobTitle,
      department,
      company,
      role
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.getProfileSummary(),
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Development mode (no MongoDB)
    if (!isMongoAvailable()) {
      console.log('🔧 Development mode: Logging in user without MongoDB');
      
      // Find user in development storage
      const user = developmentUsers.find(u => u.email === email);
      
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Simple password check (in real app, would use bcrypt)
      if (user.password !== password) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Update last login
      user.lastLogin = new Date();
      console.log('✅ Development user logged in:', { email, role: user.role });

      // Generate token
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful (Development Mode)',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            jobTitle: user.jobTitle,
            department: user.department,
            company: user.company,
            role: user.role,
            isActive: user.isActive
          },
          token
        }
      });
      return;
    }

    // Production mode (with MongoDB)
    const user = await User.findByEmail(email).select('+password');
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts && user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.getProfileSummary(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, department, company } = req.body;

    if (!isMongoAvailable()) {
      console.log('🔧 Development mode: Updating current user without MongoDB');
      const user = developmentUsers.find(u => u._id == req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.jobTitle = jobTitle || user.jobTitle;
      user.department = department || user.department;
      user.company = company || user.company;

      res.json({
        success: true,
        message: 'Profile updated successfully (Development Mode)',
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          jobTitle: user.jobTitle,
          department: user.department,
          company: user.company,
          role: user.role,
          isActive: user.isActive
        }
      });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.jobTitle = jobTitle || user.jobTitle;
    user.department = department || user.department;
    user.company = company || user.company;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getProfileSummary()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!isMongoAvailable()) {
      console.log('🔧 Development mode: Resetting password without MongoDB');
      const user = developmentUsers.find(u => u.email === email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      user.password = newPassword;

      res.json({
        success: true,
        message: 'Password reset successfully (Development Mode)'
      });
      return;
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

const getMe = async (req, res) => {
  try {
    // Development mode (no MongoDB)
    if (!isMongoAvailable()) {
      console.log('🔧 Development mode: Getting current user without MongoDB');
      
      // Find user in development storage
      const user = developmentUsers.find(u => u._id == req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          jobTitle: user.jobTitle,
          department: user.department,
          company: user.company,
          role: user.role,
          isActive: user.isActive
        }
      });
      return;
    }

    // Production mode (with MongoDB)
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.getProfileSummary()
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  resetPassword
};

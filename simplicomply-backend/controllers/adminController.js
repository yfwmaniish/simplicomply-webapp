const bcrypt = require('bcrypt');

// Mock data for admin functionality
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@simplicomply.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-07-17')
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date('2024-07-16')
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'consultant',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-07-10')
  }
];

const mockAuditLogs = [
  {
    id: 1,
    userId: 1,
    action: 'User Login',
    resource: 'Authentication',
    timestamp: new Date('2024-07-17T09:30:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Successful login attempt'
  },
  {
    id: 2,
    userId: 2,
    action: 'Training Completion',
    resource: 'Training Module',
    timestamp: new Date('2024-07-17T10:15:00'),
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Completed GDPR Compliance Training'
  },
  {
    id: 3,
    userId: 1,
    action: 'User Created',
    resource: 'User Management',
    timestamp: new Date('2024-07-17T11:00:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Created new user account for jane_smith'
  }
];

const mockSystemSettings = {
  general: {
    companyName: 'SimplicomplyApp Corp',
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    language: 'en',
    maintenanceMode: false
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorEnabled: true
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    complianceAlerts: true
  },
  compliance: {
    auditRetentionDays: 365,
    reportSchedule: 'monthly',
    autoBackup: true,
    encryptionEnabled: true
  }
};

const mockSystemStats = {
  users: {
    total: 1247,
    active: 1098,
    inactive: 149,
    newThisMonth: 23
  },
  system: {
    uptime: '99.9%',
    cpuUsage: '15%',
    memoryUsage: '68%',
    storageUsage: '45%'
  },
  compliance: {
    totalPolicies: 156,
    activePolicies: 142,
    expiringSoon: 8,
    overdue: 6
  },
  training: {
    totalModules: 45,
    completedThisMonth: 342,
    averageScore: 87.5,
    completionRate: 78.3
  }
};

// Get admin dashboard overview
exports.getDashboard = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        stats: mockSystemStats,
        recentActivity: mockAuditLogs.slice(0, 5),
        alerts: [
          {
            type: 'warning',
            message: '8 compliance policies expiring within 30 days',
            timestamp: new Date()
          },
          {
            type: 'info',
            message: 'System backup completed successfully',
            timestamp: new Date()
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin dashboard',
      error: error.message
    });
  }
};

// User management endpoints
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const role = req.query.role;
    
    let filteredUsers = mockUsers;
    
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredUsers.length / limit),
          totalUsers: filteredUsers.length,
          hasNext: endIndex < filteredUsers.length,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Validate required fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      username,
      email,
      role,
      status: 'active',
      createdAt: new Date(),
      lastLogin: null
    };
    
    mockUsers.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, email, role, status } = req.body;
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user
    if (username) mockUsers[userIndex].username = username;
    if (email) mockUsers[userIndex].email = email;
    if (role) mockUsers[userIndex].role = role;
    if (status) mockUsers[userIndex].status = status;
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: mockUsers[userIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    mockUsers.splice(userIndex, 1);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// System settings endpoints
exports.getSystemSettings = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockSystemSettings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching system settings',
      error: error.message
    });
  }
};

exports.updateSystemSettings = async (req, res) => {
  try {
    const { category, settings } = req.body;
    
    if (!category || !settings) {
      return res.status(400).json({
        success: false,
        message: 'Category and settings are required'
      });
    }
    
    if (mockSystemSettings[category]) {
      mockSystemSettings[category] = { ...mockSystemSettings[category], ...settings };
    }
    
    res.json({
      success: true,
      message: 'System settings updated successfully',
      data: mockSystemSettings[category]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating system settings',
      error: error.message
    });
  }
};

// Audit logs endpoints
exports.getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const action = req.query.action;
    const userId = req.query.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    
    let filteredLogs = mockAuditLogs;
    
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action.toLowerCase().includes(action.toLowerCase()));
    }
    
    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === parseInt(userId));
    }
    
    if (startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(startDate));
    }
    
    if (endDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(endDate));
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        logs: paginatedLogs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredLogs.length / limit),
          totalLogs: filteredLogs.length,
          hasNext: endIndex < filteredLogs.length,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching audit logs',
      error: error.message
    });
  }
};

// System monitoring endpoints
exports.getSystemHealth = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        status: 'healthy',
        uptime: '99.9%',
        services: {
          database: { status: 'connected', responseTime: '12ms' },
          cache: { status: 'connected', responseTime: '3ms' },
          email: { status: 'connected', responseTime: '45ms' },
          storage: { status: 'connected', responseTime: '8ms' }
        },
        performance: {
          cpu: '15%',
          memory: '68%',
          disk: '45%',
          network: '2.3 MB/s'
        },
        lastChecked: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching system health',
      error: error.message
    });
  }
};

exports.getSystemLogs = async (req, res) => {
  try {
    const level = req.query.level || 'all';
    const limit = parseInt(req.query.limit) || 50;
    
    const mockSystemLogs = [
      {
        id: 1,
        level: 'info',
        message: 'User authentication successful',
        timestamp: new Date(),
        service: 'auth'
      },
      {
        id: 2,
        level: 'warning',
        message: 'High memory usage detected',
        timestamp: new Date(),
        service: 'system'
      },
      {
        id: 3,
        level: 'error',
        message: 'Database connection timeout',
        timestamp: new Date(),
        service: 'database'
      }
    ];
    
    let filteredLogs = mockSystemLogs;
    if (level !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.level === level);
    }
    
    res.json({
      success: true,
      data: {
        logs: filteredLogs.slice(0, limit),
        total: filteredLogs.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching system logs',
      error: error.message
    });
  }
};

// Mock data for training modules
const mockTrainingData = {
  modules: [
    {
      id: 1,
      title: 'GDPR Fundamentals',
      description: 'Learn the basics of General Data Protection Regulation',
      category: 'Privacy',
      difficulty: 'Beginner',
      duration: '45 minutes',
      status: 'active',
      completionRate: 87,
      enrolledUsers: 245,
      topics: [
        'What is GDPR',
        'Data Subject Rights',
        'Lawful Basis for Processing',
        'Data Protection Impact Assessment'
      ],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'HIPAA Privacy Training',
      description: 'Comprehensive HIPAA privacy and security training',
      category: 'Healthcare',
      difficulty: 'Intermediate',
      duration: '60 minutes',
      status: 'active',
      completionRate: 92,
      enrolledUsers: 156,
      topics: [
        'HIPAA Privacy Rule',
        'Security Rule',
        'Breach Notification',
        'Patient Rights'
      ],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: 3,
      title: 'SOX Compliance Training',
      description: 'Sarbanes-Oxley Act compliance for financial reporting',
      category: 'Financial',
      difficulty: 'Advanced',
      duration: '90 minutes',
      status: 'active',
      completionRate: 74,
      enrolledUsers: 89,
      topics: [
        'SOX Overview',
        'Internal Controls',
        'Financial Reporting',
        'Audit Requirements'
      ],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: 4,
      title: 'PCI DSS Security Standards',
      description: 'Payment Card Industry Data Security Standard training',
      category: 'Security',
      difficulty: 'Intermediate',
      duration: '75 minutes',
      status: 'active',
      completionRate: 81,
      enrolledUsers: 123,
      topics: [
        'PCI DSS Requirements',
        'Secure Network',
        'Cardholder Data Protection',
        'Vulnerability Management'
      ],
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-08')
    },
    {
      id: 5,
      title: 'ISO 27001 Information Security',
      description: 'Information Security Management System training',
      category: 'Security',
      difficulty: 'Advanced',
      duration: '120 minutes',
      status: 'draft',
      completionRate: 0,
      enrolledUsers: 0,
      topics: [
        'ISMS Framework',
        'Risk Assessment',
        'Security Controls',
        'Continuous Improvement'
      ],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    }
  ],
  
  userProgress: [
    {
      userId: 1,
      moduleId: 1,
      progress: 75,
      status: 'in_progress',
      startedAt: new Date('2024-01-12'),
      completedAt: null,
      score: null
    },
    {
      userId: 1,
      moduleId: 2,
      progress: 100,
      status: 'completed',
      startedAt: new Date('2024-01-08'),
      completedAt: new Date('2024-01-10'),
      score: 95
    },
    {
      userId: 2,
      moduleId: 1,
      progress: 100,
      status: 'completed',
      startedAt: new Date('2024-01-10'),
      completedAt: new Date('2024-01-12'),
      score: 88
    },
    {
      userId: 3,
      moduleId: 3,
      progress: 50,
      status: 'in_progress',
      startedAt: new Date('2024-01-15'),
      completedAt: null,
      score: null
    }
  ],
  
  assignments: [
    {
      id: 1,
      title: 'Q1 GDPR Compliance Training',
      description: 'Mandatory GDPR training for all employees',
      moduleId: 1,
      assignedBy: 'admin@example.com',
      assignedTo: 'all',
      dueDate: new Date('2024-02-01'),
      status: 'active',
      completionRate: 67,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Healthcare Staff HIPAA Training',
      description: 'HIPAA training for healthcare department',
      moduleId: 2,
      assignedBy: 'manager@example.com',
      assignedTo: 'healthcare',
      dueDate: new Date('2024-01-30'),
      status: 'active',
      completionRate: 85,
      createdAt: new Date('2024-01-10')
    }
  ]
};

// Get all training modules
const getTrainingModules = async (req, res) => {
  try {
    const { status, category, difficulty, page = 1, limit = 10 } = req.query;
    
    let filteredModules = mockTrainingData.modules;
    
    // Apply filters
    if (status) {
      filteredModules = filteredModules.filter(module => module.status === status);
    }
    
    if (category) {
      filteredModules = filteredModules.filter(module => module.category === category);
    }
    
    if (difficulty) {
      filteredModules = filteredModules.filter(module => module.difficulty === difficulty);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedModules = filteredModules.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        modules: paginatedModules,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredModules.length / limit),
          totalItems: filteredModules.length,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get training modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training modules',
      error: error.message
    });
  }
};

// Get training module by ID
const getTrainingModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = mockTrainingData.modules.find(m => m.id === parseInt(id));
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Training module not found'
      });
    }
    
    res.json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error('Get training module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training module',
      error: error.message
    });
  }
};

// Create new training module
const createTrainingModule = async (req, res) => {
  try {
    const { title, description, category, difficulty, duration, topics } = req.body;
    
    const newModule = {
      id: Math.max(...mockTrainingData.modules.map(m => m.id)) + 1,
      title,
      description,
      category,
      difficulty,
      duration,
      status: 'draft',
      completionRate: 0,
      enrolledUsers: 0,
      topics: topics || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockTrainingData.modules.push(newModule);
    
    res.status(201).json({
      success: true,
      message: 'Training module created successfully',
      data: newModule
    });
  } catch (error) {
    console.error('Create training module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create training module',
      error: error.message
    });
  }
};

// Update training module
const updateTrainingModule = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const moduleIndex = mockTrainingData.modules.findIndex(m => m.id === parseInt(id));
    
    if (moduleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Training module not found'
      });
    }
    
    mockTrainingData.modules[moduleIndex] = {
      ...mockTrainingData.modules[moduleIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    res.json({
      success: true,
      message: 'Training module updated successfully',
      data: mockTrainingData.modules[moduleIndex]
    });
  } catch (error) {
    console.error('Update training module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update training module',
      error: error.message
    });
  }
};

// Delete training module
const deleteTrainingModule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const moduleIndex = mockTrainingData.modules.findIndex(m => m.id === parseInt(id));
    
    if (moduleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Training module not found'
      });
    }
    
    mockTrainingData.modules.splice(moduleIndex, 1);
    
    res.json({
      success: true,
      message: 'Training module deleted successfully'
    });
  } catch (error) {
    console.error('Delete training module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete training module',
      error: error.message
    });
  }
};

// Get user progress for a specific module
const getUserProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.id;
    
    const progress = mockTrainingData.userProgress.find(
      p => p.userId === userId && p.moduleId === parseInt(moduleId)
    );
    
    if (!progress) {
      return res.json({
        success: true,
        data: {
          progress: 0,
          status: 'not_started',
          startedAt: null,
          completedAt: null,
          score: null
        }
      });
    }
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user progress',
      error: error.message
    });
  }
};

// Update user progress
const updateUserProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { progress, status, score } = req.body;
    const userId = req.user.id;
    
    const existingProgressIndex = mockTrainingData.userProgress.findIndex(
      p => p.userId === userId && p.moduleId === parseInt(moduleId)
    );
    
    if (existingProgressIndex === -1) {
      // Create new progress entry
      const newProgress = {
        userId,
        moduleId: parseInt(moduleId),
        progress: progress || 0,
        status: status || 'in_progress',
        startedAt: new Date(),
        completedAt: status === 'completed' ? new Date() : null,
        score: score || null
      };
      
      mockTrainingData.userProgress.push(newProgress);
      
      res.json({
        success: true,
        message: 'Progress updated successfully',
        data: newProgress
      });
    } else {
      // Update existing progress
      mockTrainingData.userProgress[existingProgressIndex] = {
        ...mockTrainingData.userProgress[existingProgressIndex],
        progress: progress || mockTrainingData.userProgress[existingProgressIndex].progress,
        status: status || mockTrainingData.userProgress[existingProgressIndex].status,
        completedAt: status === 'completed' ? new Date() : mockTrainingData.userProgress[existingProgressIndex].completedAt,
        score: score || mockTrainingData.userProgress[existingProgressIndex].score
      };
      
      res.json({
        success: true,
        message: 'Progress updated successfully',
        data: mockTrainingData.userProgress[existingProgressIndex]
      });
    }
  } catch (error) {
    console.error('Update user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user progress',
      error: error.message
    });
  }
};

// Get training assignments
const getTrainingAssignments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filteredAssignments = mockTrainingData.assignments;
    
    if (status) {
      filteredAssignments = filteredAssignments.filter(assignment => assignment.status === status);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        assignments: paginatedAssignments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredAssignments.length / limit),
          totalItems: filteredAssignments.length,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get training assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training assignments',
      error: error.message
    });
  }
};

// Create training assignment
const createTrainingAssignment = async (req, res) => {
  try {
    const { title, description, moduleId, assignedTo, dueDate } = req.body;
    
    const newAssignment = {
      id: Math.max(...mockTrainingData.assignments.map(a => a.id)) + 1,
      title,
      description,
      moduleId: parseInt(moduleId),
      assignedBy: req.user.email,
      assignedTo,
      dueDate: new Date(dueDate),
      status: 'active',
      completionRate: 0,
      createdAt: new Date()
    };
    
    mockTrainingData.assignments.push(newAssignment);
    
    res.status(201).json({
      success: true,
      message: 'Training assignment created successfully',
      data: newAssignment
    });
  } catch (error) {
    console.error('Create training assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create training assignment',
      error: error.message
    });
  }
};

// Get training statistics
const getTrainingStatistics = async (req, res) => {
  try {
    const stats = {
      totalModules: mockTrainingData.modules.length,
      activeModules: mockTrainingData.modules.filter(m => m.status === 'active').length,
      draftModules: mockTrainingData.modules.filter(m => m.status === 'draft').length,
      totalAssignments: mockTrainingData.assignments.length,
      activeAssignments: mockTrainingData.assignments.filter(a => a.status === 'active').length,
      averageCompletionRate: Math.round(
        mockTrainingData.modules.reduce((sum, m) => sum + m.completionRate, 0) / mockTrainingData.modules.length
      ),
      categoriesStats: mockTrainingData.modules.reduce((acc, module) => {
        acc[module.category] = (acc[module.category] || 0) + 1;
        return acc;
      }, {}),
      difficultyStats: mockTrainingData.modules.reduce((acc, module) => {
        acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        return acc;
      }, {})
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get training statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training statistics',
      error: error.message
    });
  }
};

module.exports = {
  getTrainingModules,
  getTrainingModule,
  createTrainingModule,
  updateTrainingModule,
  deleteTrainingModule,
  getUserProgress,
  updateUserProgress,
  getTrainingAssignments,
  createTrainingAssignment,
  getTrainingStatistics
};

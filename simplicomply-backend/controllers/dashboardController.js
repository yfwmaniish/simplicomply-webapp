const User = require('../models/User');

// Mock data for development mode (when MongoDB is not available)
const mockData = {
  stats: {
    activeUsers: 247,
    complianceScore: 92,
    activeSimulations: 8,
    pendingReviews: 15,
    monthlyChanges: {
      activeUsers: 12,
      complianceScore: 5,
      activeSimulations: 3,
      pendingReviews: -2
    }
  },
  
  recentActivities: [
    {
      id: 1,
      type: 'simulation',
      title: 'GDPR Data Breach Simulation completed',
      user: 'IT Department',
      time: '2 hours ago',
      status: 'completed',
      icon: 'Brain'
    },
    {
      id: 2,
      type: 'training',
      title: 'HIPAA Privacy Training assigned',
      user: 'HR Team',
      time: '4 hours ago',
      status: 'pending',
      icon: 'BookOpen'
    },
    {
      id: 3,
      type: 'report',
      title: 'Quarterly Compliance Report generated',
      user: 'Legal Team',
      time: '1 day ago',
      status: 'completed',
      icon: 'FileText'
    },
    {
      id: 4,
      type: 'alert',
      title: 'PCI DSS compliance check failed',
      user: 'Finance Team',
      time: '2 days ago',
      status: 'critical',
      icon: 'AlertTriangle'
    },
    {
      id: 5,
      type: 'training',
      title: 'SOX Training Module completed',
      user: 'Finance Team',
      time: '3 days ago',
      status: 'completed',
      icon: 'BookOpen'
    }
  ],
  
  upcomingDeadlines: [
    {
      id: 1,
      title: 'SOX Financial Controls Assessment',
      dueDate: '2024-01-25',
      priority: 'High',
      department: 'Finance',
      progress: 75,
      assignedTo: 'John Smith',
      description: 'Annual SOX compliance assessment for financial controls'
    },
    {
      id: 2,
      title: 'GDPR Data Processing Training',
      dueDate: '2024-01-28',
      priority: 'Medium',
      department: 'IT',
      progress: 45,
      assignedTo: 'IT Team',
      description: 'Mandatory GDPR training for all IT personnel'
    },
    {
      id: 3,
      title: 'ISO 27001 Security Review',
      dueDate: '2024-02-02',
      priority: 'High',
      department: 'Security',
      progress: 30,
      assignedTo: 'Security Team',
      description: 'Quarterly security review and assessment'
    },
    {
      id: 4,
      title: 'HIPAA Risk Assessment',
      dueDate: '2024-02-05',
      priority: 'Medium',
      department: 'Healthcare',
      progress: 60,
      assignedTo: 'Healthcare Team',
      description: 'Annual HIPAA risk assessment and compliance check'
    }
  ],
  
  complianceMetrics: [
    { name: 'GDPR', score: 95, trend: 'up', lastUpdated: '2024-01-15' },
    { name: 'PCI DSS', score: 88, trend: 'up', lastUpdated: '2024-01-14' },
    { name: 'HIPAA', score: 92, trend: 'stable', lastUpdated: '2024-01-13' },
    { name: 'SOX', score: 78, trend: 'down', lastUpdated: '2024-01-12' },
    { name: 'ISO 27001', score: 85, trend: 'up', lastUpdated: '2024-01-11' },
    { name: 'CCPA', score: 82, trend: 'up', lastUpdated: '2024-01-10' }
  ],
  
  quickActions: [
    { id: 1, name: 'Start Simulation', icon: 'Brain', color: 'blue', action: 'simulations' },
    { id: 2, name: 'Generate Report', icon: 'FileText', color: 'green', action: 'reports' },
    { id: 3, name: 'Manage Users', icon: 'Users', color: 'purple', action: 'admin' },
    { id: 4, name: 'View Resources', icon: 'BookOpen', color: 'orange', action: 'training' }
  ],
  
  systemAlerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Compliance Score Below Target',
      message: 'SOX compliance score has dropped below 80%',
      severity: 'medium',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'info',
      title: 'Training Deadline Approaching',
      message: 'GDPR training deadline is in 3 days',
      severity: 'low',
      timestamp: new Date().toISOString()
    }
  ]
};

// Get dashboard overview data
const getDashboardOverview = async (req, res) => {
  try {
    // In development mode, return mock data
    if (!global.mongoConnected) {
      return res.json({
        success: true,
        data: {
          stats: mockData.stats,
          recentActivities: mockData.recentActivities.slice(0, 5),
          upcomingDeadlines: mockData.upcomingDeadlines.slice(0, 3),
          complianceMetrics: mockData.complianceMetrics,
          systemAlerts: mockData.systemAlerts
        }
      });
    }

    // TODO: Implement real database queries when MongoDB is connected
    // For now, return mock data even in production
    res.json({
      success: true,
      data: {
        stats: mockData.stats,
        recentActivities: mockData.recentActivities.slice(0, 5),
        upcomingDeadlines: mockData.upcomingDeadlines.slice(0, 3),
        complianceMetrics: mockData.complianceMetrics,
        systemAlerts: mockData.systemAlerts
      }
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard overview',
      error: error.message
    });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const stats = [
      {
        title: 'Active Users',
        value: mockData.stats.activeUsers.toString(),
        change: `+${mockData.stats.monthlyChanges.activeUsers}%`,
        changeType: 'increase',
        icon: 'Users',
        color: 'bg-blue-500'
      },
      {
        title: 'Compliance Score',
        value: `${mockData.stats.complianceScore}%`,
        change: `+${mockData.stats.monthlyChanges.complianceScore}%`,
        changeType: 'increase',
        icon: 'Shield',
        color: 'bg-green-500'
      },
      {
        title: 'Active Simulations',
        value: mockData.stats.activeSimulations.toString(),
        change: `+${mockData.stats.monthlyChanges.activeSimulations}`,
        changeType: 'increase',
        icon: 'Brain',
        color: 'bg-purple-500'
      },
      {
        title: 'Pending Reviews',
        value: mockData.stats.pendingReviews.toString(),
        change: `${mockData.stats.monthlyChanges.pendingReviews}`,
        changeType: 'decrease',
        icon: 'Clock',
        color: 'bg-orange-500'
      }
    ];

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Get recent activities
const getRecentActivities = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const activities = mockData.recentActivities.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Recent activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
      error: error.message
    });
  }
};

// Get upcoming deadlines
const getUpcomingDeadlines = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const deadlines = mockData.upcomingDeadlines.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: deadlines
    });
  } catch (error) {
    console.error('Upcoming deadlines error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming deadlines',
      error: error.message
    });
  }
};

// Get compliance metrics
const getComplianceMetrics = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.complianceMetrics
    });
  } catch (error) {
    console.error('Compliance metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch compliance metrics',
      error: error.message
    });
  }
};

// Get quick actions
const getQuickActions = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.quickActions
    });
  } catch (error) {
    console.error('Quick actions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quick actions',
      error: error.message
    });
  }
};

// Get system alerts
const getSystemAlerts = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.systemAlerts
    });
  } catch (error) {
    console.error('System alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system alerts',
      error: error.message
    });
  }
};

// Mark alert as read
const markAlertAsRead = async (req, res) => {
  try {
    const { alertId } = req.params;
    
    // In development mode, just return success
    if (!global.mongoConnected) {
      return res.json({
        success: true,
        message: 'Alert marked as read'
      });
    }

    // TODO: Implement real database update when MongoDB is connected
    res.json({
      success: true,
      message: 'Alert marked as read'
    });
  } catch (error) {
    console.error('Mark alert as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark alert as read',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardOverview,
  getDashboardStats,
  getRecentActivities,
  getUpcomingDeadlines,
  getComplianceMetrics,
  getQuickActions,
  getSystemAlerts,
  markAlertAsRead
};

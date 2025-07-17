const express = require('express');
const router = express.Router();
const {
  getDashboardOverview,
  getDashboardStats,
  getRecentActivities,
  getUpcomingDeadlines,
  getComplianceMetrics,
  getQuickActions,
  getSystemAlerts,
  markAlertAsRead
} = require('../controllers/dashboardController');

// Dashboard overview - all data in one endpoint
router.get('/', getDashboardOverview);

// Individual dashboard endpoints
router.get('/stats', getDashboardStats);
router.get('/activities', getRecentActivities);
router.get('/deadlines', getUpcomingDeadlines);
router.get('/compliance', getComplianceMetrics);
router.get('/actions', getQuickActions);
router.get('/alerts', getSystemAlerts);

// Alert management
router.patch('/alerts/:alertId/read', markAlertAsRead);

module.exports = router;

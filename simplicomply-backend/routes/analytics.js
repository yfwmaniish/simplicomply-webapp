const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getComplianceDashboard,
  getComplianceScores,
  getRiskAssessments,
  getTrainingAnalytics,
  getAuditHistory,
  getPerformanceTrends
} = require('../controllers/analyticsController');

// Protected routes - authentication required
router.get('/dashboard', authenticate, getComplianceDashboard);
router.get('/compliance-scores', authenticate, getComplianceScores);
router.get('/risk-assessments', authenticate, getRiskAssessments);
router.get('/training-analytics', authenticate, getTrainingAnalytics);
router.get('/audit-history', authenticate, getAuditHistory);
router.get('/performance-trends', authenticate, getPerformanceTrends);

module.exports = router;

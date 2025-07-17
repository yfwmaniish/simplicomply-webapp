const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getComplianceDashboard,
  getComplianceScores,
  getRiskAssessments,
  getTrainingAnalytics,
  getAuditHistory,
  getPerformanceTrends
} = require('../controllers/analyticsController');

// Protected routes - authentication required
router.get('/dashboard', authenticateToken, getComplianceDashboard);
router.get('/compliance-scores', authenticateToken, getComplianceScores);
router.get('/risk-assessments', authenticateToken, getRiskAssessments);
router.get('/training-analytics', authenticateToken, getTrainingAnalytics);
router.get('/audit-history', authenticateToken, getAuditHistory);
router.get('/performance-trends', authenticateToken, getPerformanceTrends);

module.exports = router;

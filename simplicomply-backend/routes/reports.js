const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getReportSummaries,
  getDetailedReport
} = require('../controllers/reportController');

// Protected routes - authentication required
router.get('/', authenticateToken, getReportSummaries);
router.get('/:id', authenticateToken, getDetailedReport);

module.exports = router;

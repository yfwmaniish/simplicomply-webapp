const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getReportSummaries,
  getDetailedReport
} = require('../controllers/reportController');

// Protected routes - authentication required
router.get('/', authenticate, getReportSummaries);
router.get('/:id', authenticate, getDetailedReport);

module.exports = router;

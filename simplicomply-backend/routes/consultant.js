const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');
const { authenticate } = require('../middleware/auth');

// Get all consultants
router.get('/', authenticate, consultantController.getConsultants);

// Get consultant by ID
router.get('/:id', authenticate, consultantController.getConsultantById);

// Get consultant projects
router.get('/:id/projects', authenticate, consultantController.getConsultantProjects);

// Get consultant feedback
router.get('/:id/feedback', authenticate, consultantController.getConsultantFeedback);

module.exports = router;

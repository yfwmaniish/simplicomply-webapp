const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
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
} = require('../controllers/trainingController');

// Public routes - no authentication required
router.get('/modules', getTrainingModules);
router.get('/modules/:id', getTrainingModule);
router.get('/statistics', getTrainingStatistics);

// Protected routes - authentication required
router.get('/assignments', authenticate, getTrainingAssignments);
router.post('/assignments', authenticate, createTrainingAssignment);
router.get('/modules/:moduleId/progress', authenticate, getUserProgress);
router.put('/modules/:moduleId/progress', authenticate, updateUserProgress);

// Admin routes - authentication required (would need admin middleware in production)
router.post('/modules', authenticate, createTrainingModule);
router.put('/modules/:id', authenticate, updateTrainingModule);
router.delete('/modules/:id', authenticate, deleteTrainingModule);

module.exports = router;

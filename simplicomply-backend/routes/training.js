const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
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
router.get('/assignments', authenticateToken, getTrainingAssignments);
router.post('/assignments', authenticateToken, createTrainingAssignment);
router.get('/modules/:moduleId/progress', authenticateToken, getUserProgress);
router.put('/modules/:moduleId/progress', authenticateToken, updateUserProgress);

// Admin routes - authentication required (would need admin middleware in production)
router.post('/modules', authenticateToken, createTrainingModule);
router.put('/modules/:id', authenticateToken, updateTrainingModule);
router.delete('/modules/:id', authenticateToken, deleteTrainingModule);

module.exports = router;

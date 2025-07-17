const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate } = require('../middleware/auth');
const { 
  validateProfileUpdate, 
  validatePasswordChange, 
  validateAccountDeletion 
} = require('../middleware/validation');
const { uploadAvatar, handleUploadError, cleanupOldAvatar } = require('../middleware/upload');

// Import controllers
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar: uploadAvatarController,
  deleteAccount,
  getUserStats
} = require('../controllers/profileController');

// All routes are protected - require authentication
router.use(authenticate);

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', getProfile);

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', validateProfileUpdate, updateProfile);

// @route   GET /api/profile/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', getUserStats);

// @route   PUT /api/profile/password
// @desc    Change user password
// @access  Private
router.put('/password', validatePasswordChange, changePassword);

// @route   POST /api/profile/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', uploadAvatar, handleUploadError, async (req, res, next) => {
  try {
    // Clean up old avatar files after successful upload
    await cleanupOldAvatar(req.user.id);
    next();
  } catch (error) {
    next(error);
  }
}, uploadAvatarController);

// @route   DELETE /api/profile
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/', validateAccountDeletion, deleteAccount);

module.exports = router;

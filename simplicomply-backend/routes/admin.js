const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');

// Admin dashboard
router.get('/dashboard', authenticate, adminController.getDashboard);

// User management
router.get('/users', authenticate, adminController.getUsers);
router.get('/users/:id', authenticate, adminController.getUserById);
router.post('/users', authenticate, adminController.createUser);
router.put('/users/:id', authenticate, adminController.updateUser);
router.delete('/users/:id', authenticate, adminController.deleteUser);

// System settings
router.get('/settings', authenticate, adminController.getSystemSettings);
router.put('/settings', authenticate, adminController.updateSystemSettings);

// Audit logs
router.get('/audit-logs', authenticate, adminController.getAuditLogs);

// System monitoring
router.get('/system-health', authenticate, adminController.getSystemHealth);
router.get('/system-logs', authenticate, adminController.getSystemLogs);

module.exports = router;

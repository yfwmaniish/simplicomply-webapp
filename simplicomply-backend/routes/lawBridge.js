const express = require('express');
const router = express.Router();
const lawBridgeController = require('../controllers/lawBridgeController');
const { authenticate } = require('../middleware/auth');

// Get all law bridge topics
router.get('/topics', authenticate, lawBridgeController.getLawBridgeTopics);

// Get law bridge topic by ID
router.get('/topics/:id', authenticate, lawBridgeController.getLawBridgeTopicById);

// Get resources for a law bridge topic
router.get('/topics/:id/resources', authenticate, lawBridgeController.getLawBridgeResources);

// Get FAQs for a law bridge topic
router.get('/topics/:id/faqs', authenticate, lawBridgeController.getLawBridgeFaqs);

module.exports = router;

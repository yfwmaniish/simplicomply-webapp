const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');
const { authenticate } = require('../middleware/auth');

// Get all simulations
router.get('/', authenticate, simulationController.getSimulations);

// Get simulation by ID
router.get('/:id', authenticate, simulationController.getSimulationById);

module.exports = router;

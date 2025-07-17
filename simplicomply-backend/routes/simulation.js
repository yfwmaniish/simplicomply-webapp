const express = require('express');
const router = express.Router();

// Placeholder simulation routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Simulation endpoint - coming soon',
    data: {}
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Placeholder reports routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Reports endpoint - coming soon',
    data: {}
  });
});

module.exports = router;

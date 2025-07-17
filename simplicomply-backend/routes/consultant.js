const express = require('express');
const router = express.Router();

// Placeholder consultant routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Consultant endpoint - coming soon',
    data: {}
  });
});

module.exports = router;

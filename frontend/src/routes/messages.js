const express = require('express');

// Initialize app
const router = express.Router();
router.get('/chat', (req, res) => {
    res.send('chat')
});

module.exports = router;
// routes/routes.js
const express = require('express');
const sendNotification = require('../controllers/sendNotification'); // Ensure this path is correct
const router = express.Router();

// POST endpoint for sending notifications
router.post('/notifications/send', sendNotification);

module.exports = router;

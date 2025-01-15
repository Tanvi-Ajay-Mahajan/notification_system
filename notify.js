const express = require('express');
const sendEmail = require('../config/email');
const sendSMS = require('../config/sms');
const sendPushNotification = require('../config/firebase');
const db = require('../config/db');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { userId, type, channel, message, email, phone, pushToken } = req.body;

    try {
        let result;

        if (channel === 'email') {
            result = await sendEmail(email, type, message);
        } else if (channel === 'sms') {
            result = await sendSMS(phone, message);
        } else if (channel === 'push') {
            result = await sendPushNotification(pushToken, type, message);
        }

        // Log notification to the database
        db.query(
            'INSERT INTO notifications (user_id, type, channel, message, status) VALUES (?, ?, ?, ?, ?)',
            [userId, type, channel, message, 'sent']
        );

        res.status(200).send({ success: true, result });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send({ success: false, error });
    }
});

module.exports = router;

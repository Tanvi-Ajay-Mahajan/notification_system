const db = require('../config/DataBase'); // Adjust the path to your database connection file
const sendEmail = require('..email'); // Adjust the path to your email sending module
const sendSMS = require('..sms'); // Adjust the path to your SMS sending module
const sendPushNotification = require('../config/fireBase'); // Adjust the path to your push notification module

const sendNotification = async (req, res) => {
    const { userId, type, channel, message, email, phone, pushToken } = req.body;

    // Validate required fields
    if (!userId || !type || !channel || !message) {
        return res.status(400).send({ success: false, message: 'Missing required fields' });
    }

    try {
        let result;

        // Handle the notification based on the channel
        if (channel === 'email') {
            result = await sendEmail(email, type, message);
        } else if (channel === 'sms') {
            result = await sendSMS(phone, message);
        } else if (channel === 'push') {
            result = await sendPushNotification(pushToken, type, message);
        } else {
            return res.status(400).send({ success: false, message: 'Invalid notification channel' });
        }

        // Log notification to the database
        db.query(
            'INSERT INTO notifications (user_id, type, channel, message, status) VALUES (?, ?, ?, ?, ?)',
            [userId, type, channel, message, 'sent'],
            (err) => {
                if (err) throw err;
            }
        );

        res.status(200).send({ success: true, result });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};


module.exports = sendNotification;

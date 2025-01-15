const twilio = require('twilio');

// Twilio configuration
const accountSid = 'your-account-sid';
const authToken = 'your-auth-token';
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = (to, message) => {
    return client.messages.create({
        body: message,
        from: '+1234567890', // Your Twilio phone number
        to
    });
};

module.exports = sendSMS;

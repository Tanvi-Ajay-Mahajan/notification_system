const twilio = require('twilio');

const accountSid = 'your-twilio-sid';
const authToken = 'your-twilio-auth-token';
const client = twilio(accountSid, authToken);

client.messages.create({
    body: 'This is a test SMS',
    from: '+1234567890',
    to: '+recipient-phone-number'
}).then((message) => {
    console.log('SMS sent successfully:', message.sid);
}).catch((error) => {
    console.error('Error sending SMS:', error);
});

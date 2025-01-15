const admin = require('firebase-admin');
const serviceAccount = require('./path-to-firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendPushNotification = (token, title, body) => {
    const message = {
        notification: { title, body },
        token
    };

    return admin.messaging().send(message);
};

module.exports = sendPushNotification;

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from a `.env` file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Default to port 3001 if no PORT is set in .env

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Default to localhost if not provided
  user: process.env.DB_USER || 'tanvi-ajay-mahajan', // Default username
  password: process.env.DB_PASSWORD || 'Mahajan@123', // Default password
  database: process.env.DB_NAME || 'notification_system', // Default database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the server if DB connection fails
  }
  console.log('Connected to the MySQL database.');
});

// Test endpoint to check if server is working
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Sample API endpoint to send notifications
app.post('/send', (req, res) => {
  const { userId, type, channel, message, email, phone, pushToken } = req.body;

  // Validate the required fields
  if (!userId || !type || !channel || !message) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields: userId, type, channel, message' });
  }

  // SQL query to insert a new notification
  const sql = `INSERT INTO notifications (user_id, type, channel, message) VALUES (?, ?, ?, ?)`;

  // Execute the query
  db.query(sql, [userId, type, channel, message], (err, result) => {
    if (err) {
      console.error('Error inserting notification:', err.message);
      return res.status(500).json({ success: false, error: 'Database error: ' + err.message });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Notification sent successfully!',
      data: { userId, type, channel, message },
    });
  });
});

// Error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const sendPushNotification = (token, title, body) => {
  const message = {
      notification: { title, body },
      token
  };

  return admin.messaging().send(message)
      .then((response) => {
          console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
          console.error('Error sending push notification:', error);
          throw error;  // Re-throw the error to be handled by the route
      });
};
app.get('/', (req, res) => {
  res.send('Server is running!');
});

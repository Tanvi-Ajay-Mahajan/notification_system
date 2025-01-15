const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change to your email service (e.g., Outlook, Yahoo)
  auth: {
    user: 'mtanvi598@gmail.com', // Replace with your email
    pass: 'yttt uyca iwov tlzb', // Replace with your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: message, // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example usage
sendEmail('recipient-email@example.com', 'Booking Confirmation', 'Your booking is confirmed!');

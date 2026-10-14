const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve index-3.html as the main entry point
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-3.html'));
});

// Email Configuration
// IMPORTANT: You will need to use your own email credentials or an app password here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'karunas360academy@gmail.com', // Your Academy Email
    pass: 'your-app-password'           // Your Gmail App Password
  }
});

app.post('/send-inquiry', (req, res) => {
  const formData = req.body;
  
  const mailOptions = {
    from: 'karunas360academy@gmail.com',
    to: 'karunas360academy@gmail.com', // The redirect address
    subject: `New Inquiry from ${formData.student_name || formData.name}`,
    text: `
      You have a new inquiry from Karuna's 360° Academy website:
      
      -----------------------------------------
      ${Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n')}
      -----------------------------------------
      
      This inquiry was sent automatically from the website.
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ success: true, message: 'Email sent successfully' });
    }
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;

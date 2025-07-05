import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import validator from 'validator';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5500' }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer verify error:', error);
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  const cleanName = validator.escape(name.trim());
  const cleanEmail = validator.normalizeEmail(email.trim());
  const cleanMessage = validator.escape(message.trim());

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'charlesprincewill649@gmail.com',
    subject: `New message from ${cleanName}`,
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nMessage: ${cleanMessage}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
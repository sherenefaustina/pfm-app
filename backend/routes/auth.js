// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ✅ SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '1h' }
    );

    // ✅ Return name, email, and token
    return res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,  
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


//RESET PASSWORD
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Simulate sending email (or integrate actual nodemailer logic)
    console.log(`Reset link sent to ${email}`);
    return res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send reset link', error: err.message });
  }
});



export default router;

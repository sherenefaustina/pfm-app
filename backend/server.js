// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import Expense from './models/Expense.js';

import savingsRoutes from './routes/savingsRoutes.js'; // ✅ Import goal routes
//import Preference from './models/Preference.js'; // ✅ Ensure this file exists!

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', savingsRoutes); // ✅ Centralized goal logic

//--------------------------------------
// ✅ Expenses Routes


app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const { amount, category, date, paymentMethod, notes } = req.body;
    const newExpense = new Expense({ amount, category, date, paymentMethod, notes });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save expense', error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense' });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
});

//--------------------------------------
// ✅ Preferences Routes
app.get('/api/preferences/:userId', async (req, res) => {
  try {
    const preference = await Preference.findOne({ userId: req.params.userId });
    res.json({ darkMode: preference?.darkMode ?? false });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get preference' });
  }
});

app.post('/api/preferences/:userId', async (req, res) => {
  try {
    const { darkMode } = req.body;
    const updated = await Preference.findOneAndUpdate(
      { userId: req.params.userId },
      { darkMode },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update preference' });
  }
});

//--------------------------------------
// ✅ Test route
app.get('/', (req, res) => {
  res.send('PFM Backend Working!');
});

//--------------------------------------
// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log('✅ Server running on http://localhost:5000')))
.catch((err) => console.error('❌ DB connection error:', err));

import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: String,
  paymentMethod: String,
  notes: String,
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;

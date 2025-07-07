import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://sherenefaustina:Mc65WmWzCLMKeMin@cluster0.2lqj2jb.mongodb.net/pfmDB?retryWrites=true&w=majority&appName=Cluster0';

await mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
  paymentMethod: String,
  notes: String,
});

const Expense = mongoose.model("Expense", expenseSchema);


// Fetch and print all expenses
const data = await Expense.find();
console.log("📊 Expenses Data:");
console.log(data);

await mongoose.disconnect();

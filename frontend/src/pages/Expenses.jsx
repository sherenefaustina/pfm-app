import React, { useState, useEffect } from 'react';
import '../styles/Expenses.css';
import Analytics from '../components/Analytics'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
  ChevronDown,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FaRupeeSign, FaTags, FaCalendarAlt, FaCreditCard, FaStickyNote, FaEdit, FaTrash } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, } from 'recharts';
import { MdCategory } from "react-icons/md"; // Optional, if you prefer this for category



const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
    notes: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [chartType, setChartType] = useState("pie");

  useEffect(() => {
    axios
      .get('/api/expenses')
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error('Error fetching expenses:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const res = await axios.put(
          `/api/expenses/${expenses[editIndex]._id}`,
          formData
        );
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = res.data;
        setExpenses(updatedExpenses);
        setEditIndex(null);
        toast.success('Expense Updated');
      } else {
        const res = await axios.post('/api/expenses', formData);
        toast.success('Expense added successfully!', {
          progressClassName: 'bg-green-500',
          icon: '✅',
        });

        setExpenses([...expenses, res.data]);
        window.dispatchEvent(new Event("expensesUpdated"));

      }
      setFormData({
        amount: '',
        category: '',
        date: '',
        paymentMethod: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error saving expense:', error);
      toast.error('Failed to save expense');
    }
  };

  const handleEdit = (index) => {
    setFormData(expenses[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
  try {
    const expenseToDelete = expenses[index];
    await axios.delete(`/api/expenses/${expenseToDelete._id}`);
    
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    toast.error('Expense Deleted');
    window.dispatchEvent(new Event("expensesUpdated"));
  } catch (error) {
    console.error('Error deleting expense:', error);
    toast.error('Failed to delete expense');
  }
};


const handleCancel = () => {
  setFormData({
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
    notes: '',
  });
  setEditIndex(null);     // Cancel edit mode too
  setShowForm(false);     // Hide the form if you're toggling visibility
};



  const filterExpenses = () => {
    const now = new Date();
    let filtered = expenses;

    switch (filter) {
      case 'Daily':
        filtered = filtered.filter(
          (exp) => new Date(exp.date).toDateString() === now.toDateString()
        );
        break;
      case 'Weekly': {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        filtered = filtered.filter((exp) => new Date(exp.date) >= startOfWeek);
        break;
      }
      case 'Monthly':
        filtered = filtered.filter(
          (exp) => new Date(exp.date).getMonth() === now.getMonth()
        );
        break;
      case 'Yearly':
        filtered = filtered.filter(
          (exp) => new Date(exp.date).getFullYear() === now.getFullYear()
        );
        break;
      case 'Custom':
        if (customStartDate && customEndDate) {
          filtered = filtered.filter((exp) => {
            const d = new Date(exp.date);
            return d >= customStartDate && d <= customEndDate;
          });
        } else {
          filtered = [];
        }
        break;
      default:
        break;
    }

    if (paymentFilter !== 'All') {
      filtered = filtered.filter(
        (exp) =>
          exp.paymentMethod.toLowerCase() === paymentFilter.toLowerCase()
      );
    }

    return filtered;
  };

  const dateRanges = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'];
  const paymentMethods = ['All', 'UPI', 'Cash', 'Credit Card', 'Debit Card'];

  const COLORS = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'];

const getCategoryData = () => {
  const filtered = filterExpenses();
  const categoryTotals = {};

  filtered.forEach((expense) => {
    const cat = expense.category || 'Uncategorized';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(expense.amount);
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
};

  return (
    <div className="expenses-wrapper">
      <h1 className="expenses-title">Track Your Expenses</h1>

      {/* Mobile Filters Toggle */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"
        >
          <Filter size={16} /> Filters <ChevronDown size={16} />
        </button>
      </div>

      {/* Mobile Dropdown Filters */}
      {showMobileFilters && (
        <div className="md:hidden bg-white p-4 rounded-md shadow space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {dateRanges.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {filter === 'Custom' && (
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={customStartDate}
                onChange={(date) => setCustomStartDate(date)}
                selectsStart
                startDate={customStartDate}
                endDate={customEndDate}
                placeholderText="Start Date"
              />
              <DatePicker
                selected={customEndDate}
                onChange={(date) => setCustomEndDate(date)}
                selectsEnd
                startDate={customStartDate}
                endDate={customEndDate}
                minDate={customStartDate}
                placeholderText="End Date"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden md:block mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? 'active-filter' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
          {filter === 'Custom' && (
            <div className="flex gap-4 mt-2">
              <DatePicker
                selected={customStartDate}
                onChange={(date) => setCustomStartDate(date)}
                selectsStart
                startDate={customStartDate}
                endDate={customEndDate}
                placeholderText="Start Date"
              />
              <DatePicker
                selected={customEndDate}
                onChange={(date) => setCustomEndDate(date)}
                selectsEnd
                startDate={customStartDate}
                endDate={customEndDate}
                minDate={customStartDate}
                placeholderText="End Date"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {paymentMethods.map((method) => (
              <button
                key={method}
                onClick={() => setPaymentFilter(method)}
                className={`payment-toggle ${paymentFilter === method ? 'active' : ''}`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expense Form */}
      <div className="expense-card">
        <motion.form
          className="expense-form"
          onSubmit={handleSubmit}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div>
  <label className="flex items-center gap-2 font-semibold">
    <FaRupeeSign /> Amount:
  </label>
  <input
    type="number"
    name="amount"
    value={formData.amount}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  />
</div>

<div>
  <label className="flex items-center gap-2 font-semibold">
    <FaTags /> Category:
  </label>
  <input
    type="text"
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  />
</div>

<div>
  <label className="flex items-center gap-2 font-semibold">
    <FaCalendarAlt /> Date:
  </label>
  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  />
</div>

<div>
  <label className="flex items-center gap-2 font-semibold">
    <FaCreditCard /> Payment Method:
  </label>
  <select
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">Select Method</option>
    <option value="Cash">Cash</option>
    <option value="Credit Card">Credit Card</option>
    <option value="Debit Card">Debit Card</option>
    <option value="UPI">UPI</option>
  </select>
</div>

<div>
  <label className="flex items-center gap-2 font-semibold">
    <FaStickyNote /> Notes:
  </label>
  <input
    type="text"
    name="notes"
    value={formData.notes}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  />
</div>

          <button type="submit" className="expense-submit-btn">
            {editIndex !== null ? 'Update Expense' : 'Add Expense'}
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>


        </motion.form>
      </div>

      {/* Expense Table */}
      {filterExpenses().length > 0 && (
        <div className="expense-card expenses-table">
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterExpenses().map((expense, index) => (
                <tr key={expense._id}>
                  <td>₹{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>{expense.paymentMethod}</td>
                  <td>{expense.notes}</td>
                  <td className="flex items-center gap-4">
  <button onClick={() => handleEdit(index)}>
    <FaEdit className="text-blue-600 hover:text-blue-800 text-lg" />
  </button>
  <button onClick={() => handleDelete(index)}>
    <FaTrash className="text-red-600 hover:text-red-800 text-lg" />
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Analytics & Visualizations */}
<div className="expense-card mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-600">Analytics & Visualizations</h2>
              <button onClick={() => setChartType(chartType === "pie" ? "bar" : "pie")} className="bg-purple-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg shadow transition-all">
                Switch to {chartType === "pie" ? "Bar Chart" : "Pie Chart"}
              </button>
            </div>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "pie" ? (
                  <PieChart>
                    <Pie data={getCategoryData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} fill="#8884d8" label>
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                ) : (
                  <BarChart data={getCategoryData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};



export default Expenses;
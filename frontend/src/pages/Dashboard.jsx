import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUserCircle } from "react-icons/fa";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Get user email from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Greeting function
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 20) return "Good Evening";
  return "Good Night";
}

// Date formatting
function formatDate() {
  const today = new Date();
  return today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Dynamic colors based on category
const CATEGORY_COLORS = {
  Food: "#f87171",
  Travel: "#60a5fa",
  Shopping: "#fbbf24",
  Health: "#34d399",
  Others: "#a78bfa",
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showExpenseAlert, setShowExpenseAlert] = useState(true);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const fetchExpenses = () => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setExpenses(res.data);
        toast.success("Expenses successfully loaded!");
      })
      .catch((err) => {
        console.error("Failed to fetch expenses", err);
        toast.error("Failed to load expenses!");
      });
  };

  useEffect(() => {
    fetchExpenses();
    const handleDataChange = () => fetchExpenses();
    window.addEventListener("expensesUpdated", handleDataChange);
    return () => window.removeEventListener("expensesUpdated", handleDataChange);
  }, []);

  const totalExpenses = expenses.reduce((acc, exp) => acc + parseFloat(exp.amount || 0), 0);
  
  const totalTransactions = expenses.length;

  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.category || "Others";
    acc[cat] = (acc[cat] || 0) + parseFloat(exp.amount || 0);
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#a78bfa",
  }));

  const lineChartData = expenses.map((exp) => ({
    date: new Date(exp.date).toLocaleDateString(),
    amount: parseFloat(exp.amount),
  }));

  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen px-4 pt-20 pb-6 transition-colors duration-500`}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Greeting Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} w-full p-4 mb-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0`}>
        <div className="flex items-center text-purple-700 space-x-2 text-lg md:text-xl font-semibold break-words">
          <FaUserCircle className="text-3xl flex-shrink-0" />
          <span className="leading-snug max-w-xs sm:max-w-md md:max-w-full">
            Hi {user?.email || "User"}, {getGreeting()} 👋
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-purple-500 whitespace-nowrap">
            {formatDate()}
          </div>
          <button
            className="text-xl p-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-700 transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <BsSun /> : <BsMoonStars />}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-5 text-center border`}>
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-2xl font-bold text-green-600">₹{-totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-5 text-center border`}>
          <p className="text-sm text-gray-500">This Month's Expenses</p>
          <p className="text-2xl font-bold text-red-500">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-5 text-center border`}>
          <p className="text-sm text-gray-500">This Month's Income</p>
          <p className="text-2xl font-bold text-green-600">₹0.00</p>
        </div>
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-5 text-center border`}>
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-2xl font-bold text-purple-600">{totalTransactions}</p>
        </div>
      </div>

      {totalExpenses > 10000 && showExpenseAlert && (
  <div className="custom-alert animate-alert flex justify-between items-center px-4 py-3 rounded shadow-md bg-yellow-100 text-yellow-800 border border-yellow-300 mb-4">
    <div className="flex items-center">
      <span className="alert-icon mr-2">⚠️</span>
      Your expenses have exceeded ₹10,000 this month. Consider reviewing your budget!
    </div>
    <button
      onClick={() => setShowExpenseAlert(false)}
      className="text-yellow-800 hover:text-yellow-900 font-bold text-lg ml-4"
      aria-label="Close"
    >
      ×
    </button>
  </div>
)}



      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-4`}>
          <h2 className="font-semibold mb-3">Expense Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-4`}>
          <h2 className="font-semibold mb-3">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                isAnimationActive
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      

      {/* Recent Transactions */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-xl shadow-md p-4`}>
        <h2 className="font-semibold mb-3">Recent Transactions</h2>
        <ul className="divide-y divide-gray-300 dark:divide-gray-600">
          {recentTransactions.map((tx) => (
            <li key={tx._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-500">
                  {tx.category} • {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <p className="font-semibold text-red-500">₹{tx.amount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

// src/components/Analytics.jsx
import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line
} from 'recharts';

const COLORS = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'];

const getMonthlyTrends = (expenses) => {
  const monthlyData = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyData[key] = (monthlyData[key] || 0) + Number(expense.amount);
  });
  return Object.entries(monthlyData).map(([month, value]) => ({ month, value }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));
};

const getTopCategories = (expenses, topN = 5) => {
  const totals = {};
  expenses.forEach(({ category, amount }) => {
    if (!category) return;
    totals[category] = (totals[category] || 0) + Number(amount);
  });
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
};

const Analytics = ({ filteredExpenses }) => {
  const [chartType, setChartType] = useState('pie');
  const categoryData = getTopCategories(filteredExpenses);
  const trendData = getMonthlyTrends(filteredExpenses);

  return (
    <div className="expense-card mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-purple-600">Expense Insights</h2>
        <button
          onClick={() => setChartType(chartType === 'pie' ? 'bar' : 'pie')}
          className="bg-purple-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg shadow transition-all"
        >
          Switch to {chartType === 'pie' ? 'Bar Chart' : 'Pie Chart'}
        </button>
      </div>

      <div className="w-full h-[350px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          ) : (
            <BarChart data={categoryData}>
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

      <h3 className="text-lg font-semibold text-purple-600 mb-2">Monthly Expense Trend</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#845EC2" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

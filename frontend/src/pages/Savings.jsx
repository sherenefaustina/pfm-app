import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaTrash,
  FaEdit,
  FaMoon,
  FaSun,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrophy,
} from 'react-icons/fa';
import ConfettiCelebration from '../components/ui/ConfettiCelebration';
import '../styles/Savings.css';

const Savings = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    saved: '',
    deadline: '',
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('pfm-theme') === 'dark';
  });
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('savings-goals'));
    if (storedGoals) setGoals(storedGoals);
  }, []);

  useEffect(() => {
    localStorage.setItem('savings-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('pfm-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('pfm-theme', 'light');
    }
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.saved || !newGoal.deadline) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editIndex !== null) {
      const updatedGoals = [...goals];
      updatedGoals[editIndex] = newGoal;
      setGoals(updatedGoals);
      toast.success('Goal updated!');
    } else {
      setGoals([...goals, newGoal]);
      toast.success('Goal added successfully!');
    }

    setNewGoal({ name: '', target: '', saved: '', deadline: '' });
    setEditIndex(null);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    toast.info('Goal deleted.');
  };

  const editGoal = (index) => {
    setNewGoal(goals[index]);
    setEditIndex(index);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const sortedGoals = [...goals].sort((a, b) => {
    if (sortBy === 'progress') {
      const progA = parseFloat(a.saved) / parseFloat(a.target);
      const progB = parseFloat(b.saved) / parseFloat(b.target);
      return progB - progA;
    }
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const totalSaved = goals.reduce((sum, goal) => sum + parseFloat(goal.saved || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + parseFloat(goal.target || 0), 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const calculateTimeLeft = (deadline) => {
    const today = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} day(s) left` : `⚠️ Past deadline`;
  };

  const calculateProjection = (goal) => {
    const today = new Date();
    const start = new Date(goal.createdAt || goal.deadline);
    const deadline = new Date(goal.deadline);
    const daysElapsed = Math.max((today - start) / (1000 * 60 * 60 * 24), 1);
    const progressRatePerDay = parseFloat(goal.saved) / daysElapsed;
    const requiredRate =
      parseFloat(goal.target) /
      Math.max((deadline - today) / (1000 * 60 * 60 * 24), 1);

    if (parseFloat(goal.saved) >= parseFloat(goal.target)) return 'completed';
    if (isNaN(progressRatePerDay) || !isFinite(progressRatePerDay)) return 'no-data';

    return progressRatePerDay >= requiredRate ? 'on-track' : 'behind';
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="badge badge-completed">
            <FaTrophy /> Completed
          </span>
        );
      case 'on-track':
        return (
          <span className="badge badge-ontrack">
            <FaCheckCircle /> On Track
          </span>
        );
      case 'behind':
        return (
          <span className="badge badge-behind">
            <FaExclamationTriangle /> Behind
          </span>
        );
      default:
        return <span className="badge badge-nodata">📉 No Data</span>;
    }
  };

  return (
    <div className={`savings-container ${darkMode ? 'dark' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="savings-header">
        <h2>Savings Goals</h2>
        <button
          onClick={toggleTheme}
          className="theme-toggle text-yellow-500 hover:scale-110 transition-transform duration-200"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      <div className="goal-form">
        <input
          type="text"
          name="name"
          placeholder="Goal Name"
          value={newGoal.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="target"
          placeholder="Target Amount"
          value={newGoal.target}
          onChange={handleChange}
        />
        <input
          type="number"
          name="saved"
          placeholder="Amount Saved"
          value={newGoal.saved}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={newGoal.deadline}
          onChange={handleChange}
        />
        <button className="add-goal-btn" onClick={addGoal}>
          {editIndex !== null ? 'Update Goal' : 'Add Goal'}
        </button>
      </div>

      <div className="summary-section">
        <h3>
          Total Saved: ₹{totalSaved} / ₹{totalTarget}
        </h3>
        <div className="overall-progress-bar glassy-bar">
          <div
            className="progress-bar-fill progress-purple"
            style={{ width: `${overallProgress}%` }}
          >
            <span className="progress-label">{overallProgress.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* ✅ SORT DROPDOWN FIXED */}
      <div className="dropdown-wrapper" style={{ marginTop: '1rem', position: 'relative', display: 'inline-block' }}>
  <label htmlFor="sort" style={{ fontWeight: 'bold', marginRight: '10px', color: 'white' }}>
    Sort by:
  </label>
  <select
    id="sort"
    className="sort-dropdown"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="deadline">Deadline</option>
    <option value="progress">Progress</option>
    <option value="date">Date Added</option>
  </select>
  <span className="dropdown-arrow">&#9662;</span>
</div>


      <div className="goals-list">
        {sortedGoals.map((goal, index) => {
          const progress = Math.min(
            (parseFloat(goal.saved) / parseFloat(goal.target)) * 100,
            100
          );
          let colorClass = 'progress-green';
          if (progress < 30) colorClass = 'progress-red';
          else if (progress < 70) colorClass = 'progress-yellow';

          const status = calculateProjection(goal);
          const isCompleted = progress === 100;

          return (
            <div
              className={`goal-card glassmorphic ${darkMode ? 'card-dark' : ''}`}
              key={index}
            >
              {isCompleted && <ConfettiCelebration />}
              <div className="flex justify-between items-center mb-2">
                <h3>{goal.name}</h3>
                {statusBadge(status)}
              </div>
              <p>
                <strong>Target:</strong> ₹{goal.target}
              </p>
              <p>
                <strong>Saved:</strong> ₹{goal.saved}
              </p>
              <p>
                <strong>Deadline:</strong> {goal.deadline}
              </p>
              <p>
                <strong>⏳ Time Left:</strong> {calculateTimeLeft(goal.deadline)}
              </p>

              <div className="progress-bar-container" title={`${progress.toFixed(1)}%`}>
                <div
                  className={`progress-bar-fill ${colorClass}`}
                  style={{ width: `${progress}%` }}
                >
                  <span className="progress-label">{progress.toFixed(0)}%</span>
                </div>
              </div>

              <div className="goal-actions flex space-x-4 mt-4">
                <button
                  onClick={() => editGoal(index)}
                  title="Edit"
                  className="text-blue-600 hover:scale-110 transition-transform duration-200"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => deleteGoal(index)}
                  title="Delete"
                  className="text-red-600 hover:scale-110 transition-transform duration-200"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;

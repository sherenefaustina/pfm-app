import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budgeting from './pages/Budgeting';
import Savings from './pages/Savings';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/budgeting" element={<Budgeting />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/authpage" element={<AuthPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

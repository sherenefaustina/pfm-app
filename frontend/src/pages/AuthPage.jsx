import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    remember: false,
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ fullName: '', email: '', password: '', remember: false });
    setConfirmPassword('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (!isLogin && formData.fullName.trim() === '') {
      toast.error('Full name is required');
      return false;
    }
    if (!isLogin && formData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await axios.post(endpoint, payload);
      toast.success(res.data.message || (isLogin ? "Login successful" : "Signup successful"));

      if (isLogin && res.data.user) {
  localStorage.setItem("user", JSON.stringify(res.data.user));
  navigate("/dashboard");
}

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email: forgotEmail });
      toast.success(res.data.message || 'Password reset link sent to your email');
      setShowForgotModal(false);
      setForgotEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-50 to-purple-100 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-between mb-8 transition-all">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-semibold border-b-2 transition-colors duration-300 ${
              isLogin
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-purple-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-semibold border-b-2 transition-colors duration-300 ${
              !isLogin
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-purple-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-purple-600 hover:underline"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl hover:opacity-90 transition duration-300 shadow-md"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>

          <div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300" />
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="bg-white px-2 text-gray-500">Or continue with</span>
  </div>
</div>

<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
  {/* Google Button */}
  <button
    type="button"
    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 rounded-xl py-2 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:shadow-lg hover:scale-[1.02]"
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="Google"
      className="w-5 h-5"
    />
    <span className="font-medium">Continue with Google</span>
  </button>

  {/* Facebook Button */}
  <button
    type="button"
    className="flex items-center justify-center gap-2 w-full bg-[#1877F2] text-white rounded-xl py-2 transition-all duration-200 hover:bg-[#155dbe] hover:shadow-lg hover:scale-[1.02]"
  >
    <img
      src="https://www.svgrepo.com/show/452196/facebook-1.svg"
      alt="Facebook"
      className="w-5 h-5"
    />
    <span className="font-medium">Continue with Facebook</span>
  </button>
</div>


        </motion.form>

        <p className="mt-6 text-sm text-center text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={handleToggle}
            className="text-purple-600 font-medium hover:underline transition-all"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>

      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Send Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

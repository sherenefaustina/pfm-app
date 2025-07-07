// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

export default mongoose.model('User', userSchema);

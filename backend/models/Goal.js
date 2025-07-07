import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  targetDate: Date,
  // Remove userId if you no longer need it
  email: {
    type: String,
    required: true,
  },
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;

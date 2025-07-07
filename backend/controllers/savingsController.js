import Goal from "../models/Goal.js";

export const createGoal = async (req, res) => {
  try {
    const newGoal = new Goal({ ...req.body }); // email will come in req.body
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getGoals = async (req, res) => {
  try {
    const { email } = req.params;
    const goals = await Goal.find({ email });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

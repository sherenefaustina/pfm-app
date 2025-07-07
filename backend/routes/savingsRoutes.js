import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/savingsController.js";

const router = express.Router();

//router.post("/goals", controller.createGoal); // email comes in body
//router.get("/goals/:email", controller.getGoals);
//router.put("/goals/:id", controller.updateGoal);
//router.delete("/goals/:id", controller.deleteGoal);


export default router;

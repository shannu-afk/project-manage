import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server Error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo project");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server Error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server Error" });
  }
});

export default router;

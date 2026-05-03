import express from "express";
import Project from "../models/Project.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, createdBy: req.user.id });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server Error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("members");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server Error" });
  }
});

export default router;
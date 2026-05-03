import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Task title is required"] },
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
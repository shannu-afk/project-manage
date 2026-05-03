import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Project name is required"] },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Creator is required"] },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
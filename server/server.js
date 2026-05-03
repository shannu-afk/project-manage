import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// 🔥 FIX: start server AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB ERROR:", err.message);
    process.exit(1);
  });

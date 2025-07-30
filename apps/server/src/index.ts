import "dotenv/config";
import cors from "cors";
import express from "express";
import taskRoutes from "./routers/taskRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running",
    version: "1.0.0",
  });
});

// API Routes
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Task Management API server is running on port ${port}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET    /tasks     - Get all tasks`);
  console.log(`   POST   /tasks     - Create a new task`);
  console.log(`   PATCH  /tasks/:id - Update task status`);
  console.log(`   DELETE /tasks/:id - Delete a task`);
});

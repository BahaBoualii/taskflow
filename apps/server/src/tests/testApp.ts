import express from "express";
import type { Application } from "express";
import cors from "cors";
import taskRoutes from "../routers/taskRoutes";
import { errorHandler, notFoundHandler } from "../middleware/errorHandler";

export function createTestApp(): Application {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    })
  );

  app.use(express.json());

  // Health check endpoint
  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Test API is running",
      version: "1.0.0",
    });
  });

  // API Routes
  app.use("/tasks", taskRoutes);

  // Error handling middleware
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
} 
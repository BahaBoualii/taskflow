import "dotenv/config";
import cors from "cors";
import express from "express";
import taskRoutes from "./routers/taskRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { config } from "./config/env.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: `${config.apiName} is running`,
    version: config.apiVersion,
    environment: config.nodeEnv,
  });
});

// API Routes
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 ${config.apiName} server is running on port ${config.port}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
});

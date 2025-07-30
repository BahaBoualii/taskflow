import { Router } from "express";
import { taskController } from "../controllers/taskController";

const router = Router();

// GET /tasks - Get all tasks
router.get("/", taskController.getAllTasks);

// POST /tasks - Create a new task
router.post("/", taskController.createTask);

// PATCH /tasks/:id - Update task status
router.patch("/:id", taskController.updateTaskStatus);

// DELETE /tasks/:id - Delete a task
router.delete("/:id", taskController.deleteTask);

export default router; 
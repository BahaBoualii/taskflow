import type { Request, Response } from "express";
import { taskService } from "../services/taskService";
import { CreateTaskSchema, UpdateTaskStatusSchema, TaskIdSchema } from "../schemas/task";

export const taskController = {
  // GET /tasks - Get all tasks
  getAllTasks: (_req: Request, res: Response) => {
    try {
      const tasks = taskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch tasks",
      });
    }
  },

  // POST /tasks - Create a new task
  createTask: (req: Request, res: Response) => {
    try {
      const validationResult = CreateTaskSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid input data",
          details: validationResult.error.issues,
        });
      }

      const task = taskService.createTask(validationResult.data);
      
      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to create task",
      });
    }
  },

  // PATCH /tasks/:id - Update task status
  updateTaskStatus: (req: Request, res: Response) => {
    try {
      const idValidation = TaskIdSchema.safeParse(req.params.id);
      if (!idValidation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid task ID",
        });
      }

      const bodyValidation = UpdateTaskStatusSchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid status data",
          details: bodyValidation.error.issues,
        });
      }

      const updatedTask = taskService.updateTaskStatus(idValidation.data, bodyValidation.data);
      
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          error: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to update task",
      });
    }
  },

  // DELETE /tasks/:id - Delete a task
  deleteTask: (req: Request, res: Response) => {
    try {
      const idValidation = TaskIdSchema.safeParse(req.params.id);
      if (!idValidation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid task ID",
        });
      }

      const deleted = taskService.deleteTask(idValidation.data);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to delete task",
      });
    }
  },
}; 
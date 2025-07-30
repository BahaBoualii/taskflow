import { z } from "zod";
import type { TaskStatus } from "../types/task.js";

export const TaskStatusSchema = z.enum(["pending", "done"]);

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
});

export const UpdateTaskStatusSchema = z.object({
  status: TaskStatusSchema,
});

export const TaskIdSchema = z.string().regex(/^task-\d+$/, "Invalid task ID format");

export type CreateTaskRequest = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskStatusRequest = z.infer<typeof UpdateTaskStatusSchema>; 
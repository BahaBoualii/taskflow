export type TaskStatus = "pending" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any[];
  message?: string;
} 
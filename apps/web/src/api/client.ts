import axios from 'axios';
import type { ApiResponse, Task, CreateTaskRequest, UpdateTaskStatusRequest } from '../types/task';
import { config } from '../config/env';

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API functions
export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<ApiResponse<Task[]>> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data;
  },

  // Create a new task
  createTask: async (taskData: CreateTaskRequest): Promise<ApiResponse<Task>> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (id: string, statusData: UpdateTaskStatusRequest): Promise<ApiResponse<Task>> => {
    const response = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}`, statusData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/tasks/${id}`);
    return response.data;
  },
}; 
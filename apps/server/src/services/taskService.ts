import type { Task, TaskStatus } from "../types/task.js";
import type { CreateTaskRequest, UpdateTaskStatusRequest } from "../schemas/task.js";

class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  private generateId(): string {
    return `task-${this.nextId++}`;
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find(task => task.id === id) || null;
  }

  createTask(data: CreateTaskRequest): Task {
    const now = new Date();
    const task: Task = {
      id: this.generateId(),
      title: data.title,
      description: data.description,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, data: UpdateTaskStatusRequest): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      status: data.status,
      updatedAt: new Date(),
    };

    return this.tasks[taskIndex];
  }

  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

export const taskService = new TaskService(); 
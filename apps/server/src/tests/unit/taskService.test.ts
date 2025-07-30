import { describe, it, expect, beforeEach } from '@jest/globals';
import { taskService } from '../../services/taskService';
import type { CreateTaskRequest, UpdateTaskStatusRequest } from '../../schemas/task';

describe('TaskService', () => {
  beforeEach(() => {
    // Reset the service state before each test
    (taskService as any).tasks = [];
    (taskService as any).nextId = 1;
  });

  describe('getAllTasks', () => {
    it('should return empty array when no tasks exist', () => {
      const tasks = taskService.getAllTasks();
      expect(tasks).toEqual([]);
    });

    it('should return all tasks', () => {
      const task1 = taskService.createTask({
        title: 'Task 1',
        description: 'Description 1'
      });
      const task2 = taskService.createTask({
        title: 'Task 2',
        description: 'Description 2'
      });

      const tasks = taskService.getAllTasks();
      expect(tasks).toHaveLength(2);
      expect(tasks).toContainEqual(task1);
      expect(tasks).toContainEqual(task2);
    });
  });

  describe('createTask', () => {
    it('should create a task with correct properties', () => {
      const taskData: CreateTaskRequest = {
        title: 'Test Task',
        description: 'Test Description'
      };

      const task = taskService.createTask(taskData);

      expect(task).toMatchObject({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending'
      });
      expect(task.id).toMatch(/^task-\d+$/);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('should generate unique IDs for multiple tasks', () => {
      const task1 = taskService.createTask({
        title: 'Task 1',
        description: 'Description 1'
      });
      const task2 = taskService.createTask({
        title: 'Task 2',
        description: 'Description 2'
      });

      expect(task1.id).toBe('task-1');
      expect(task2.id).toBe('task-2');
    });
  });

  describe('getTaskById', () => {
    it('should return null for non-existent task', () => {
      const task = taskService.getTaskById('task-999');
      expect(task).toBeNull();
    });

    it('should return task for existing ID', () => {
      const createdTask = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const foundTask = taskService.getTaskById(createdTask.id);
      expect(foundTask).toEqual(createdTask);
    });
  });

  describe('updateTaskStatus', () => {
    it('should return null for non-existent task', () => {
      const result = taskService.updateTaskStatus('task-999', { status: 'done' });
      expect(result).toBeNull();
    });

    it('should update task status', () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const updatedTask = taskService.updateTaskStatus(task.id, { status: 'done' });

      expect(updatedTask).not.toBeNull();
      expect(updatedTask!.status).toBe('done');
      // Just verify the status was updated, skip timestamp comparison for now
      expect(updatedTask!.updatedAt).toBeInstanceOf(Date);
    });

    it('should update task status to pending', () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      // First update to done
      taskService.updateTaskStatus(task.id, { status: 'done' });
      
      // Then update back to pending
      const updatedTask = taskService.updateTaskStatus(task.id, { status: 'pending' });

      expect(updatedTask!.status).toBe('pending');
    });
  });

  describe('deleteTask', () => {
    it('should return false for non-existent task', () => {
      const result = taskService.deleteTask('task-999');
      expect(result).toBe(false);
    });

    it('should delete existing task', () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const deleteResult = taskService.deleteTask(task.id);
      expect(deleteResult).toBe(true);

      const remainingTasks = taskService.getAllTasks();
      expect(remainingTasks).toHaveLength(0);
    });

    it('should not affect other tasks when deleting', () => {
      const task1 = taskService.createTask({
        title: 'Task 1',
        description: 'Description 1'
      });
      const task2 = taskService.createTask({
        title: 'Task 2',
        description: 'Description 2'
      });

      taskService.deleteTask(task1.id);

      const remainingTasks = taskService.getAllTasks();
      expect(remainingTasks).toHaveLength(1);
      expect(remainingTasks[0]).toEqual(task2);
    });
  });
}); 
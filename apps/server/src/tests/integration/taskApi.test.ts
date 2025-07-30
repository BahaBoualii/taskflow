import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import type { Application } from 'express';
import { createTestApp } from '../testApp';
import { taskService } from '../../services/taskService';

describe('Task API Integration Tests', () => {
  let app: Application;

  beforeEach(() => {
    app = createTestApp();
    // Reset the service state before each test
    (taskService as any).tasks = [];
    (taskService as any).nextId = 1;
  });

  describe('GET /tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: []
      });
    });

    it('should return all tasks', async () => {
      // Create tasks directly in service
      const task1 = taskService.createTask({
        title: 'Task 1',
        description: 'Description 1'
      });
      const task2 = taskService.createTask({
        title: 'Task 2',
        description: 'Description 2'
      });

      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      
      // Check that tasks exist in response (ignoring date format differences)
      const responseTaskIds = response.body.data.map((t: any) => t.id);
      expect(responseTaskIds).toContain(task1.id);
      expect(responseTaskIds).toContain(task2.id);
      
      // Check that task properties match
      const responseTask1 = response.body.data.find((t: any) => t.id === task1.id);
      const responseTask2 = response.body.data.find((t: any) => t.id === task2.id);
      expect(responseTask1.title).toBe(task1.title);
      expect(responseTask1.description).toBe(task1.description);
      expect(responseTask1.status).toBe(task1.status);
      expect(responseTask2.title).toBe(task2.title);
      expect(responseTask2.description).toBe(task2.description);
      expect(responseTask2.status).toBe(task2.status);
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task with valid data', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New task description'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        title: 'New Task',
        description: 'New task description',
        status: 'pending'
      });
      expect(response.body.data.id).toMatch(/^task-\d+$/);
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });

    it('should return 400 for missing title', async () => {
      const taskData = {
        description: 'Description without title'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid input data');
      expect(response.body.details).toBeDefined();
    });

    it('should return 400 for missing description', async () => {
      const taskData = {
        title: 'Title without description'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid input data');
    });

    it('should return 400 for empty title', async () => {
      const taskData = {
        title: '',
        description: 'Valid description'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid input data');
    });

    it('should return 400 for title too long', async () => {
      const taskData = {
        title: 'a'.repeat(101), // 101 characters
        description: 'Valid description'
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid input data');
    });

    it('should return 400 for description too long', async () => {
      const taskData = {
        title: 'Valid title',
        description: 'a'.repeat(501) // 501 characters
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid input data');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update task status to done', async () => {
      // Create a task first
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const response = await request(app)
        .patch(`/tasks/${task.id}`)
        .send({ status: 'done' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('done');
      expect(response.body.data.id).toBe(task.id);
    });

    it('should update task status to pending', async () => {
      // Create a task and set it to done first
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });
      taskService.updateTaskStatus(task.id, { status: 'done' });

      const response = await request(app)
        .patch(`/tasks/${task.id}`)
        .send({ status: 'pending' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('pending');
    });

    it('should return 400 for invalid task ID format', async () => {
      const response = await request(app)
        .patch('/tasks/invalid-id')
        .send({ status: 'done' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid task ID');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .patch('/tasks/task-999')
        .send({ status: 'done' })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 for invalid status', async () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const response = await request(app)
        .patch(`/tasks/${task.id}`)
        .send({ status: 'invalid-status' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid status data');
    });

    it('should return 400 for missing status', async () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const response = await request(app)
        .patch(`/tasks/${task.id}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid status data');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete existing task', async () => {
      const task = taskService.createTask({
        title: 'Test Task',
        description: 'Test Description'
      });

      const response = await request(app)
        .delete(`/tasks/${task.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task deleted successfully');

      // Verify task is actually deleted
      const remainingTasks = taskService.getAllTasks();
      expect(remainingTasks).toHaveLength(0);
    });

    it('should return 400 for invalid task ID format', async () => {
      const response = await request(app)
        .delete('/tasks/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid task ID');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .delete('/tasks/task-999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Route not found');
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
}); 
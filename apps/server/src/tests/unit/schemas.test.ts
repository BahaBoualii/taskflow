import { describe, it, expect } from '@jest/globals';
import { 
  CreateTaskSchema, 
  UpdateTaskStatusSchema, 
  TaskIdSchema,
  TaskStatusSchema 
} from '../../schemas/task';

describe('Task Schemas', () => {
  describe('TaskStatusSchema', () => {
    it('should validate pending status', () => {
      const result = TaskStatusSchema.safeParse('pending');
      expect(result.success).toBe(true);
      expect(result.data).toBe('pending');
    });

    it('should validate done status', () => {
      const result = TaskStatusSchema.safeParse('done');
      expect(result.success).toBe(true);
      expect(result.data).toBe('done');
    });

    it('should reject invalid status', () => {
      const result = TaskStatusSchema.safeParse('invalid');
      expect(result.success).toBe(false);
    });
  });

  describe('CreateTaskSchema', () => {
    it('should validate valid task data', () => {
      const validData = {
        title: 'Valid Title',
        description: 'Valid description'
      };

      const result = CreateTaskSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it('should reject missing title', () => {
      const invalidData = {
        description: 'Valid description'
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues).toHaveLength(1);
      expect(result.error?.issues[0].path).toEqual(['title']);
    });

    it('should reject missing description', () => {
      const invalidData = {
        title: 'Valid Title'
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues).toHaveLength(1);
      expect(result.error?.issues[0].path).toEqual(['description']);
    });

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        description: 'Valid description'
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty description', () => {
      const invalidData = {
        title: 'Valid Title',
        description: ''
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject title too long', () => {
      const invalidData = {
        title: 'a'.repeat(101),
        description: 'Valid description'
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject description too long', () => {
      const invalidData = {
        title: 'Valid Title',
        description: 'a'.repeat(501)
      };

      const result = CreateTaskSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept title at max length', () => {
      const validData = {
        title: 'a'.repeat(100),
        description: 'Valid description'
      };

      const result = CreateTaskSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept description at max length', () => {
      const validData = {
        title: 'Valid Title',
        description: 'a'.repeat(500)
      };

      const result = CreateTaskSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateTaskStatusSchema', () => {
    it('should validate valid status update', () => {
      const validData = {
        status: 'done'
      };

      const result = UpdateTaskStatusSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it('should validate pending status', () => {
      const validData = {
        status: 'pending'
      };

      const result = UpdateTaskStatusSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it('should reject missing status', () => {
      const invalidData = {};

      const result = UpdateTaskStatusSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid status', () => {
      const invalidData = {
        status: 'invalid'
      };

      const result = UpdateTaskStatusSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('TaskIdSchema', () => {
    it('should validate valid task ID', () => {
      const validIds = ['task-1', 'task-123', 'task-999999'];

      validIds.forEach(id => {
        const result = TaskIdSchema.safeParse(id);
        expect(result.success).toBe(true);
        expect(result.data).toBe(id);
      });
    });

    it('should reject invalid task ID format', () => {
      const invalidIds = [
        'task-',           // missing number
        'task-abc',        // non-numeric
        'task1',           // missing hyphen
        'Task-1',          // wrong case
        'task--1',         // double hyphen
        '1-task',          // wrong order
        'task-1-2',        // multiple hyphens
        '',                // empty string
        'invalid',         // completely invalid
      ];

      invalidIds.forEach(id => {
        const result = TaskIdSchema.safeParse(id);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-string values', () => {
      const invalidValues = [123, true, null, undefined, {}];

      invalidValues.forEach(value => {
        const result = TaskIdSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });
  });
}); 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/client';
import { useTaskStore } from '../store/taskStore';
import { toast } from 'sonner';
import type { CreateTaskRequest, UpdateTaskStatusRequest } from '../types/task';

// Query keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: () => [...taskKeys.lists()] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

// Get all tasks
export const useTasks = () => {
  const { setTasks, setLoading, setError } = useTaskStore();
  
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await taskApi.getTasks();
        if (response.success && response.data) {
          setTasks(response.data);
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to fetch tasks');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });
};

// Create task mutation
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { addTask } = useTaskStore();
  
  return useMutation({
    mutationFn: async (taskData: CreateTaskRequest) => {
      const response = await taskApi.createTask(taskData);
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create task');
      }
    },
    onSuccess: (newTask) => {
      addTask(newTask);
      queryClient.invalidateQueries({ queryKey: taskKeys.list() });
      toast.success('Task created successfully!');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
      toast.error(errorMessage);
    },
  });
};

// Update task status mutation
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const { updateTask } = useTaskStore();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'pending' | 'done' }) => {
      const response = await taskApi.updateTaskStatus(id, { status });
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update task status');
      }
    },
    onSuccess: (updatedTask) => {
      updateTask(updatedTask.id, updatedTask);
      queryClient.invalidateQueries({ queryKey: taskKeys.list() });
      toast.success(`Task marked as ${updatedTask.status}!`);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task status';
      toast.error(errorMessage);
    },
  });
};

// Delete task mutation
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { removeTask } = useTaskStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await taskApi.deleteTask(id);
      if (response.success) {
        return id;
      } else {
        throw new Error(response.error || 'Failed to delete task');
      }
    },
    onSuccess: (deletedId) => {
      removeTask(deletedId);
      queryClient.invalidateQueries({ queryKey: taskKeys.list() });
      toast.success('Task deleted successfully!');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      toast.error(errorMessage);
    },
  });
}; 
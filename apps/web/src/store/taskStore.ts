import { create } from 'zustand';
import type { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  removeTask: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  getPendingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? updatedTask : task
    )
  })),
  
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  // Computed values
  getPendingTasks: () => get().tasks.filter(task => task.status === 'pending'),
  getCompletedTasks: () => get().tasks.filter(task => task.status === 'done'),
  getTaskById: (id) => get().tasks.find(task => task.id === id),
})); 
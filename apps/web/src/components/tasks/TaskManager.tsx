import { useTasks } from '../../hooks/useTasks';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useTaskStore } from '../../store/taskStore';
import { ListTodo, Plus, CheckCircle, Clock } from 'lucide-react';
import { config } from '../../config/env';

export function TaskManager() {
  const { data: tasks, isLoading, error } = useTasks();
  const { getPendingTasks, getCompletedTasks } = useTaskStore();
  
  const pendingTasks = getPendingTasks();
  const completedTasks = getCompletedTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            {config.appName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Organize your tasks and track your progress
          </p>
        </div>

        {/* Stats Section - Compact and Prominent */}
        {!isLoading && !error && tasks && tasks.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Tasks</p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{tasks.length}</p>
                  </div>
                  <ListTodo className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20 rounded-xl p-6 border border-yellow-200/50 dark:border-yellow-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending</p>
                    <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{pendingTasks.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">{completedTasks.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Side by Side Layout */}
        <div className="grid gap-8 xl:grid-cols-12">
          {/* Task Form - Left Side */}
          <div className="xl:col-span-4">
            <div className="sticky top-6">
              <TaskForm />
            </div>
          </div>

          {/* Task List - Right Side */}
          <div className="xl:col-span-8">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
} 
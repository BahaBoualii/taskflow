import { useTaskStore } from '../../store/taskStore';
import { TaskItem } from './TaskItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Loader from '../loader';
import { CheckCircle, Clock, ListTodo, AlertCircle } from 'lucide-react';

export function TaskList() {
  const { tasks, isLoading, error, getPendingTasks, getCompletedTasks } = useTaskStore();
  
  const pendingTasks = getPendingTasks();
  const completedTasks = getCompletedTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            No Tasks Yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Create your first task to get started!
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-200 dark:border-blue-800">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                Pending Tasks
              </h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} waiting
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-green-200 dark:border-green-800">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
                Completed Tasks
              </h2>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                {completedTasks.length} task{completedTasks.length !== 1 ? 's' : ''} finished
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
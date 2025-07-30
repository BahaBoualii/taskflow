import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { StatusToggle } from './StatusToggle';
import { useDeleteTask } from '../../hooks/useTasks';
import type { Task } from '../../types/task';
import { Trash2, Loader2, Calendar, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const deleteTaskMutation = useDeleteTask();
  const isDeleting = deleteTaskMutation.isPending;

  const handleDelete = async () => {
    try {
      await deleteTaskMutation.mutateAsync(task.id);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
      task.status === 'done' 
        ? 'opacity-75 bg-muted/20 border-muted' 
        : 'hover:border-primary/50 hover:bg-card'
    }`}>
      {/* Status Indicator Bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${
        task.status === 'done' 
          ? 'bg-green-500' 
          : 'bg-blue-500'
      }`} />
      
      <div className="p-6 pl-8">
        {/* Header with Title and Actions */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-bold leading-tight mb-2 ${
              task.status === 'done' 
                ? 'line-through text-muted-foreground' 
                : 'text-foreground'
            }`}>
              {task.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {task.description}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 flex-shrink-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isDeleting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        {/* Footer with Status and Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <StatusToggle
              taskId={task.id}
              currentStatus={task.status}
              disabled={isDeleting}
            />
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              task.status === 'done' 
                ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30' 
                : 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30'
            }`}>
              {task.status === 'done' ? '✓ Completed' : '⏳ Pending'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatDate(task.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatTime(task.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
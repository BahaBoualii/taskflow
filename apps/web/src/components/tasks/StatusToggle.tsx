import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useUpdateTaskStatus } from '../../hooks/useTasks';
import type { TaskStatus } from '../../types/task';
import { Check, Loader2 } from 'lucide-react';

interface StatusToggleProps {
  taskId: string;
  currentStatus: TaskStatus;
  disabled?: boolean;
}

export function StatusToggle({ taskId, currentStatus, disabled = false }: StatusToggleProps) {
  const updateStatusMutation = useUpdateTaskStatus();
  const isPending = updateStatusMutation.isPending;

  const handleStatusChange = async () => {
    const newStatus: TaskStatus = currentStatus === 'pending' ? 'done' : 'pending';
    
    try {
      await updateStatusMutation.mutateAsync({
        id: taskId,
        status: newStatus,
      });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`status-${taskId}`}
        checked={currentStatus === 'done'}
        onCheckedChange={handleStatusChange}
        disabled={disabled || isPending}
        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
      />
      {isPending && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      <label
        htmlFor={`status-${taskId}`}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          currentStatus === 'done' ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {currentStatus === 'done' ? 'Completed' : 'Mark as complete'}
      </label>
    </div>
  );
} 
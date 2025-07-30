import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useCreateTask } from '../../hooks/useTasks';
import { createTaskSchema, type CreateTaskFormData } from '../../lib/schemas';
import { Plus, Loader2 } from 'lucide-react';

export function TaskForm() {
  const createTaskMutation = useCreateTask();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await createTaskMutation.mutateAsync(data);
      reset();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Add New Task</h2>
        </div>
        <p className="text-muted-foreground">
          Create a new task to track your progress
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-sm font-semibold">
            Task Title
          </Label>
          <Input
            id="title"
            placeholder="What needs to be done?"
            {...register('title')}
            className={`h-12 text-base ${
              errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-sm font-semibold">
            Description
          </Label>
          <textarea
            id="description"
            placeholder="Add details about this task..."
            {...register('description')}
            className={`flex min-h-[100px] w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
              errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.description.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
          disabled={isSubmitting || createTaskMutation.isPending}
        >
          {isSubmitting || createTaskMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Task...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" />
              Create Task
            </>
          )}
        </Button>
      </form>
    </div>
  );
} 
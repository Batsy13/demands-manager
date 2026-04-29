import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTaskMutations } from '@/hooks/use-task';
import type { Task } from '@/types/task';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  assignee: z.string().min(1, 'Assignee is required'),
  status: z.enum(['Em Aberto', 'Em Andamento', 'Concluído']),
  createdAt: z.date({
    required_error: "A date of creation is required.",
  }),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export function useTaskForm(task: Task | null | undefined, onClose: () => void) {
  const { create, update } = useTaskMutations();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee: '',
      status: 'Em Aberto',
      createdAt: new Date(),
    }
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        status: task.status,
        createdAt: new Date(task.createdAt),
      });
    } else {
      form.reset({ 
        title: '', 
        description: '', 
        assignee: '', 
        status: 'Em Aberto', 
        createdAt: new Date() 
      });
    }
  }, [task, form.reset]);

  const onSubmit = (data: TaskFormValues) => {
    const payload = {
      ...data,
      createdAt: data.createdAt.toISOString(),
    };

    if (task) {
      update.mutate({ ...payload, id: task.id });
    } else {
      create.mutate(payload);
    }
    onClose();
  };

  return { form, onSubmit };
}
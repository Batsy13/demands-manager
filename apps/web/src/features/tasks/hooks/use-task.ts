import { fetchTasks, saveTask, editTask, deleteTask } from '@/api/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../types/task';

export const useTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
};

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: saveTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      
      if (previousTasks) {
        const optimisticTask = { ...newTask, id: crypto.randomUUID() } as Task;
        queryClient.setQueryData<Task[]>(['tasks'], [...previousTasks, optimisticTask]);
      }
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) queryClient.setQueryData(['tasks'], context.previousTasks);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const update = useMutation({
    mutationFn: editTask,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          previousTasks.map((task) => task.id === updatedTask.id ? { ...task, ...updatedTask } : task)
        );
      }
      return { previousTasks };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTasks) queryClient.setQueryData(['tasks'], context.previousTasks);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          previousTasks.filter(task => task.id !== deletedId)
        );
      }
      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) queryClient.setQueryData(['tasks'], context.previousTasks);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { create, update, remove };
};
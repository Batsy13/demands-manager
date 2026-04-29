import { editTask, fetchTasks, saveTask } from '@/api/task';
import type { Task } from '@/types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
};

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: saveTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const update = useMutation({
    mutationFn: editTask,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ['tasks'],
          previousTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
      }

      return { previousTasks };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { create, update };
};
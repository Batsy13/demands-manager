import { useState } from 'react';
import { useTasks, useTaskMutations } from '@/features/tasks/hooks/use-task';
import type { Task, TaskStatus } from '@/features/tasks/types/task';
import { useTheme } from '@/theme-provider';

export function useDemands() {
  const { data: tasks, isLoading, isError } = useTasks();
  const { update } = useTaskMutations();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    update.mutate({ ...task, status: newStatus });
  };

  const openDialog = (task?: Task) => {
    setSelectedTask(task || null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  return {
    tasks,
    isLoading,
    isError,
    view,
    setView,
    selectedTask,
    isDialogOpen,
    isDarkMode,
    toggleTheme,
    handleStatusChange,
    openDialog,
    closeDialog
  };
}
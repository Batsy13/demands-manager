import { useState, useEffect } from 'react';
import { useTasks, useTaskMutations } from '@/hooks/use-task';
import type { Task, TaskStatus } from '@/types/task';

export function useDemands() {
  const { data: tasks, isLoading } = useTasks();
  const { update } = useTaskMutations();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(prev => !prev);
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
export type TaskStatus = 'Em Aberto' | 'Em Andamento' | 'Concluído';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  createdAt: string;
}
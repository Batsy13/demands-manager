import type { Task } from '@/types/task';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const saveTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const editTask = async (task: Task): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${task.id}`, task);
  return response.data;
};
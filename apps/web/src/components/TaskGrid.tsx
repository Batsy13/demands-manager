import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@workspace/ui/components/select';
import { Input } from '@workspace/ui/components/input';
import type { Task, TaskStatus } from '@/types/task';

interface TaskGridProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export function TaskGrid({ tasks, onTaskClick, onStatusChange }: TaskGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.assignee.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Buscar demandas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onTaskClick(task)}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                <div className="text-sm font-medium">Responsável: {task.assignee}</div>
                <div onClick={(e) => e.stopPropagation()}>
                  <Select value={task.status} onValueChange={(val) => onStatusChange(task, val as TaskStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Em Aberto">Em Aberto</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            Nenhuma demanda encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
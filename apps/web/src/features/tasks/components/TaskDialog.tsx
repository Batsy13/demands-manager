import { useTaskForm } from '@/features/tasks/hooks/use-task-form';
import type { Task } from '@/features/tasks/types/task';
import { Button } from '@workspace/ui/components/button';
import { Calendar } from '@workspace/ui/components/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@workspace/ui/components/select';
import { cn } from '@workspace/ui/lib/utils';
import { format } from 'date-fns/format';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

interface Props {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDialog({ task, isOpen, onClose }: Props) {
  const { form, onSubmit } = useTaskForm(task, onClose);
  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? 'Editar Demanda' : 'Nova Demanda'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input placeholder="Título" maxLength={40} {...register('title')} />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>
          <div>
            <Input placeholder="Descrição" maxLength={200} {...register('description')} />
            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
          </div>
          <div>
            <Input placeholder="Responsável" maxLength={20} {...register('assignee')} />
            {errors.assignee && <span className="text-red-500 text-xs">{errors.assignee.message}</span>}
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Em Aberto">Em Aberto</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
            </div>

            <div className="flex-1">
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.createdAt && <span className="text-red-500 text-xs">{errors.createdAt.message}</span>}
            </div>
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
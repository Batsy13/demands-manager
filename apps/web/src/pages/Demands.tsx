import { LayoutGrid, List, Moon, Sun } from 'lucide-react';
import { TaskDialog } from '@/features/tasks/components/TaskDialog';
import { Button } from '@workspace/ui/components/button';
import { Switch } from '@workspace/ui/components/switch';
import { useDemands } from '@/features/tasks/hooks/use-demands';
import { TaskGrid } from '@/features/tasks/components/TaskGrid';
import { DataTable } from '@/features/tasks/components/data-table';
import { getColumns } from '@/features/tasks/components/TaskColumns';

export function Demands() {
  const {
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
  } = useDemands();

  if (isLoading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;

  if (isError) return <div className="flex h-screen items-center justify-center text-red-500 font-semibold text-xl">Erro ao carregar as demandas. Verifique se o servidor está ativo.</div>;

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <p className="text-xl font-semibold">Nenhuma demanda encontrada</p>
        <Button onClick={() => openDialog()}>Criar Demanda</Button>
        <TaskDialog isOpen={isDialogOpen} onClose={closeDialog} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Demandas</h1>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setView('list')}><List className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" onClick={() => setView('grid')}><LayoutGrid className="h-4 w-4" /></Button>
            </div>
            <Button onClick={() => openDialog()}>Criar Demanda</Button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <TaskGrid 
          tasks={tasks} 
          onTaskClick={openDialog} 
          onStatusChange={handleStatusChange} 
        />
      ) : (
        <DataTable columns={getColumns(openDialog)} data={tasks} onRowClick={openDialog} />
      )}
      <TaskDialog task={selectedTask} isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}
import { useTaskMutations } from "@/hooks/use-task"
import type { Task, TaskStatus } from "@/types/task"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@workspace/ui/components/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@workspace/ui/components/select"
import { ArrowUpDown } from "lucide-react"

const StatusCell = ({ task }: { task: Task }) => {
  const { update } = useTaskMutations()

  const handleStatusChange = (newStatus: TaskStatus) => {
    update.mutate({ ...task, status: newStatus })
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Select value={task.status} onValueChange={(val) => handleStatusChange(val as TaskStatus)}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Em Aberto">Em Aberto</SelectItem>
          <SelectItem value="Em Andamento">Em Andamento</SelectItem>
          <SelectItem value="Concluído">Concluído</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsável
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Abertura
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString('pt-BR')
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusCell task={row.original} />
  },
]
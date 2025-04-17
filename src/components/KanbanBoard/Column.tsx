// ✅ src/components/KanbanBoard/Column.tsx
import TaskCard from "./TaskCard"
import { Task } from "@/lib/task"

export default function Column({
  title,
  tasks,
  onUpdate,
}: {
  title: string
  tasks: Task[]
  onUpdate: (updatedTask: Task) => void
}) {
  return (
    <div className="bg-zinc-100 rounded-xl p-4 w-full h-full min-h-[300px]">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
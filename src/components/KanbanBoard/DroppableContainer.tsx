"use client"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import { Task } from "@/lib/task"
import TaskCard from "./TaskCard"
import { GripVertical } from "lucide-react"

export function DraggableTask({
  task,
  onUpdate,
}: {
  task: Task
  onUpdate: (t: Task) => void
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id })

  return (
    <div className="mb-4 relative rounded-lg shadow-sm">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="absolute top-1 right-1 text-zinc-300 hover:text-zinc-500 cursor-grab z-10"
        title="Drag task"
      >
        <GripVertical size={16} />
      </div>
      <TaskCard task={task} onUpdate={onUpdate} />
    </div>
  )
}

export function DroppableContainer({
  id,
  title,
  tasks,
  onUpdate,
}: {
  id: string
  title: string
  tasks: Task[]
  onUpdate: (t: Task) => void
}) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="bg-zinc-100 rounded-xl p-4 w-full h-full min-h-[300px]"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

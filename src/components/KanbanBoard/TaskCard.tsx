// ✅ src/components/KanbanBoard/TaskCard.tsx
"use client"
import { useState, useEffect } from "react"
import { Task } from "@/lib/task"
import { CheckCircle, Circle } from "lucide-react"

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: Task
  onUpdate: (updatedTask: Task) => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [newSubtask, setNewSubtask] = useState("")

  useEffect(() => {
    if (title !== task.title) {
      const updated = new Task(title, description, task.status)
      updated.id = task.id
      updated.subtasks = task.subtasks
      onUpdate(updated)
    }
  }, [title])

  function handleDescriptionBlur() {
    if (description !== task.description) {
      const updated = new Task(title, description, task.status)
      updated.id = task.id
      updated.subtasks = task.subtasks
      onUpdate(updated)
    }
  }

  function handleSubtaskKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!newSubtask.trim()) return
      const updated = new Task(title, description, task.status)
      updated.id = task.id
      updated.subtasks = [
        ...task.subtasks,
        { title: newSubtask.trim(), completed: false },
      ]
      onUpdate(updated)
      setNewSubtask("")
    }
  }

  function toggleSubtask(index: number) {
    const updated = new Task(title, description, task.status)
    updated.id = task.id
    updated.subtasks = task.subtasks.map((sub, i) =>
      i === index ? { ...sub, completed: !sub.completed } : sub
    )
    onUpdate(updated)
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 rounded text-sm"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            className="border p-1 rounded text-xs"
            placeholder="Add a description..."
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-zinc-600 px-2 py-1 hover:text-zinc-900"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className="cursor-pointer">
          <h3 className="text-sm font-bold">{task.title}</h3>
          <p className="text-xs text-zinc-500 mt-1">
            {task.description || <em className="text-zinc-400">Add description...</em>}
          </p>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-600">Subtasks</span>
        </div>
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyDown={handleSubtaskKeyDown}
          placeholder="Add subtask and press Enter"
          className="border p-1 rounded text-xs w-full mb-2"
        />
        {task.subtasks.length > 0 ? (
          <ul className="text-xs pl-4 space-y-1">
            {task.subtasks.map((sub, index) => (
              <li
                key={index}
                onClick={() => toggleSubtask(index)}
                className={`flex items-center gap-1 cursor-pointer ${
                  sub.completed ? "line-through text-zinc-400" : "text-zinc-800"
                }`}
              >
                {sub.completed ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-zinc-400" />
                )}
                {sub.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-zinc-400 italic">No subtasks yet</p>
        )}
      </div>
    </div>
  )
}

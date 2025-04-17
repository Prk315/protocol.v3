// ✅ src/components/KanbanBoard/Board.tsx
"use client"
import { useEffect, useState } from "react"
import Column from "./Column"
import { Task } from "@/lib/task"

const API_URL = "http://localhost:8000/kanban"

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"todo" | "working" | "done">("todo")

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        const parsed = data.map((t: any) => {
          const task = new Task(t.title, t.description, t.status)
          task.id = t.id
          task.subtasks = t.subtasks || []
          return task
        })
        setTasks(parsed)
      } catch (err) {
        console.error("Failed to load tasks:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status, subtasks: [] }),
    })
    const newTask = await res.json()
    const task = new Task(newTask.title, newTask.description, newTask.status)
    task.id = newTask.id
    task.subtasks = newTask.subtasks || []
    setTasks((prev) => [task, ...prev])
    setTitle("")
    setDescription("")
    setStatus("todo")
  }

  async function handleUpdateTask(updatedTask: Task) {
    await fetch(`${API_URL}/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    )
  }

  if (loading) return <p>Loading tasks...</p>

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleAddTask} className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Create New Task</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="border p-2 rounded w-48"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="border p-2 rounded w-64"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="border p-2 rounded"
          >
            <option value="todo">To Do</option>
            <option value="working">Working On</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="grid grid-cols-3 gap-4">
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.status === "todo")}
          onUpdate={handleUpdateTask}
        />
        <Column
          title="Working On"
          tasks={tasks.filter((t) => t.status === "working")}
          onUpdate={handleUpdateTask}
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "done")}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  )
}

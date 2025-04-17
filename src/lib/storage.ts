// ✅ src/lib/storage.ts
import { Task } from "./task"

const STORAGE_KEY = "kanban_tasks"

export function saveTasks(tasks: Task[]) {
  const raw = JSON.stringify(tasks)
  localStorage.setItem(STORAGE_KEY, raw)
}

export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return parsed.map((t: any) => {
      const task = new Task(t.title, t.description, t.status)
      task.id = t.id
      task.subtasks = t.subtasks || []
      return task
    })
  } catch (err) {
    console.error("Failed to load tasks:", err)
    return []
  }
}

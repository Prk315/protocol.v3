

// ✅ src/lib/task.ts
export type Subtask = {
  title: string
  completed: boolean
}

export class Task {
  id: string
  title: string
  description: string
  subtasks: Subtask[]
  status: "todo" | "working" | "done"

  constructor(
    title: string,
    description: string,
    status: "todo" | "working" | "done" = "todo"
  ) {
    this.id = crypto.randomUUID()
    this.title = title
    this.description = description
    this.subtasks = []
    this.status = status
  }

  addSubtask(title: string) {
    this.subtasks.push({ title, completed: false })
  }

  toggleSubtask(index: number) {
    this.subtasks[index].completed = !this.subtasks[index].completed
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withSubtasks(subtasks: Subtask[]) {
    this.subtasks = subtasks
    return this
  }
}

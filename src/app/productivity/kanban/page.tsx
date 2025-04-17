// ✅ src/app/productivity/kanban/page.tsx
import KanbanBoard from "@/components/KanbanBoard/Board"

export default function KanbanPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  )
}
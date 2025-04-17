"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isProductivityOpen, setIsProductivityOpen] = useState(false)

  return (
    <nav className="flex items-center gap-6 p-4 border-b bg-white shadow-sm relative">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Killer App
      </Link>

      {/* Trackers */}
      <Link
        href="/trackers"
        className={`text-sm font-medium ${
          pathname.startsWith("/trackers")
            ? "text-blue-600"
            : "text-zinc-600 hover:text-zinc-800"
        }`}
      >
        Trackers
      </Link>

      {/* Productivity Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setIsProductivityOpen(true)}
        onMouseLeave={() => setIsProductivityOpen(false)}
      >
        <button
          className={`text-sm font-medium ${
            pathname.startsWith("/productivity")
              ? "text-blue-600"
              : "text-zinc-600 hover:text-zinc-800"
          }`}
        >
          Productivity ▾
        </button>

     {isProductivityOpen && (
        <div className="absolute top-full left-0 bg-white shadow-lg border rounded-md mt-1 w-48 z-10">
            <Link
             href="/productivity/app-blocker"
             className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
        >
        App Blocker
       </Link>
         <Link
            href="/productivity/kanban"
           className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
         >
            Kanban Board
            </Link>
            </div>
)}

      </div>

      {/* Mindfulness */}
      <Link
        href="/mindfulness"
        className={`text-sm font-medium ${
          pathname.startsWith("/mindfulness")
            ? "text-blue-600"
            : "text-zinc-600 hover:text-zinc-800"
        }`}
      >
        Mindfulness
      </Link>
    </nav>
  )
}

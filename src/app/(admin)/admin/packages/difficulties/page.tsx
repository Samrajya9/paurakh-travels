"use client"

import { useEffect, useState } from "react"

import AddDifficultyButton from "./components/add-difficulty-btn"
import DifficultyTable from "./components/difficulty-table"
import type { Difficulty } from "@/services/difficulty.service"

export default function Page() {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDifficulties()
  }, [])

  async function fetchDifficulties() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/difficulties")
      if (!res.ok) throw new Error("Failed to fetch difficulties")

      const data: Difficulty[] = await res.json()
      setDifficulties(data)
    } catch {
      setError("Something went wrong while loading difficulties.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Difficulties</h1>
          <p className="text-sm text-muted-foreground">
            Manage the difficulty levels assignable to packages.
          </p>
        </div>
        <AddDifficultyButton
          onCreated={(difficulty) =>
            setDifficulties((curr) =>
              [...curr, difficulty].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <DifficultyTable
        difficulties={difficulties}
        loading={loading}
        error={error}
        onRetry={fetchDifficulties}
        onUpdated={(difficulty) =>
          setDifficulties((curr) =>
            curr.map((d) => (d.id === difficulty.id ? difficulty : d))
          )
        }
        onDeleted={(id) =>
          setDifficulties((curr) => curr.filter((d) => d.id !== id))
        }
      />
    </div>
  )
}

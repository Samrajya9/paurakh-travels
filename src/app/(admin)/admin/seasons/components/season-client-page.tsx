"use client"

import { useState } from "react"
import AddSeasonButton from "./add-season-btn"
import SeasonTable from "./season-table"
import type { Season } from "@/services/season.service"

export default function SeasonClientPage({
  initialSeasons,
}: {
  initialSeasons: Season[]
}) {
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchSeasons() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/seasons")
      if (!res.ok) throw new Error("Failed to fetch seasons")

      const data: Season[] = await res.json()
      setSeasons(data)
    } catch {
      setError("Something went wrong while loading seasons.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Seasons</h1>
          <p className="text-sm text-muted-foreground">
            Manage the seasons used across packages.
          </p>
        </div>
        <AddSeasonButton
          onCreated={(season) =>
            setSeasons((curr) =>
              [...curr, season].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <SeasonTable
        seasons={seasons}
        loading={loading}
        error={error}
        onRetry={fetchSeasons}
        onUpdated={(season) =>
          setSeasons((curr) =>
            curr.map((item) => (item.id === season.id ? season : item))
          )
        }
        onDeleted={(id) =>
          setSeasons((curr) => curr.filter((item) => item.id !== id))
        }
      />
    </div>
  )
}

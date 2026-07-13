"use client"

import { useState } from "react"
import AddThemeButton from "./add-theme-btn"
import ThemeTable from "./theme-table"
import type { Theme } from "@/types/theme.type"

export default function ThemeClientPage({
  initialThemes,
}: {
  initialThemes: Theme[]
}) {
  const [themes, setThemes] = useState<Theme[]>(initialThemes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchThemes() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/themes")
      if (!res.ok) throw new Error("Failed to fetch themes")

      const data: Theme[] = await res.json()
      setThemes(data)
    } catch {
      setError("Something went wrong while loading themes.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Themes</h1>
          <p className="text-sm text-muted-foreground">
            Manage the themes used across packages.
          </p>
        </div>
        <AddThemeButton
          onCreated={(theme) =>
            setThemes((curr) =>
              [...curr, theme].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <ThemeTable
        themes={themes}
        loading={loading}
        error={error}
        onRetry={fetchThemes}
        onUpdated={(theme) =>
          setThemes((curr) =>
            curr.map((item) => (item.id === theme.id ? theme : item))
          )
        }
        onDeleted={(id) =>
          setThemes((curr) => curr.filter((item) => item.id !== id))
        }
      />
    </div>
  )
}

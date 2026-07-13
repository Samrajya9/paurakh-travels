"use client"

import { useEffect, useState } from "react"

import AddRegionButton from "./components/add-region-btn"
import RegionTable from "./components/region-table"
import type { Region } from "@/types/region.type"

export default function Page() {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRegions()
  }, [])

  async function fetchRegions() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/regions")
      if (!res.ok) throw new Error("Failed to fetch regions")

      const data: Region[] = await res.json()
      setRegions(data)
    } catch {
      setError("Something went wrong while loading regions.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Regions</h1>
          <p className="text-sm text-muted-foreground">
            Manage the regions used across destinations and packages.
          </p>
        </div>
        <AddRegionButton
          onCreated={(region) =>
            setRegions((curr) =>
              [...curr, region].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <RegionTable
        regions={regions}
        loading={loading}
        error={error}
        onRetry={fetchRegions}
        onUpdated={(region) =>
          setRegions((curr) =>
            curr.map((r) => (r.id === region.id ? region : r))
          )
        }
        onDeleted={(id) =>
          setRegions((curr) => curr.filter((r) => r.id !== id))
        }
      />
    </div>
  )
}

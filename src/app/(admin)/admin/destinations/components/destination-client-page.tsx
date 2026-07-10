"use client"

import { useState } from "react"
import AddDestinationButton from "./add-destination-btn"
import DestinationTable from "./destination-table"
import type { Destination } from "@/services/destination.service"

export default function DestinationClientPage({
  initialDestinations,
}: {
  initialDestinations: Destination[]
}) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchDestinations() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/destinations")
      if (!res.ok) throw new Error("Failed to fetch destinations")

      const data: Destination[] = await res.json()
      setDestinations(data)
    } catch {
      setError("Something went wrong while loading destinations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Destinations</h1>
          <p className="text-sm text-muted-foreground">
            Manage the destinations used across packages.
          </p>
        </div>
        <AddDestinationButton
          onCreated={(destination) =>
            setDestinations((curr) =>
              [...curr, destination].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <DestinationTable
        destinations={destinations}
        loading={loading}
        error={error}
        onRetry={fetchDestinations}
        onUpdated={(destination) =>
          setDestinations((curr) =>
            curr.map((d) => (d.id === destination.id ? destination : d))
          )
        }
        onDeleted={(id) =>
          setDestinations((curr) => curr.filter((d) => d.id !== id))
        }
      />
    </div>
  )
}

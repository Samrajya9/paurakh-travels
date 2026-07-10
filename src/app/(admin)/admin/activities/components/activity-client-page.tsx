"use client"

import { useState } from "react"
import AddActivityButton from "./add-activity-btn"
import ActivityTable from "./activity-table"
import type { Activity } from "@/services/activity.service"

export default function ActivityClientPage({
  initialActivities,
}: {
  initialActivities: Activity[]
}) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchActivities() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/activities")
      if (!res.ok) throw new Error("Failed to fetch activities")

      const data: Activity[] = await res.json()
      setActivities(data)
    } catch {
      setError("Something went wrong while loading activities.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Activities</h1>
          <p className="text-sm text-muted-foreground">
            Manage the activities used across packages.
          </p>
        </div>
        <AddActivityButton
          onCreated={(activity) =>
            setActivities((curr) =>
              [...curr, activity].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <ActivityTable
        activities={activities}
        loading={loading}
        error={error}
        onRetry={fetchActivities}
        onUpdated={(activity) =>
          setActivities((curr) =>
            curr.map((item) => (item.id === activity.id ? activity : item))
          )
        }
        onDeleted={(id) =>
          setActivities((curr) => curr.filter((item) => item.id !== id))
        }
      />
    </div>
  )
}

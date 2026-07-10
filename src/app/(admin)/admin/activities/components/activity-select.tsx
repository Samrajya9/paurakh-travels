"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

type Activity = { id: string; name: string }

type ActivitySelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function ActivitySelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: ActivitySelectProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Activity[]) => setActivities(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled || isLoading || error}
    >
      <SelectTrigger
        className="w-full"
        aria-invalid={ariaInvalid}
        onBlur={onBlur}
      >
        <SelectValue placeholder="Select a Activity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Activities</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading activities...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load activities
            </SelectItem>
          ) : (
            activities.map((activity) => (
              <SelectItem key={activity.id} value={activity.id}>
                {activity.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

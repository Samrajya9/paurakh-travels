"use client"

import { useEffect, useState } from "react"

import { Toggle } from "@/components/ui/toggle"
import { Skeleton } from "@/components/ui/skeleton"

type TagOption = { id: string; name: string }

type TagToggleGroupProps = {
  endpoint: string
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
  disabled?: boolean
  emptyLabel?: string
  "aria-invalid"?: boolean
}

// Generic multi-select "tag picker" for simple `{ id, name }` lookup
// entities (activities, seasons, themes, ...). Fetches the option list
// from `endpoint` and renders each as a toggle pill; selection is just
// an array of ids, so it drops straight into RHF via Controller.
export default function TagToggleGroup({
  endpoint,
  value = [],
  onChange,
  onBlur,
  disabled,
  emptyLabel = "Nothing to select yet.",
  "aria-invalid": ariaInvalid,
}: TagToggleGroupProps) {
  const [options, setOptions] = useState<TagOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: TagOption[]) => setOptions(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [endpoint])

  function toggle(id: string) {
    if (!onChange) return
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id]
    onChange(next)
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-destructive">Failed to load options.</p>
  }

  if (options.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      onBlur={onBlur}
      aria-invalid={ariaInvalid}
    >
      {options.map((option) => (
        <Toggle
          key={option.id}
          type="button"
          variant="outline"
          size="sm"
          pressed={value.includes(option.id)}
          onPressedChange={() => toggle(option.id)}
          disabled={disabled}
          className="rounded-full"
        >
          {option.name}
        </Toggle>
      ))}
    </div>
  )
}

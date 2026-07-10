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

type Season = { id: string; name: string }

type SeasonSelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function SeasonSelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: SeasonSelectProps) {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/seasons")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Season[]) => setSeasons(data))
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
        <SelectValue placeholder="Select a Season" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Seasons</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading seasons...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load seasons
            </SelectItem>
          ) : (
            seasons.map((season) => (
              <SelectItem key={season.id} value={season.id}>
                {season.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

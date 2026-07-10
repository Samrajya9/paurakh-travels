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

type Place = { id: string; name: string }

type PlaceSelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function PlaceSelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: PlaceSelectProps) {
  const [places, setPlaces] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/places")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Place[]) => setPlaces(data))
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
        <SelectValue placeholder="Select a Place" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Places</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading places...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load places
            </SelectItem>
          ) : (
            places.map((place) => (
              <SelectItem key={place.id} value={place.id}>
                {place.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

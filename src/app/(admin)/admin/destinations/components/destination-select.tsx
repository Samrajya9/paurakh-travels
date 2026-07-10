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

type Destination = { id: string; name: string }

type DestinationSelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function DestinationSelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: DestinationSelectProps) {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Destination[]) => setDestinations(data))
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
        <SelectValue placeholder="Select a Destination" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Destinations</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading destinations...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load destinations
            </SelectItem>
          ) : (
            destinations.map((destination) => (
              <SelectItem key={destination.id} value={destination.id}>
                {destination.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

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

type Theme = { id: string; name: string }

type ThemeSelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function ThemeSelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: ThemeSelectProps) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/themes")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Theme[]) => setThemes(data))
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
        <SelectValue placeholder="Select a Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading themes...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load themes
            </SelectItem>
          ) : (
            themes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

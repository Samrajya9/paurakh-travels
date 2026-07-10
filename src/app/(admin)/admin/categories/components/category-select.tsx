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

type Category = { id: string; name: string }

type CategorySelectProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export default function CategorySelect({
  value,
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Category[]) => setCategories(data))
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
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading categories...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              Failed to load categories
            </SelectItem>
          ) : (
            categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

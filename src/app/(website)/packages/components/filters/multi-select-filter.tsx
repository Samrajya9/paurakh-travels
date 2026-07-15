// components/filters/multi-select-filter.tsx
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MultiSelectFilterProps {
  title: string
  options: { id: string; name: string }[]
  values: string[]
  onToggle: (id: string) => void
}

export function MultiSelectFilter({
  title,
  options,
  values,
  onToggle,
}: MultiSelectFilterProps) {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div className="flex items-center gap-2" key={option.id}>
            <Checkbox
              id={`${title}-${option.id}`}
              checked={values.includes(option.id)}
              onCheckedChange={() => onToggle(option.id)}
            />
            <Label htmlFor={`${title}-${option.id}`}>{option.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

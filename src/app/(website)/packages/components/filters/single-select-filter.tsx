// components/filters/single-select-filter.tsx
"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const ALL_VALUE = "__all__"

interface SingleSelectFilterProps {
  title: string
  options: { id: string; name: string }[]
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export function SingleSelectFilter({
  title,
  options,
  value,
  onChange,
}: SingleSelectFilterProps) {
  return (
    <div className="space-y-3 py-4">
      <p className="text-md font-hanken-grotesk font-medium tracking-wide">
        {title}
      </p>
      <RadioGroup
        value={value ?? ALL_VALUE}
        onValueChange={(next) =>
          onChange(next === ALL_VALUE ? undefined : next)
        }
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value={ALL_VALUE} id={`${title}-all`} />
          <Label htmlFor={`${title}-all`}>All</Label>
        </div>
        {options.map((option) => (
          <div className="flex items-center gap-2" key={option.id}>
            <RadioGroupItem value={option.id} id={`${title}-${option.id}`} />
            <Label htmlFor={`${title}-${option.id}`}>{option.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

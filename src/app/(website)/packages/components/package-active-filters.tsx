"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePackageFilters } from "@/context/package-filters.context"

export default function PackageActiveFilters() {
  const { activeFilters, clearAll } = usePackageFilters()
  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((chip) => (
        <Button
          key={`${chip.key}`}
          size={"lg"}
          variant="secondary"
          onClick={chip.onRemove}
          aria-label={`Remove ${chip.label} filter`}
        >
          {chip.label}
          <X data-icon="inline-end" className="size-3 -translate-y-px" />
        </Button>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
        className="translate-y-px font-hanken-grotesk font-normal tracking-wider text-destructive"
      >
        Clear All
      </Button>
    </div>
  )
}

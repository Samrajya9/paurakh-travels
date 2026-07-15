// filters/season-filter.tsx
"use client"

import { MultiSelectFilter } from "./multi-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function SeasonFilter() {
  const { seasons, filters, toggleArrayFilter } = usePackageFilters()

  return (
    <MultiSelectFilter
      title="Season"
      options={seasons}
      values={filters.seasonIds}
      onToggle={(id) => toggleArrayFilter("seasonIds", id)}
    />
  )
}

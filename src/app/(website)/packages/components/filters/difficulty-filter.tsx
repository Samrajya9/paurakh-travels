// filters/difficulty-filter.tsx
"use client"
import { SingleSelectFilter } from "./single-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function DifficultyFilter() {
  const { difficulties, filters, setFilter } = usePackageFilters()
  return (
    <SingleSelectFilter
      title="Difficulty"
      options={difficulties}
      value={filters.difficultyId}
      onChange={(value) => setFilter("difficultyId", value)}
    />
  )
}

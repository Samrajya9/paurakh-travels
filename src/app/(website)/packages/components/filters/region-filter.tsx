"use client"
import { MultiSelectFilter } from "./multi-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function RegionFilter() {
  const { regions, filters, toggleArrayFilter } = usePackageFilters()
  return (
    <MultiSelectFilter
      title="Region"
      options={regions}
      values={filters.regionIds}
      onToggle={(id) => toggleArrayFilter("regionIds", id)}
    />
  )
}

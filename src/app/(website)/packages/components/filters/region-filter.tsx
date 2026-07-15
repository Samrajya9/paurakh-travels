// filters/region-filter.tsx
"use client"
import { SingleSelectFilter } from "./single-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function RegionFilter() {
  const { regions, filters, setFilter } = usePackageFilters()
  return (
    <SingleSelectFilter
      title="Region"
      options={regions}
      value={filters.regionId}
      onChange={(value) => setFilter("regionId", value)}
    />
  )
}

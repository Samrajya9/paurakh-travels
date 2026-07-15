// filters/activity-filter.tsx
"use client"
import { MultiSelectFilter } from "./multi-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function ActivityFilter() {
  const { activities, filters, toggleArrayFilter } = usePackageFilters()
  return (
    <MultiSelectFilter
      title="Activity"
      options={activities}
      values={filters.activityIds}
      onToggle={(id) => toggleArrayFilter("activityIds", id)}
    />
  )
}

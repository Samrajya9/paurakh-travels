// filters/category-filter.tsx
"use client"

import { SingleSelectFilter } from "./single-select-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function CategoryFilter() {
  const { categories, filters, setFilter } = usePackageFilters()

  return (
    <SingleSelectFilter
      title="Category"
      options={categories}
      value={filters.categoryId}
      onChange={(value) => setFilter("categoryId", value)}
    />
  )
}

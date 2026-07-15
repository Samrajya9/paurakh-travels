// app/
// └── packages/
//     └── page.tsx

import { Button } from "@/components/ui/button"
import RegionFilter from "./filters/region-filter"
import ActivityFilter from "./filters/activity-filter"
import ThemeFilter from "./filters/theme-filter"
import DifficultyFilter from "./filters/difficulty-filter"

// components/
// └── packages/
//     ├── package-listing.tsx        // Two-column layout
//     ├── package-filters.tsx        // Left sidebar
//     ├── package-results.tsx        // Right side
//     ├── package-grid.tsx
//     ├── package-sort.tsx
//     ├── package-active-filters.tsx
//     ├── package-pagination.tsx
//     └── filters/
//         ├── region-filter.tsx
//         ├── destination-filter.tsx
//         ├── difficulty-filter.tsx
//         ├── duration-filter.tsx
//         ├── theme-filter.tsx
//         └── price-filter.tsx

export default function PackageFilters() {
  return (
    <>
      <div className="max-w-70 flex-1">
        <div className="flex items-center justify-between gap-1 border-b pb-4">
          <h2 className="font-playfair text-3xl font-semibold tracking-wide">
            Filters
          </h2>
          <Button variant={"ghost"} asChild>
            <p className="translate-y-px font-hanken-grotesk text-xs font-normal tracking-wider text-foreground">
              Clear All
            </p>
          </Button>
        </div>

        <RegionFilter />
        <ActivityFilter />
        <ThemeFilter />
        <DifficultyFilter />
      </div>
    </>
  )
}

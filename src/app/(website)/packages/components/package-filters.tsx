"use client"
import { Button } from "@/components/ui/button"
import RegionFilter from "./filters/region-filter"
import ActivityFilter from "./filters/activity-filter"
import ThemeFilter from "./filters/theme-filter"
import DifficultyFilter from "./filters/difficulty-filter"
import SeasonFilter from "./filters/season-filter"
import CategoryFilter from "./filters/category-filter"
import SearchFilter from "./filters/search-filter"
import { usePackageFilters } from "@/context/package-filters.context"

export default function PackageFilters() {
  const { clearAll } = usePackageFilters()
  return (
    <>
      <div className="max-w-70 flex-1 space-y-4">
        <div className="flex h-12 items-center justify-between gap-1 border-b pb-4">
          <h2 className="font-playfair text-3xl font-semibold tracking-wide">
            Filters
          </h2>
          <Button
            variant={"ghost"}
            onClick={clearAll}
            className="translate-y-px font-hanken-grotesk font-normal tracking-wider"
          >
            Clear All
          </Button>
        </div>
        <div>
          <SearchFilter />
          <RegionFilter />
          <ActivityFilter />
          <ThemeFilter />
          <SeasonFilter />
          <DifficultyFilter />
          <CategoryFilter />
        </div>
      </div>
    </>
  )
}

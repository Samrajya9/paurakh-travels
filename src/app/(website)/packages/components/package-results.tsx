"use client"
import { usePackageFilters } from "@/context/package-filters.context"
import PackageActiveFilters from "./package-active-filters"
import { PackageGrid } from "./package-grid"

export default function PackageResults() {
  const { total } = usePackageFilters()
  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="h-12 border-b pb-4">
          <p className="text-left">
            <span className="font-bold">{total}</span> Expeditions Found
          </p>
        </div>
        <PackageActiveFilters />
        <PackageGrid />
      </div>
    </>
  )
}

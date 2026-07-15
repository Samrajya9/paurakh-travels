import ActivityFilter from "./filters/activity-filter"
import PackageActiveFilters from "./package-active-filters"

export default function PackageResults() {
  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="h-12 border-b pb-4">
          <p>
            <span className="font-bold">24</span> Expeditions Found
          </p>
        </div>
        <PackageActiveFilters />
      </div>
    </>
  )
}

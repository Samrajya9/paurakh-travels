import PackageFilters from "./package-filters"
import PackageResults from "./package-results"

export default function PackageListing() {
  return (
    <>
      <div className="flex items-start gap-4">
        <PackageFilters />
        <PackageResults />
      </div>
    </>
  )
}

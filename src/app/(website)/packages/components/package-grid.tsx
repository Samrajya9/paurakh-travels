"use client"
import { PackageCard } from "@/components/cards/package-card"
import { usePackageFilters } from "@/context/package-filters.context"

export function PackageGrid() {
  const { packages } = usePackageFilters()
  console.log(packages)

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {packages.map((pkg) => {
          return <PackageCard key={pkg.id} pkg={pkg} isLiked={false} />
        })}
      </div>
    </>
  )
}

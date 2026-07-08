import { PackageCard, TravelPackage } from "@/components/cards/package-card"
import { Section } from "@/components/ui/section"

interface FeaturedPackagesSectionProps {
  packages: TravelPackage[]
  heading?: string
  description?: string
  showDescription?: boolean
}

export function FeaturedPackagesSection({
  packages,
  heading = "Featured Packages",
  description = "Handpicked treks and cultural tours curated for their distinct character and exceptional quality.",
  showDescription = true,
}: FeaturedPackagesSectionProps) {
  return (
    <Section width="constrained" className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
          {heading}
        </h2>
        {showDescription && description && (
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
            {description}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </Section>
  )
}

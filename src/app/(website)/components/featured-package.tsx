import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { ViewExpeditionsLink } from "@/components/links/view-expeditions-link"
import { PackageCard } from "@/components/cards/package-card"
import { getAllPackages } from "@/services/package.service"

export default function FeaturedPackageSection() {
  return (
    <>
      <Section className="space-y-8">
        <FeaturedPackageSectionHeader />
        <FeaturedPackageSectionContent />
      </Section>
    </>
  )
}

function FeaturedPackageSectionHeader() {
  return (
    <SectionHeader
      className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      constrained
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Tour Packages
        </p>

        <h2 className="font-playfair text-3xl leading-tight font-semibold tracking-wide sm:text-4xl lg:text-5xl">
          Our Tourist Destinations
        </h2>
      </div>

      <div className="self-start lg:self-end">
        <ViewExpeditionsLink />
      </div>
    </SectionHeader>
  )
}

async function FeaturedPackageSectionContent() {
  const { packages } = await getAllPackages({ limit: 3 })

  return (
    <SectionContent constrained>
      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {packages?.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </SectionContent>
  )
}

import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import PackageListing from "./components/package-listing"
import { parsePackageFilters, toURLSearchParams } from "@/lib/package-filters"
import { PackageFiltersProvider } from "@/context/package-filters.context"
import { getAllRegions } from "@/services/region.service"
import { getAllDifficulties } from "@/services/difficulty.service"
import { getAllActivities } from "@/services/activity.service"
import { getAllThemes } from "@/services/theme.service"
import { getAllSeasons } from "@/services/season.service"
import { getAllCategories } from "@/services/category.service"
import { getAllPackages } from "@/services/package.service"
import { P } from "@/components/ui/paragraph"
import { H1 } from "@/components/ui/heading"

interface PackagesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PackagesPage({
  searchParams,
}: PackagesPageProps) {
  const resolved = await searchParams

  const filters = parsePackageFilters(toURLSearchParams(resolved))

  const [
    packages,
    regions,
    difficulties,
    activities,
    themes,
    seasons,
    categories,
  ] = await Promise.all([
    getAllPackages(filters),
    getAllRegions(),
    getAllDifficulties(),
    getAllActivities(),
    getAllThemes(),
    getAllSeasons(),
    getAllCategories(),
  ])
  return (
    <>
      <Section
        aria-labelledby="hero-heading"
        size={"sm"}
        className="space-y-20"
      >
        <SectionHeader constrained>
          <P variant={"xs"} className="mb-2 font-semibold text-primary">
            CURATED JOURNEYS
          </P>
          <H1 id="hero-heading">Explore the High Peaks</H1>
          <P className="mt-3 max-w-4xl" variant={"md"}>
            Discover your next legendary ascent. From the spiritual trails of
            the Khumbu to the technical challenges of Mustang, our curated
            expeditions are designed for those who seek the extraordinary.
          </P>
        </SectionHeader>

        <PackageFiltersProvider
          initialFilters={filters}
          initialPackages={packages.packages}
          initialTotal={packages.pagination.total}
          regions={regions}
          difficulties={difficulties}
          activities={activities}
          themes={themes}
          seasons={seasons}
          categories={categories}
        >
          <SectionContent constrained>
            <PackageListing />
          </SectionContent>
        </PackageFiltersProvider>
      </Section>
    </>
  )
}

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

interface PackagesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PackagesPage({
  searchParams,
}: PackagesPageProps) {
  const resolved = await searchParams

  const filters = parsePackageFilters(toURLSearchParams(resolved))

  const [regions, difficulties, activities, themes, seasons, categories] =
    await Promise.all([
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
          <p className="font-hanken-grotesk text-xs font-semibold tracking-wider text-primary">
            CURATED JOURNEYS
          </p>
          <h1
            id="hero-heading"
            className="max-w-4xl font-playfair text-4xl leading-[1.1] font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Explore the High Peaks
          </h1>
          <p className="mt-4 max-w-4xl font-hanken-grotesk text-base leading-6 tracking-wide">
            Discover your next legendary ascent. From the spiritual trails of
            the Khumbu to the technical challenges of Mustang, our curated
            expeditions are designed for those who seek the extraordinary.
          </p>
        </SectionHeader>

        <PackageFiltersProvider
          initialFilters={filters}
          initialPackages={[]}
          initialTotal={0}
          regions={regions}
          difficulties={difficulties}
          activities={activities}
          themes={themes}
          seasons={seasons}
          categories={categories}
        >
          <SectionContent constrained asChild>
            <PackageListing />
          </SectionContent>
        </PackageFiltersProvider>
      </Section>
    </>
  )
}

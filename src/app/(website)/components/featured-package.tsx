"use client"

import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { ViewExpeditionsLink } from "@/components/links/view-expeditions-link"

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
      className="flex w-full items-end justify-between gap-4"
      constrained
    >
      <div>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground">
          Tour packages
        </p>
        <h2 className="font-playfair text-3xl leading-[1.15] font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
          Our Tourist Destinations
        </h2>
      </div>
      <ViewExpeditionsLink />
    </SectionHeader>
  )
}

function FeaturedPackageSectionContent() {
  return (
    <SectionContent constrained>
      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {/* {packages?.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))} */}
      </div>
    </SectionContent>
  )
}

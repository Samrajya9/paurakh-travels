"use client"

import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const regions = [
  {
    title: "Everest Region",
    description:
      "Home to the world's highest peak and legendary Sherpa hospitality.",
    slug: "/regions/everest",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Annapurna Region",
    description:
      "Dramatic ridgelines and diverse landscapes for every kind of trekker.",
    slug: "/regions/annapurna",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Langtang Region",
    description:
      "Untouched valleys just north of Kathmandu, rich in Tamang culture.",
    slug: "/regions/langtang",
    image:
      "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mustang Region",
    description:
      "A high-altitude desert kingdom with ancient monasteries and lore.",
    slug: "/regions/mustang",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
  },
]

export default function BestRegionBento() {
  return (
    <Section className="space-y-8 outline">
      <BestRegionBentoHeader />
      <BestRegionBentoSectionContent />
    </Section>
  )
}

function BestRegionBentoHeader() {
  return (
    <>
      <SectionHeader className="flex w-full items-start justify-between gap-6 outline">
        <div className="flex-2 space-y-1">
          <Button variant={"link"} asChild className="px-0">
            <Link href={"/packages"}>
              <span className="upper tracking-[0.2em]">BEST REGIONS</span>
              <ArrowRight className="-translate-y-px" />
            </Link>
          </Button>
          <h2 className="font-playfair text-3xl leading-[1.15] font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
            Discover the Best Regions
          </h2>
        </div>
        <div className="flex-1">
          <p className="text-base leading-relaxed tracking-wide text-muted-foreground">
            Extraordinary natural beauty, enjoy the rich culture, and experience
            the friendliness of the local people in these legendary regions.
          </p>
        </div>
      </SectionHeader>
    </>
  )
}

function BestRegionBentoSectionContent() {
  return (
    <SectionContent className="grid grid-cols-1 gap-4 outline sm:h-[700px] sm:grid-cols-3 sm:grid-rows-2 lg:h-[800px]">
      {regions.map((region, index) => (
        <div
          key={region.slug}
          className={
            index === 0 || index === 3
              ? "h-72 sm:col-span-2 sm:h-auto"
              : "h-72 sm:col-span-1 sm:h-auto"
          }
        >
          <RegionBentoCard {...region} />
        </div>
      ))}
    </SectionContent>
  )
}

function RegionBentoCard({
  title,
  description,
  slug,
  image,
}: {
  title: string
  description: string
  slug: string
  image: string
}) {
  return (
    <Link
      href={slug}
      className="group relative block h-full w-full overflow-clip rounded-lg"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </Link>
  )
}

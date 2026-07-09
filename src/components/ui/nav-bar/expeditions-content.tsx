"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronRight, Clock, Clock1 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { mockNavBarData } from "@/lib/mock-nav-data"
import Link from "next/link"

// This pacakge Categoresi comes from api
const pacakageCategories = Object.keys(mockNavBarData.expeditions) as Array<
  keyof typeof mockNavBarData.expeditions
>

const data = mockNavBarData.expeditions

export default function ExpeditionContent() {
  const [active, setActive] = useState<string>(pacakageCategories[0])

  return (
    <>
      <Tabs
        value={active}
        orientation="vertical"
        onValueChange={setActive}
        className="z-20 w-[720px] flex-row"
      >
        {/* LEFT */}
        <div className={cn("flex flex-col gap-2 px-2 py-4", "w-[240px]")}>
          <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
            {"ACTIVITIES"}
          </span>
          <TabsList className="h-auto w-full flex-col items-stretch justify-start gap-0.5 bg-transparent p-0">
            {pacakageCategories.map((item) => {
              return (
                <TabsTrigger
                  key={item}
                  value={item}
                  onMouseEnter={() => setActive(item)}
                  onFocus={() => setActive(item)}
                  className={cn(
                    "group/newTrigger",
                    "justify-between! rounded-md! p-2! text-sm! font-normal! data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                  )}
                >
                  <span>{item}</span>
                  <ChevronRight className="size-4 transition-transform group-hover/newTrigger:translate-x-1" />
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {/* RIGHT */}
        <div className={cn("flex flex-1 flex-col gap-2 px-2 py-4", "border-l")}>
          <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
            {"PACKAGES"}
          </span>
          {pacakageCategories.map((item) => {
            return (
              <TabsContent key={item} value={item} className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  {data[item]?.length ? (
                    data[item].map((pkg) => (
                      <PackagePreviewCard key={pkg.slug} pkg={pkg} />
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No packages yet.
                    </span>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </>
  )
}

interface TravelPackage {
  slug: string
  name: string
  duration: string
}

function PackagePreviewCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col gap-0.5 rounded-md p-2 transition-colors hover:bg-primary"
    >
      <span className="text-sm leading-none font-semibold group-hover:text-primary-foreground">
        {pkg.name}
      </span>

      <span className="text-xs text-muted-foreground group-hover:text-primary-foreground">
        Duration: {pkg.duration}
      </span>
    </Link>
  )
}

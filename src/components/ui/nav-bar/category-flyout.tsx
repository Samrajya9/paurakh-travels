"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
      <span className="line-clamp-2 text-xs text-muted-foreground group-hover:text-primary-foreground">
        {pkg.duration}
      </span>
    </Link>
  )
}

export function CategoryFlyout({
  items,
  data,
  leftLabel,
  rightLabel = "Featured Packages",
}: {
  items: readonly string[]
  data: Record<string, TravelPackage[]>
  leftLabel: string
  rightLabel?: string
}) {
  const [active, setActive] = useState<string>(items[0])

  return (
    <Tabs
      value={active}
      onValueChange={setActive}
      orientation="vertical"
      className="z-20 w-[720px] flex-row"
    >
      {/* Left column: category list */}
      <div className={cn("flex flex-col gap-2 px-2 py-4", "w-[240px]")}>
        <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
          {leftLabel}
        </span>
        <TabsList className="h-auto w-full flex-col items-stretch justify-start gap-0.5 bg-transparent p-0">
          {items.map((item) => {
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

      {/* Right column: package preview */}
      <div className={cn("flex flex-1 flex-col gap-2 px-2 py-4", "border-l")}>
        <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
          {rightLabel}
        </span>
        {items.map((item) => {
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
  )
}

"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import NavTravelCard, { type TravelPackage } from "./nav-travel-card"

interface CategoryTabsProps {
  data: Record<string, TravelPackage[]>
  leftLabel: string
  rightLabel?: string
  gridMinWidth?: number
}

export default function CategoryTabs({
  data,
  leftLabel,
  rightLabel = "PACKAGES",
  gridMinWidth = 200,
}: CategoryTabsProps) {
  const keys = Object.keys(data) as Array<keyof typeof data>
  const [active, setActive] = useState<string>(keys[0])

  return (
    <Tabs
      value={active}
      orientation="vertical"
      onValueChange={setActive}
      className="w-full flex-row"
    >
      {/* LEFT */}
      <div className={cn("flex flex-col gap-2 py-4", "max-w-60 flex-1")}>
        <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
          {leftLabel}
        </span>
        <TabsList className="h-auto w-full flex-col items-stretch justify-start gap-0.5 bg-transparent p-0">
          {keys.map((item) => {
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
      <div className={cn("flex flex-1 flex-col gap-2 py-4 pl-6", "border-l")}>
        <span className="px-2 font-medium tracking-wider text-muted-foreground uppercase">
          {rightLabel}
        </span>
        {keys.map((item) => {
          return (
            <TabsContent key={item} value={item} className="mt-0">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(${gridMinWidth}px, 1fr))`,
                }}
              >
                {data[item]?.length ? (
                  data[item].map((pkg) => (
                    <NavTravelCard key={pkg.slug} pkg={pkg} />
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

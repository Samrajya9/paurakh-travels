"use client"

import React, { useState } from "react"
import PackageDetailSection from "./package_detail_section"
import { itineraryData, ItineraryStat } from "@/types/package_detail_data"
import PhotoStack from "./photo_stack"

const StatIcon = ({ type, className }: { type: ItineraryStat["icon"], className: string }) => {
  if (type === "duration") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === "distance") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 19c2-1.5 3.5-1.5 5 0s3 1.5 5 0 3.5-1.5 5 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 19V9l4-4 4 4v10M13 19v-6l4-2 2 2v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 19h18L13.5 5.5a1 1 0 0 0-1.7 0L8.5 11l-1.2-1.7a1 1 0 0 0-1.6 0L3 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9.5 13 2-2.7 2.2 2.7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
      }`}
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Itinerary = () => {
  const [openDay, setOpenDay] = useState<number | null>(1)

  const toggleDay = (day: number) => {
    setOpenDay((prev) => (prev === day ? null : day))
  }

  return (
    <PackageDetailSection title="Itinerary">
      <div className="relative">
        {itineraryData.map((item, idx) => {
          const isOpen = openDay === item.day
          const isLast = idx === itineraryData.length - 1

          return (
            <div key={item.day} className="relative flex gap-4 sm:gap-6">
              {/* Timeline rail */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => toggleDay(item.day)}
                  aria-expanded={isOpen}
                  className={`flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border text-xs sm:text-sm font-semibold transition-colors duration-300 ${isOpen
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                    }`}
                >
                  {item.day}
                </button>
                {!isLast && (
                  <div
                    className={`w-px flex-1 transition-colors duration-300 ${isOpen ? "bg-primary/40" : "bg-border"
                      }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
                <button
                  onClick={() => toggleDay(item.day)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <PhotoStack images={item.images} alt={item.title} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase leading-2 tracking-wide text-muted-foreground">
                        Day {item.day}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xl text-muted-foreground">
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                     {item.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center gap-3 rounded-xl bg-muted py-3 px-2.5"
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center">
                            <StatIcon className="size-10 text-primary" type={stat.icon} />
                          </div>
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <span className="truncate text-base font-semibold leading-none text-foreground">
                              {stat.value}
                            </span>
                            <span className="truncate text-xs leading-none text-muted-foreground">
                              {stat.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PackageDetailSection>
  )
}

export default Itinerary
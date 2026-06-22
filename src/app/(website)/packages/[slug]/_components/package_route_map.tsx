"use client"

import React, { useState } from "react"
import { Icon } from "../page"
import { Button } from "@/components/ui/button"

// 1. Defining standard interface for your route stops data array
interface RouteMapProps {
  data?: readonly string[]
}

const RouteMap: React.FC<RouteMapProps> = ({ data = [] }) => {
  const [expanded, setExpanded] = useState(false)

  // Guard clause against empty or undefined data arrays to prevent app crashes
  if (!data || data.length === 0) {
    return null
  }

  // Safely grab the stops between start and finish
  const middleStops = data.slice(1, -1)
  const hiddenCount = middleStops.length

  return (
    <>
      <section className="border-b border-gray-100 py-8">
        <h2 className="mb-5 text-xl font-bold text-gray-900">Route Map</h2>

        {/* Top visual graphic illustration block */}
        <div className="relative mb-5 h-64 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <svg
            viewBox="0 0 600 240"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 240 Q150 180 300 200 Q450 220 600 200 L600 240Z"
              fill="#d1fae5"
              opacity="0.5"
            />
            <path
              d="M50 240 Q120 160 200 180 Q280 200 350 140 Q420 80 500 120 Q560 150 600 130 L600 240Z"
              fill="#a7f3d0"
              opacity="0.35"
            />
            <polyline
              points="80,190 160,165 230,140 300,125 360,138 420,115 510,145"
              stroke="#E63946"
              strokeWidth="2.5"
              strokeDasharray="7 4"
              strokeLinecap="round"
            />
            {(
              [
                [80, 190],
                [160, 165],
                [230, 140],
                [300, 125],
                [360, 138],
                [420, 115],
                [510, 145],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="#E63946"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
          {/* <Button className="absolute right-3 bottom-3" variant={"outline"}>
            <Icon.Map />
            View Map
          </Button> */}
          <button className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-[#E63946] hover:bg-white hover:text-[#E63946]">
            <Icon.Map /> View Map
          </button>
        </div>

        {/* Dynamic Horizontal Timeline Sequence */}
        <div className="flex w-full items-center gap-0 overflow-x-auto pb-1">
          {/* Starting Destination Node */}
          <div className="flex flex-shrink-0 flex-col items-start pr-2">
            <div className="mb-1 flex items-center gap-1 text-[#E63946]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span className="text-xs font-semibold">Starts</span>
            </div>
            <span className="text-xs font-medium whitespace-nowrap text-gray-700">
              {data[0]}, Nepal
            </span>
          </div>

          {/* Interactive Middle Segment Connector Grid */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-[16px] flex-1 border-t-2 border-dashed border-gray-300" />
            {!expanded && hiddenCount > 0 ? (
              <button
                onClick={() => setExpanded(true)}
                className="mx-3 flex-shrink-0 rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold whitespace-nowrap text-gray-600 transition-colors hover:border-[#E63946] hover:text-[#E63946]"
              >
                +{hiddenCount} More Destinations
              </button>
            ) : (
              <div className="flex items-center overflow-x-auto">
                {middleStops.map((stop, idx) => (
                  <div key={idx} className="flex flex-shrink-0 items-center">
                    <div className="w-5 border-t-2 border-dashed border-gray-300" />
                    <div className="mx-0.5 flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#E63946]" />
                      <span className="mt-0.5 text-[10px] whitespace-nowrap text-gray-500">
                        {stop}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="min-w-[16px] flex-1 border-t-2 border-dashed border-gray-300" />
          </div>

          {/* Ending Destination Node */}
          <div className="flex flex-shrink-0 flex-col items-end pl-2">
            <div className="mb-1 flex items-center gap-1 text-[#E63946]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <rect x="3" y="15" width="2" height="7" fill="currentColor" />
              </svg>
              <span className="text-xs font-semibold">Ends</span>
            </div>
            <span className="text-xs font-medium whitespace-nowrap text-gray-700">
              {data[data.length - 1]}, Nepal
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default RouteMap

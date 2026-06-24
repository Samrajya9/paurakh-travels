"use client"

import React, { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RouteStop {
  name: string
  day?: number
  altitude?: number // metres
  lat?: number
  lng?: number
}

interface RouteMapProps {
  data?: readonly (string | RouteStop)[]
  packageName?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRIMARY = "#f9600a"

const toStop = (d: string | RouteStop, i: number): RouteStop =>
  typeof d === "string" ? { name: d, day: i + 1 } : d

// Dummy altitude data — replace with real data from your API
const DUMMY_ALTITUDE: RouteStop[] = [
  { name: "Kathmandu", day: 1, altitude: 1400, lat: 27.7172, lng: 85.3240 },
  { name: "Lukla", day: 2, altitude: 2860, lat: 27.6869, lng: 86.7290 },
  { name: "Namche", day: 4, altitude: 3440, lat: 27.8069, lng: 86.7138 },
  { name: "Tengboche", day: 6, altitude: 3860, lat: 27.8361, lng: 86.7642 },
  { name: "Dingboche", day: 8, altitude: 4360, lat: 27.8939, lng: 86.8303 },
  { name: "Lobuche", day: 10, altitude: 4940, lat: 27.9478, lng: 86.8119 },
  { name: "EBC", day: 12, altitude: 5364, lat: 27.9881, lng: 86.9250 },
]

// ─── Custom Tooltip for Altitude Chart ───────────────────────────────────────

const AltTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 shadow-lg">
      <p className="mb-0.5 text-xs font-semibold text-gray-800">{label}</p>
      <p className="text-xs" style={{ color: PRIMARY }}>
        {payload[0].value.toLocaleString()} m
      </p>
    </div>
  )
}

// ─── Altitude Area Chart (Recharts via shadcn chart primitives) ───────────────

const AltitudeChart: React.FC<{ stops: RouteStop[] }> = ({ stops }) => {
  // Merge passed stops with dummy data — use dummy if stop has no altitude
  const chartData = stops.map((s, i) => {
    const match = DUMMY_ALTITUDE.find((d) => d.name === s.name) ?? DUMMY_ALTITUDE[i]
    return {
      name: s.name,
      label: s.day != null ? `Day ${s.day}` : s.name,
      altitude: s.altitude ?? match?.altitude ?? 0,
    }
  })

  return (
    <div className="w-full px-4 pb-4 pt-2">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.18} />
              <stop offset="95%" stopColor={PRIMARY} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
            width={40}
          />
          <Tooltip content={<AltTooltip />} />
          <Area
            type="monotone"
            dataKey="altitude"
            stroke={PRIMARY}
            strokeWidth={2.5}
            fill="url(#altGrad)"
            dot={{ fill: PRIMARY, r: 4, strokeWidth: 2, stroke: "white" }}
            activeDot={{ r: 6, fill: "white", stroke: PRIMARY, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Leaflet Map (dynamic — no SSR) ──────────────────────────────────────────
// We lazy-load the entire map block so Leaflet's window references don't break SSR.

const LeafletRouteMap = dynamic(() => import("./leaflet_route_map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center text-xs text-gray-400">
      Loading map…
    </div>
  ),
})

// ─── Icons ────────────────────────────────────────────────────────────────────

const PinIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
)

const FlagIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <rect x="3" y="15" width="2" height="7" />
  </svg>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const RouteMap: React.FC<RouteMapProps> = ({ data = [] }) => {
  const [expanded, setExpanded] = useState(false)
  const [mapMode, setMapMode] = useState<"route" | "altitude">("route")

  if (!data || data.length === 0) return null

  // Merge passed data with dummy lat/lng if needed
  const stops: RouteStop[] = data.map((d, i) => {
    const base = toStop(d, i)
    const dummy = DUMMY_ALTITUDE[i % DUMMY_ALTITUDE.length]
    return {
      lat: base.lat ?? dummy.lat,
      lng: base.lng ?? dummy.lng,
      altitude: base.altitude ?? dummy.altitude,
      day: base.day ?? dummy.day,
      ...base,
    }
  })

  const middleStops = stops.slice(1, -1)
  const hiddenCount = middleStops.length

  return (
    <section className="border-b border-gray-100 py-8">
      <h2 className="mb-5 text-xl font-bold">Route Map</h2>

      {/* ── Map Card ─────────────────────────────────────── */}
      <div className="mb-5 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {/* Toggle */}
        <div className="flex items-center gap-1 border-b border-gray-100 bg-white px-2 py-2">
          {(["route", "altitude"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setMapMode(mode)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${mapMode === mode
                  ? "bg-red-50 text-red-500 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
            >
              {mode === "route" ? (
                <>
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                  </svg>
                  Route Map
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Altitude Profile
                </>
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        {mapMode === "route" ? (
          <LeafletRouteMap stops={stops} />
        ) : (
          <AltitudeChart stops={stops} />
        )}
      </div>

      {/* ── Horizontal Timeline ───────────────────────────── */}
      <div className="flex w-full items-center overflow-x-auto pb-1">
        {/* Start */}
        <div className="flex shrink-0 flex-col items-start pr-3">
          <div className="mb-1.5 flex items-center gap-1" style={{ color: PRIMARY }}>
            <PinIcon className="h-4 w-4" />
            <span className="text-xs font-semibold">Start</span>
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-gray-500">
            {stops[0].name}
          </span>
        </div>

        {/* Middle */}
        <div className="flex min-w-0 flex-1 items-center">
          <div className="h-0 flex-1 border-t-2 border-dashed border-gray-300" style={{ minWidth: 12 }} />

          {!expanded && hiddenCount > 0 ? (
            <button
              onClick={() => setExpanded(true)}
              className="mx-3 shrink-0 whitespace-nowrap rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:border-red-400 hover:text-red-500"
            >
              +{hiddenCount} stops
            </button>
          ) : (
            <div className="flex items-center">
              {middleStops.map((stop, idx) => (
                <div key={idx} className="flex shrink-0 items-center">
                  <div className="h-0 border-t-2 border-dashed border-gray-300" style={{ width: 20 }} />
                  <div className="mx-1 flex flex-col items-center">
                    <span
                      className="whitespace-nowrap text-center leading-none text-gray-500"
                      style={{ fontSize: 10, height: 14, display: "flex", alignItems: "flex-end" }}
                    >
                      {idx % 2 === 0 ? stop.name : ""}
                    </span>
                    <div
                      className="rounded-full border-2 border-white shadow-sm"
                      style={{ width: 10, height: 10, backgroundColor: PRIMARY, flexShrink: 0, margin: "2px 0" }}
                    />
                    <span
                      className="whitespace-nowrap text-center leading-none text-gray-500"
                      style={{ fontSize: 10, height: 14, display: "flex", alignItems: "flex-start" }}
                    >
                      {idx % 2 !== 0 ? stop.name : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="h-0 flex-1 border-t-2 border-dashed border-gray-300" style={{ minWidth: 12 }} />
        </div>

        {/* End */}
        <div className="flex shrink-0 flex-col items-end pl-3">
          <div className="mb-1.5 flex items-center gap-1" style={{ color: PRIMARY }}>
            <FlagIcon className="h-4 w-4" />
            <span className="text-xs font-semibold">End</span>
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-gray-500">
            {stops[stops.length - 1].name}
          </span>
        </div>
      </div>

      {expanded && hiddenCount > 0 && (
        <Button
          onClick={() => setExpanded(false)}
          variant="outline"
          className="mt-2 text-xs text-gray-400 transition-colors hover:text-gray-600 block mx-auto rounded-2xl"
        >
          Collapse
        </Button>
      )}
    </section>
  )
}

export default RouteMap
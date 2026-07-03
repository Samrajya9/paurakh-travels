"use client"

import React, { useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import { RouteStop } from "./package_route_map"

const PRIMARY = "#f9600a"

// ─── Fix default icon paths broken by Webpack ─────────────────────────────────
// (Leaflet's default icons reference URLs that Next.js/Webpack can't resolve)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// ─── Custom SVG DivIcon ────────────────────────────────────────────────────────

const makeIcon = (label: string, isEndpoint: boolean) =>
  L.divIcon({
    className: "",
    iconAnchor: [16, 38],
    popupAnchor: [0, -40],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <div style="
          background:white;
          color:${PRIMARY};
          font-size:10px;
          font-weight:700;
          font-family:system-ui,sans-serif;
          padding:2px 6px;
          border-radius:999px;
          border:1.5px solid ${PRIMARY};
          white-space:nowrap;
          box-shadow:0 1px 4px rgba(0,0,0,0.14);
          line-height:1.4;
        ">${label}</div>
        <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C9.373 2 4 7.373 4 14C4 23.5 16 36 16 36C16 36 28 23.5 28 14C28 7.373 22.627 2 16 2Z"
            fill="${PRIMARY}" stroke="white" stroke-width="2"/>
          <circle cx="16" cy="14" r="${isEndpoint ? 5 : 4}" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 52],
  })

// ─── Auto-fit bounds ───────────────────────────────────────────────────────────

const FitBounds: React.FC<{ positions: [number, number][] }> = ({ positions }) => {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] })
    }
  }, [map, positions])
  return null
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  stops: RouteStop[]
}

const LeafletRouteMap: React.FC<Props> = ({ stops }) => {
  const positions: [number, number][] = stops
    .filter((s) => s.lat != null && s.lng != null)
    .map((s) => [s.lat!, s.lng!])

  const center: [number, number] =
    positions.length > 0
      ? [
          positions.reduce((a, p) => a + p[0], 0) / positions.length,
          positions.reduce((a, p) => a + p[1], 0) / positions.length,
        ]
      : [27.85, 86.8]

  return (
    <div style={{ width: "100%", height: 300, position: "relative" }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        {/* OpenStreetMap tiles — free, no API key */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fit map to all markers */}
        {positions.length > 1 && <FitBounds positions={positions} />}

        {/* Route polyline */}
        {positions.length > 1 && (
          <Polyline
            positions={positions}
            pathOptions={{
              color: PRIMARY,
              weight: 3,
              dashArray: "8 5",
              lineCap: "round",
            }}
          />
        )}

        {/* Markers */}
        {stops.map((stop, i) => {
          if (stop.lat == null || stop.lng == null) return null
          const isEndpoint = i === 0 || i === stops.length - 1
          return (
            <Marker
              key={i}
              position={[stop.lat, stop.lng]}
              icon={makeIcon(stop.name, isEndpoint)}
            >
              <Popup>
                <div style={{ fontFamily: "system-ui, sans-serif", minWidth: 110 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 2px", color: "#111" }}>
                    {stop.name}
                  </p>
                  {stop.day && (
                    <p style={{ fontSize: 11, margin: "0 0 2px", color: PRIMARY }}>
                      Day {stop.day}
                    </p>
                  )}
                  {stop.altitude && (
                    <p style={{ fontSize: 11, margin: 0, color: "#f9600a" }}>
                      {stop.altitude.toLocaleString()} m
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default LeafletRouteMap
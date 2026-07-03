"use client"

import React from "react"

interface PhotoStackProps {
  images: string[]
  alt: string
}

const MAX_VISIBLE = 3

// One entry per visible tile (max 3). Resting = tight overlapping fan.
// Scattered = spread out with gaps, on hover of the whole cluster.
const TILE_TRANSFORMS = [
  { resting: "translateY(4px) rotate(-7deg)", scattered: "translate(-44px, -8px) rotate(-8deg)" },
  { resting: "translateY(-6px) rotate(3deg)", scattered: "translate(0px, -28px) rotate(2deg)" },
  { resting: "translateY(8px) rotate(9deg)", scattered: "translate(44px, -8px) rotate(9deg)" },
]

const PhotoStack = ({ images, alt }: PhotoStackProps) => {
  const visible = images.slice(0, MAX_VISIBLE)
  const remaining = images.length - MAX_VISIBLE
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [isScattered, setIsScattered] = React.useState(false)

  return (
    <div
      className="relative size-14 shrink-0 sm:size-16"
      onMouseEnter={() => setIsScattered(true)}
      onMouseLeave={() => {
        setIsScattered(false)
        setHovered(null)
      }}
    >
      {visible.map((src, idx) => {
        const isTopMost = idx === visible.length - 1
        const showBadge = isTopMost && remaining > 0
        const transform = isScattered
          ? TILE_TRANSFORMS[idx].scattered
          : TILE_TRANSFORMS[idx].resting
        const isHoveredTile = hovered === idx

        return (
          <div
            key={src + idx}
            onMouseEnter={() => setHovered(idx)}
            className="absolute inset-0 size-14 overflow-hidden rounded-xl border-2 border-card shadow-sm transition-transform duration-300 ease-out sm:size-16"
            style={{
              transform: isHoveredTile ? `${transform} scale(1.18)` : transform,
              zIndex: isHoveredTile ? 30 : idx,
            }}
          >
            <img
              src={src}
              alt={`${alt} photo ${idx + 1}`}
              className="size-full object-cover"
            />
            {showBadge && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-foreground/55 text-xs font-semibold text-primary-foreground backdrop-blur-[1px] transition-opacity duration-200"
                style={{ opacity: isScattered ? 0 : 1 }}
              >
                +{remaining}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PhotoStack
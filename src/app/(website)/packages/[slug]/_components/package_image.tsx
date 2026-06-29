import React, { useState } from "react"
import { Icon } from "../page"
import Image from "next/image"

// 1. Updated Props Interface for PackageImage to expect data
interface PackageImageProp {
  src: string
  alt: string
}

interface PackageImageProps {
  data: PackageImageProp[]
}

// 2. Typing the PhotoGallery component props
interface PhotoGalleryProps {
  images: PackageImageProp[]
  onViewAll: () => void
}

function PhotoGallery({ images, onViewAll }: PhotoGalleryProps) {
  const [active, setActive] = useState(0)

  // Early return fallback in case an empty array is provided
  if (!images || images.length === 0) return null

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-3 md:grid-cols-5">
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 sm:aspect-[3/2] md:col-span-3">
        <Image
          src={images[active]?.src}
          alt={images[active]?.alt}
          fill
          priority // Added priority since this is a primary top-of-page element
          className="h-full w-full object-cover transition-all duration-300 select-none"
        />

        {/* Navigation buttons */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:scale-105 hover:bg-white focus:ring-2 focus:ring-[#E63946] focus:outline-none"
        >
          <Icon.ChevLeft />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:scale-105 hover:bg-white focus:ring-2 focus:ring-[#E63946] focus:outline-none"
        >
          <Icon.ChevRight />
        </button>

        <button
          onClick={onViewAll}
          className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-black/85"
        >
          <Icon.ImageIcon /> {images.length} Photos
        </button>
      </div>

      {/* Thumbnails */}
      <div className="hidden h-full grid-cols-2 content-stretch gap-2.5 md:col-span-2 md:grid">
        {images.slice(0, 4).map((img, idx) => {
          const isLastSlot = idx === 3
          const remainingCount = images.length - 4

          return (
            <button
              key={idx}
              onClick={
                isLastSlot && remainingCount > 0
                  ? onViewAll
                  : () => setActive(idx)
              }
              className={`relative aspect-square w-full overflow-hidden rounded-lg transition-all focus:ring-2 focus:ring-[#E63946] focus:outline-none ${
                active === idx && !(isLastSlot && remainingCount > 0)
                  ? "opacity-100 ring-2 ring-[#E63946]"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                fill
                sizes="(max-width: 768px) 0px, 20vw" // Optimization: tells browser exact size of thumbs
              />

              {/* "+X more" Text Overlay */}
              {isLastSlot && remainingCount > 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-sm font-bold text-white transition-colors hover:bg-black/50 lg:text-base">
                  <span>+{remainingCount} More</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 3. Updated main component to accept the data prop
const PackageImage: React.FC<PackageImageProps> = ({ data }) => {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      <PhotoGallery images={data} onViewAll={() => setGalleryOpen(true)} />

      {galleryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setGalleryOpen(false)}
          >
            <Icon.Close />
          </button>
          <p className="text-sm text-white/50">All {data.length} photos</p>
        </div>
      )}
    </>
  )
}

export default PackageImage

"use client"

import React, { useState } from "react"
import PackageTitle from "./package_title"
import { Icon } from "../page"
import StarRating from "./package_rating"
import PackageImage from "./package_image"

interface PackageHeroProps {
  title: string
  rating: number
  reviewCount: number
}

const MOCK_IMAGES = [
  {
    src: "https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?q=80&w=1169&auto=format&fit=crop",
    alt: "Trekkers at Everest viewpoint",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    alt: "Himalayan panorama",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1176&auto=format&fit=crop",
    alt: "Luxury mountain lodge",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop",
    alt: "Helicopter over Everest",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop",
    alt: "Helicopter over Everest",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop",
    alt: "Helicopter over Everest",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop",
    alt: "Helicopter over Everest",
  },
]

const PackageHero: React.FC<PackageHeroProps> = ({
  title,
  rating,
  reviewCount,
}) => {
  const [shareToast, setShareToast] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch { }
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2500)
  }

  return (
    <section className="mb-6 w-full space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PackageTitle title={title} />
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleShare}
            className="relative flex items-center gap-1.5 rounded-lg border border-muted-foreground px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 ease-in hover:scale-[1] hover:border-primary hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none active:scale-[0.98]"
          >
            <Icon.Share /> Share
            {shareToast && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-gray-900 px-2.5 py-1 text-xs whitespace-nowrap text-white shadow-lg animate-in fade-in duration-300">
                Link copied!
              </span>
            )}
          </button>

          <button className="flex items-center gap-1.5 rounded-lg border border-muted-foreground px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 ease-in hover:scale-[1] hover:border-primary hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none active:scale-[0.98]">
            <Icon.Doc /> Get Brochure
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="rounded-md bg-primary px-2 py-2 text-xs leading-1 font-bold text-white">
          {rating.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          Based on{" "}
          <button className="font-medium text-primary hover:underline focus:outline-none transition-all duration-300">
            {reviewCount} reviews
          </button>
        </span>
      </div>

      <PackageImage data={MOCK_IMAGES} />
    </section>
  )
}

export default PackageHero

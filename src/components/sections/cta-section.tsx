"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Users, Shield, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const CTA_IMAGE = {
  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  alt: "Towering mountain peaks with dramatic alpine scenery",
} as const

interface TrustIndicator {
  icon: React.ReactNode
  label: string
  value: string
}

const TRUST_INDICATORS: TrustIndicator[] = [
  {
    icon: <Star className="size-5" />,
    label: "Average Rating",
    value: "4.9/5",
  },
  {
    icon: <Users className="size-5" />,
    label: "Happy Travelers",
    value: "5,000+",
  },
  {
    icon: <Shield className="size-5" />,
    label: "Local Guides",
    value: "Licensed",
  },
]

function GradientOverlay() {
  return (
    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/60" />
  )
}

interface CTASectionProps {
  heading?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  trustIndicators?: TrustIndicator[]
  showTrustRow?: boolean
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function CTASection({
  heading = "Your Next Adventure Starts Here",
  description = "Whether you're dreaming of trekking to Everest Base Camp, exploring hidden Himalayan trails, or discovering Nepal's cultural wonders, our expertly crafted journeys are designed to create unforgettable memories.",
  primaryButtonLabel = "Explore Packages",
  primaryButtonHref = "/packages",
  secondaryButtonLabel = "Contact an Expert",
  secondaryButtonHref = "/contact",
  trustIndicators = TRUST_INDICATORS,
  showTrustRow = true,
  onPrimaryClick,
  onSecondaryClick,
}: CTASectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-black py-[clamp(3rem,12vh,6rem)]">
      {/* Background image */}
      <Image
        src={CTA_IMAGE.src}
        alt={CTA_IMAGE.alt}
        fill
        className="absolute inset-0 object-cover"
        sizes="100vw"
        priority={false}
      />

      {/* Gradient overlay */}
      <GradientOverlay />

      {/* Animated background zoom effect */}
      <div className="animate-zoom-slow absolute inset-0" />

      {/* Content container */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Main content - entrance animation */}
        <div className="hero-enter flex flex-col items-center gap-6 text-center sm:gap-8">
          {/* Heading */}
          <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-white">
            {heading}
          </h2>

          {/* Description */}
          <p className="max-w-[55ch] text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button
              size="lg"
              className="group/primary h-auto px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base"
              asChild
              onClick={onPrimaryClick}
            >
              <Link href={primaryButtonHref}>
                {primaryButtonLabel}
                <ArrowRight className="size-4 transition-transform group-hover/primary:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group/secondary h-auto border-white/30 px-6 py-2.5 text-sm text-white hover:border-white/50 hover:bg-white/10 sm:px-8 sm:py-3 sm:text-base"
              asChild
              onClick={onSecondaryClick}
            >
              <Link href={secondaryButtonHref}>
                {secondaryButtonLabel}
                <MessageSquare className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Trust Row */}
          {showTrustRow && trustIndicators.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
              {trustIndicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="flex items-center justify-center rounded-full bg-primary/20 p-2">
                    <div className="text-primary">{indicator.icon}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      {indicator.value}
                    </div>
                    <div className="text-xs text-white/70">
                      {indicator.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

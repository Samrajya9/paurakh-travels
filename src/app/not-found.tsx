import Link from "next/link"
import { Compass } from "lucide-react"

import { cn } from "@/lib/utils"

function Nail({ top }: { top: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 z-30 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_1px_1px_rgba(0,0,0,0.45)]"
      )}
      style={{ top }}
    />
  )
}

function SignPlank({
  href,
  label,
  distance,
  rotate,
  direction = "right",
  emphasize = false,
}: {
  href: string
  label: string
  distance: string
  rotate: string
  direction?: "left" | "right"
  emphasize?: boolean
}) {
  return (
    <Link
      href={href}
      style={{ transform: `rotate(${rotate})` }}
      className={cn(
        "group/plank relative z-10 flex h-11 items-center justify-center px-6 text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5",
        direction === "left" ? "self-start" : "self-end",
        emphasize
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 h-full w-5",
          direction === "right" ? "-right-[9px]" : "-left-[9px] scale-x-[-1]",
          emphasize ? "bg-primary" : "bg-secondary"
        )}
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
      />
      <span className="flex items-baseline gap-2 whitespace-nowrap">
        {label}
        <span className="text-xs opacity-70">{distance}</span>
      </span>
    </Link>
  )
}

function BrokenPlank({ rotate }: { rotate: string }) {
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className="relative z-10 flex h-11 w-fit items-center justify-center self-start border border-dashed border-muted-foreground/40 bg-muted px-6 text-sm font-medium text-muted-foreground"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 -right-[9px] h-full w-5 border-y border-r border-dashed border-muted-foreground/40 bg-muted"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
      />
      <span className="whitespace-nowrap">This page — ??? km</span>
    </div>
  )
}

// Row heights (h-11 = 44px) + gap-5 (20px) between them, used to place
// nails directly on the pole at each plank's vertical center.
const ROW_HEIGHT = 44
const ROW_GAP = 20
const rowCenter = (index: number) =>
  index * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2

function Signpost() {
  return (
    <div aria-hidden="true" className="relative flex flex-col items-center">
      {/* one continuous pole, running behind every sign */}
      <div className="absolute top-[-2rem] bottom-[-3rem] left-1/2 z-0 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/60" />
      {/* finial cap */}
      <div className="absolute top-[-2.4rem] left-1/2 z-0 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground/80" />

      <div className="relative z-10 flex w-56 flex-col gap-5 sm:w-64">
        <SignPlank
          href="/"
          label="Home page"
          distance="0.0 km"
          rotate="-2deg"
          direction="left"
          emphasize
        />
        <BrokenPlank rotate="-9deg" />
        <SignPlank
          href="/packages"
          label="Packages page"
          distance="12 km"
          rotate="3deg"
          direction="right"
        />

        {/* nails, anchored to the pole itself rather than each plank */}
        <Nail top={`${rowCenter(0)}px`} />
        <Nail top={`${rowCenter(1) - 6}px`} />
        <Nail top={`${rowCenter(2)}px`} />
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-24">
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 text-center">
        <Compass
          aria-hidden="true"
          className="h-8 w-8 text-primary animation-duration-[14s] motion-safe:animate-spin motion-reduce:animate-none"
        />

        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-foreground">404</span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-muted-foreground/50"
            />
            Not found
          </span>
          <h1 className="max-w-[18ch] font-heading text-[clamp(1.9rem,5vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground">
            You&apos;ve wandered off the marked route.
          </h1>
          <p className="max-w-[38ch] text-base leading-relaxed text-pretty text-muted-foreground">
            This path isn&apos;t on any of our maps. It may have been rerouted
            or never existed. The signpost knows the way back.
          </p>
        </div>

        <Signpost />
      </div>
    </section>
  )
}

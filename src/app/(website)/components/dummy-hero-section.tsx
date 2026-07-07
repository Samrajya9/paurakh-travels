import { cn } from "@/lib/utils"
import Image from "next/image"

function ArcShape() {
  return (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 690"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0,700 L 0,0 C 235.5,111 471,222 711,222 C 951,222 1195.5,111 1440,0 L 1440,700 L 0,700 Z"
        stroke="none"
        strokeWidth="0"
        fill="#ff0080"
        fillOpacity="1"
      ></path>
    </svg>
  )
}
const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
  alt: "Snow-capped Himalayan peaks rising above a sea of clouds at sunrise",
} as const

export default function DummyHeroSection() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#0a0908]"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[0%_60%]"
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[70%]",
            "bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_25%,color-mix(in_oklab,var(--background)_85%,transparent)_50%,color-mix(in_oklab,var(--background)_40%,transparent)_75%,transparent_100%)]"
          )}
        />

        {/* <div className="absolute inset-x-0 bottom-0 h-[70%]">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 700"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hero-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--background)"
                  stopOpacity="0.15"
                />
                <stop
                  offset="25%"
                  stopColor="var(--background)"
                  stopOpacity="0.22"
                />
                <stop
                  offset="50%"
                  stopColor="var(--background)"
                  stopOpacity="0.45"
                />
                <stop
                  offset="75%"
                  stopColor="var(--background)"
                  stopOpacity="0.78"
                />
                <stop
                  offset="100%"
                  stopColor="var(--background)"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,700 L0,0 C240,70 480,140 720,140 C960,140 1200,70 1440,0 L1440,700 Z"
              fill="url(#hero-gradient)"
            />
          </svg>
        </div> */}
      </section>
    </>
  )
}

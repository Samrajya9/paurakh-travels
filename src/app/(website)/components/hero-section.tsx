// import Image from "next/image"

// import { HeroSearch } from "./hero-search"
// import { cn } from "@/lib/utils"

// const HERO_IMAGE = {
//   src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
//   alt: "Snow-capped Himalayan peaks rising above a sea of clouds at sunrise",
// } as const

// function HeroCurveGradient() {
//   return (
//     <div
//       className={cn(
//         "absolute inset-x-0 bottom-0 h-[60dvh]",
//         "bg-[linear-gradient(to_top,white_0%,white_25%,rgba(255,255,255,0.85)_50%,rgba(255,255,255,0.4)_75%,transparent_100%)]"
//       )}
//     />
//   )
// }

// export default function HeroSection() {
//   return (
//     <section
//       aria-labelledby="hero-heading"
//       className="relative isolate flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#0a0908]"
//     >
//       <Image
//         src={HERO_IMAGE.src}
//         alt={HERO_IMAGE.alt}
//         fill
//         priority
//         sizes="100vw"
//         className="object-cover object-[center_35%]"
//       />

//       <HeroCurveGradient />

//       <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pt-24 pb-[clamp(2.75rem,9vh,5.5rem)] text-center sm:px-6">
//         <div className="hero-enter flex w-full flex-col items-center gap-5 sm:gap-6">
//           <h1
//             id="hero-heading"
//             className="max-w-[18ch] font-heading text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white"
//           >
//             Walk where the mountains begin
//           </h1>
//           <p className="max-w-[42ch] text-base leading-relaxed text-pretty text-white/88 sm:text-lg">
//             Guided treks, cultural routes, and custom journeys across Nepal —
//             led by local experts who know every pass.
//           </p>
//           <HeroSearch className="mt-2 w-full sm:mt-3" />
//         </div>
//       </div>
//     </section>
//   )
// }

import Image from "next/image"

import { HeroSearch } from "./hero-search"
import { cn } from "@/lib/utils"

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
  alt: "Snow-capped Himalayan peaks rising above a sea of clouds at sunrise",
} as const

function HeroCurveGradient() {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 h-[36dvh]",
        "bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_25%,color-mix(in_oklab,var(--background)_85%,transparent)_50%,color-mix(in_oklab,var(--background)_40%,transparent)_75%,transparent_100%)]"
      )}
    />
  )
}

export default function HeroSection() {
  return (
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
        // className="object-cover object-[center_35%]"
        className="object-cover object-bottom"
      />

      <HeroCurveGradient />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pt-24 pb-[clamp(2.75rem,9vh,5.5rem)] text-center sm:px-6">
        <div className="hero-enter flex w-full flex-col items-center gap-5 sm:gap-6">
          <h1
            id="hero-heading"
            className="text-foregrounddd max-w-[18ch] font-heading text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
          >
            Walk where the mountains begin
          </h1>
          <p className="max-w-[42ch] text-base leading-relaxed text-pretty text-foreground/88 sm:text-lg">
            Guided treks, cultural routes, and custom journeys across Nepal —
            led by local experts who know every pass.
          </p>
          <HeroSearch className="mt-2 w-full sm:mt-3" />
        </div>
      </div>
    </section>
  )
}

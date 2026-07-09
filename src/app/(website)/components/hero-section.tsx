"use client"

import { Button } from "@/components/ui/button"
import RotatingText from "@/components/ui/rotating-text"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
export default function HeroSection() {
  return (
    <>
      <Section
        aria-labelledby="hero-heading"
        width={"constrained"}
        // className="isolate"
      >
        <HeroHeader className="mb-8 sm:mb-14" />
        <HeroImage />
      </Section>
    </>
  )
}

function HeroHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-y-4 sm:flex-row sm:items-stretch sm:justify-between sm:gap-x-2",
        className
      )}
      {...props}
    >
      <HeroHeading className="w-full sm:max-w-4xl sm:flex-2" />
      <HeroSummary className="w-full sm:max-w-2xl sm:flex-1 sm:pt-1" />
    </div>
  )
}

function HeroHeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn(className)} {...props}>
      <h1
        id="hero-heading"
        className="font-playfair text-4xl leading-[1.1] font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-7xl"
      >
        Discover the Art and Architecture of Nepal
      </h1>
    </div>
  )
}

function HeroSummary({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col items-start justify-between", className)}
      {...props}
    >
      <p className="font-hanken-grotesk text-base leading-normal sm:text-base md:text-lg lg:text-lg">
        Embark on a journey through the timeless artistry and sacred heritage of
        the region, where every landmark and tradition tells a story waiting to
        be discovered in{" "}
        <RotatingText
          text={["Everest.", "Annapurna.", "Langtang.", "Mustang."]}
          duration={2500}
        />
      </p>
      <Button variant={"link"} asChild className="px-0">
        <Link href={"/packages"}>
          <span>VIEW EXPEDITIONS</span>
          <ArrowRight className="-translate-y-px" />
        </Link>
      </Button>
    </div>
  )
}

// function HeroImage() {
//   return (
//     <div className="relative h-48 w-full overflow-clip rounded-md sm:h-72 md:h-96 lg:h-200">
//       <Image src={"/images/screen.png"} fill alt="mountain-bg" priority />
//     </div>
//   )
// }

const HERO_IMAGES = [
  { src: "/images/screen-1.png", alt: "Himalayan mountain range at sunrise" },
  { src: "/images/screen-2.png", alt: "Everest Base Camp trail" },
]
export function HeroImage() {
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }))

  return (
    <div className="relative h-48 w-full overflow-clip rounded-md sm:h-72 md:h-96 lg:h-200">
      <Carousel
        orientation="vertical"
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="h-full [&>div]:h-full"
      >
        <CarouselContent className="mt-0 h-full">
          {HERO_IMAGES.map((image) => (
            <CarouselItem
              key={image.src}
              className="relative h-full basis-full pt-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSectionV2() {
  return (
    <>
      <Section
        aria-labelledby="hero-heading"
        width={"constrained"}
        className="isolate"
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
      <p className="font-hanken-grotesk text-base leading-normal sm:text-base md:text-lg lg:text-2xl">
        Explore the timeless artistry and sacred architecture of the Kathmandu
        Valley, where every stupa and prayer flag tells a story.
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

function HeroImage() {
  return (
    <div className="relative h-48 w-full overflow-clip rounded-md sm:h-72 md:h-96 lg:h-200">
      <Image src={"/images/screen.png"} fill alt="mountain-bg" priority />
    </div>
  )
}

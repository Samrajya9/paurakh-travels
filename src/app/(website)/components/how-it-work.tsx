"use client"

import { Section, SectionContent } from "@/components/ui/section"
import {
  MapPin,
  Ticket,
  CreditCard,
  Compass,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"

type Step = {
  title: string
  description: string
  icon: LucideIcon
}

const howItWorkContents: Step[] = [
  {
    title: "Find your destination",
    description:
      "Choose a region and discover your dream destination, where adventure and serenity await.",
    icon: MapPin,
  },
  {
    title: "Book a ticket",
    description:
      "Seamless expedition registration. Secure your spot in our limited-availability treks with a simple application.",
    icon: Ticket,
  },
  {
    title: "Make payment",
    description:
      "Secure, transparent transactions. We offer multiple global payment methods for your convenience.",
    icon: CreditCard,
  },
  {
    title: "Explore destination",
    description:
      "Embark on your guided journey. Meet your elite crew and begin the transformation under the Himalayan sky.",
    icon: Compass,
  },
]

export default function HowItWork() {
  return (
    <>
      <Section className="bg-muted" size={"xl"}>
        <SectionContent
          constrained
          className="flex flex-col items-center justify-between gap-x-28 gap-y-14 lg:flex-row lg:gap-y-6"
        >
          {/* Left */}
          <div className="relative min-h-80 w-full flex-1 overflow-clip rounded-lg sm:min-h-100 lg:min-h-180">
            <Image
              src={"/images/how-it-work-image.jpg"}
              fill
              alt="Image of a Mountain"
              className="object-cover"
            />
          </div>
          {/* RIGHT */}

          <div className="w-full flex-1">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground">
              HOW IT WORKS
            </p>
            <h2 className="font-playfair text-3xl leading-[1.15] font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
              One Click for you
            </h2>
            <div className="mt-6 space-y-8">
              {howItWorkContents.map((step) => (
                <StepComponent key={step.title} {...step} />
              ))}
            </div>
          </div>
        </SectionContent>
      </Section>
    </>
  )
}

function StepComponent({ title, description, icon: Icon }: Step) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg border p-3 hover:bg-foreground hover:text-background sm:p-4">
        <Icon className="size-5 sm:size-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

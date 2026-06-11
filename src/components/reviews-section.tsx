"use client"

import * as React from "react"
import AutoScroll from "embla-carousel-auto-scroll"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Section } from "@/components/ui/section"

// ── data ────────────────────────────────────────────────────────────────────

interface Review {
  name: string
  role: string
  initials: string
  color: string
  body: string
  rating: number
  trip: string
}

const ROW_ONE: Review[] = [
  {
    name: "Sarah Linden",
    role: "Travel Photographer",
    initials: "SL",
    color: "bg-sky-700",
    body: "The Annapurna Circuit trek was flawlessly organised. Every teahouse, every guide, every sunrise — exactly as promised. I've never felt so taken care of in the mountains.",
    rating: 5,
    trip: "Annapurna Circuit · 14 days",
  },
  {
    name: "Marcus Webb",
    role: "Software Engineer",
    initials: "MW",
    color: "bg-emerald-700",
    body: "First time trekking at altitude and I was genuinely nervous. The team briefed us every morning, checked on us at every camp, and made the whole thing feel completely safe.",
    rating: 5,
    trip: "Everest Base Camp · 12 days",
  },
  {
    name: "Priya Nair",
    role: "Yoga Instructor",
    initials: "PN",
    color: "bg-violet-700",
    body: "Langtang was magical — quiet, spiritual, and raw in the best possible way. The local guide shared stories you won't find in any guidebook. Absolutely transformative.",
    rating: 5,
    trip: "Langtang Valley · 9 days",
  },
  {
    name: "Daniel Osei",
    role: "Documentary Filmmaker",
    initials: "DO",
    color: "bg-amber-700",
    body: "I've shot in 40 countries. Nepal with Paurakh Travels gave me footage — and memories — that rival all of them. The Mustang route was otherworldly.",
    rating: 5,
    trip: "Upper Mustang · 10 days",
  },
  {
    name: "Clara Hoffmann",
    role: "Medical Doctor",
    initials: "CH",
    color: "bg-rose-700",
    body: "As a physician I pay close attention to altitude acclimatisation protocols. The team handled every detail correctly, and the itinerary was clearly built with safety first.",
    rating: 5,
    trip: "Everest Base Camp · 14 days",
  },
  {
    name: "James Whitfield",
    role: "Architect",
    initials: "JW",
    color: "bg-teal-700",
    body: "I've done guided tours on four continents — the attention to detail here rivals the best of them. The porter crew were extraordinary people I'll never forget.",
    rating: 5,
    trip: "Manaslu Circuit · 11 days",
  },
]

const ROW_TWO: Review[] = [
  {
    name: "Aiko Tanaka",
    role: "Product Designer",
    initials: "AT",
    color: "bg-indigo-700",
    body: "The cultural immersion aspect was what set this apart. We shared meals with local families, visited a gompa at dawn, and walked through rice terraces that don't appear on any map.",
    rating: 5,
    trip: "Ghorepani Poon Hill · 5 days",
  },
  {
    name: "Luca Ferreira",
    role: "Entrepreneur",
    initials: "LF",
    color: "bg-orange-700",
    body: "Booked a custom itinerary with just three weeks' notice. The team put together something better than I could have planned in three months. Exceptional responsiveness.",
    rating: 5,
    trip: "Custom Kathmandu + Pokhara · 8 days",
  },
  {
    name: "Fatima Al-Rashid",
    role: "University Lecturer",
    initials: "FA",
    color: "bg-cyan-700",
    body: "I travelled solo as a woman and felt completely safe and respected throughout. The guide was professional, thoughtful and genuinely passionate about Nepal's history.",
    rating: 5,
    trip: "Annapurna Base Camp · 7 days",
  },
  {
    name: "Tom Radcliffe",
    role: "Retired Army Officer",
    initials: "TR",
    color: "bg-lime-700",
    body: "I've been trekking since the eighties. The quality of the logistics here is on par with military planning — except with better food and better views.",
    rating: 5,
    trip: "Three Passes Trek · 17 days",
  },
  {
    name: "Nina Johansson",
    role: "Journalist",
    initials: "NJ",
    color: "bg-pink-700",
    body: "Every single thing was taken care of before I even thought to ask. The driver, the permits, the porter weights, the hot water in the morning. Seamless from start to finish.",
    rating: 5,
    trip: "Kanchenjunga · 20 days",
  },
  {
    name: "Omar Khalil",
    role: "Finance Manager",
    initials: "OK",
    color: "bg-fuchsia-700",
    body: "Brought my teenage son on his first big adventure. The guides were fantastic with him — patient, encouraging, and funny. He's already asking when we can go back.",
    rating: 5,
    trip: "Langtang + Helambu · 10 days",
  },
]

// ── sub-components ───────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating ? "fill-primary text-primary" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <StarRow rating={review.rating} />
        <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {review.trip}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{review.body}&rdquo;
      </p>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${review.color}`}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{review.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── main component ───────────────────────────────────────────────────────────

export function ReviewsSection() {
  const autoScrollForward = React.useRef(
    AutoScroll({
      speed: 1,
      startDelay: 0,
      direction: "forward",
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    })
  )

  const autoScrollBackward = React.useRef(
    AutoScroll({
      speed: 1,
      startDelay: 0,
      direction: "backward",
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    })
  )

  return (
    <Section width="fullWidth" className="overflow-hidden py-20">
      {/* header */}
      <div className="mx-auto mb-14 max-w-2xl px-6 text-center lg:px-10">
        <p className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
          Trusted by trekkers
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The Paurakh Experience,
          <br />
          in their words
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Over 1,200 guided journeys. Here&apos;s what our trekkers say.
        </p>
      </div>

      {/* row 1 — scrolls forward (left → right visually) */}
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[autoScrollForward.current]}
        className="w-full"
      >
        <CarouselContent className="mb-4 -ml-4">
          {ROW_ONE.map((review) => (
            <CarouselItem
              key={review.name}
              className="basis-[85%] pl-4 sm:basis-[45%] lg:basis-[32%] xl:basis-[28%]"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* row 2 — scrolls backward (right → left visually) */}
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[autoScrollBackward.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {ROW_TWO.map((review) => (
            <CarouselItem
              key={review.name}
              className="basis-[85%] pl-4 sm:basis-[45%] lg:basis-[32%] xl:basis-[28%]"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* footer cta */}
      <div className="mt-12 flex justify-center px-6">
        <a
          href="/reviews"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
        >
          See all 200+ reviews
          <Star className="size-3.5 fill-primary text-primary" />
        </a>
      </div>
    </Section>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { H1, H2, H3 } from "@/components/ui/heading"
import { P } from "@/components/ui/paragraph"
import { Button } from "@/components/ui/button"
import { EmailInput } from "@/components/inputs/email-input"

export const metadata: Metadata = {
  title: "About Us | Paurakh Travels",
  description:
    "Meet the team behind Paurakh Travels and learn what drives us to guide travelers safely through the Himalaya.",
}

export default function AboutPage() {
  return (
    <>
      {/* ── Bento grid: 3 cols x 2 rows, first cell spans 2x2 ────────── */}
      <Section size="lg" className="space-y-10">
        <SectionHeader constrained className="space-y-3">
          <H1>Rooted in the Himalaya, Built on Trust</H1>
        </SectionHeader>

        <SectionContent constrained>
          <div className="grid grid-cols-1 gap-4 sm:h-[640px] sm:grid-cols-3 sm:grid-rows-2">
            {/* Large Feature */}
            <div className="relative h-72 overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2 sm:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80"
                alt="Prayer flags with Himalayan peaks in the background"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 text-foreground">
                <H3 className="text-white">15+ Years on the Trail</H3>
                <P variant="sm" className="text-white/80">
                  Since 2009, we&apos;ve guided travelers through every major
                  region of Nepal — from the Khumbu to Upper Mustang.
                </P>
              </div>
            </div>

            {/* Card 1 */}
            <div className="relative h-40 overflow-hidden rounded-lg sm:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                alt="Mountain landscape"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 text-foreground">
                <span className="font-playfair text-4xl font-bold text-white">
                  6,000+
                </span>

                <P variant="sm" className="text-white/80">
                  Travelers guided safely to their destination
                </P>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-40 overflow-hidden rounded-lg sm:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
                alt="Trekkers in the Himalayas"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 text-foreground">
                <span className="font-playfair text-4xl font-bold text-white">
                  98%
                </span>

                <P variant="sm" className="text-white/80">
                  Of guests say they&apos;d trek with us again
                </P>
              </div>
            </div>
          </div>
        </SectionContent>
      </Section>

      {/* ── Intro + paired text/image sections ─────────────────────── */}
      <Section size="lg" className="space-y-20">
        <SectionContent constrained className="space-y-20">
          {/* Row 1 — text left, image right */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <H2>Who We Are</H2>
              <P variant="md">
                Paurakh Travels was founded by a small group of Kathmandu-based
                guides who believed trekking in Nepal could be both adventurous
                and deeply respectful of the mountains, the villages, and the
                people who call them home. &quot;Paurakh&quot; means strength
                and vigor in Nepali — the same qualities we ask of every
                traveler who joins us on the trail, and the same qualities we
                bring to planning your journey.
              </P>
              <P variant="md">
                What started as a handful of guided treks around the Khumbu has
                grown into a full range of Himalayan expeditions, cultural
                tours, and peak climbs — but our approach hasn&apos;t changed.
                Every itinerary is built by people who have walked the trail
                themselves, not assembled from a brochure.
              </P>
            </div>
            <div className="relative h-80 w-full overflow-clip rounded-lg lg:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                alt="Trekkers walking toward the Everest region"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2 — image left, text right */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 h-80 w-full overflow-clip rounded-lg lg:order-1 lg:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80"
                alt="Local guide smiling on the trail"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <H2>What Drives Us</H2>
              <P variant="md">
                Every guide on our team is locally trained, wilderness first-aid
                certified, and paid fairly year-round — not just during peak
                trekking season. We work directly with village lodges and
                family-run teahouses along every route, so your trip supports
                the same communities you&apos;re walking through.
              </P>
              <P variant="md">
                Safety comes first: every itinerary builds in proper
                acclimatization days, every group carries emergency
                communication equipment above 4,000m, and every guide is trained
                to make the call to turn back when the mountain says no — no
                matter how close the summit looks.
              </P>
            </div>
          </div>
        </SectionContent>
      </Section>

      {/* ── Newsletter signup ─────────────────────────────────────────── */}
      <Section size="lg">
        <SectionContent constrained>
          <div className="mx-auto max-w-4xl space-y-4 rounded-lg p-10 text-center">
            <H2 className="text-2xl sm:text-3xl">Sign up for our newsletter</H2>
            <P variant="sm" className="text-muted-foreground">
              Be the first to know about new expeditions, seasonal offers, and
              trail dispatches.
            </P>
            <div className="flex flex-col gap-2 sm:flex-row">
              <EmailInput placeholder="Enter your email" className="h-10" />
              <Button className="h-10 shrink-0">Subscribe</Button>
            </div>
            <P variant="xs" className="text-muted-foreground">
              We care about your data in our{" "}
              <Link href="/privacy-policy" className="underline">
                privacy policy
              </Link>
              .
            </P>
          </div>
        </SectionContent>
      </Section>
    </>
  )
}

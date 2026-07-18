import type { Metadata } from "next"
import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { cn } from "@/lib/utils"
import { P, paragraphVariants } from "@/components/ui/paragraph"
import { H1, H2 } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions | Paurakh Travels",
  description:
    "The terms that apply when you book a trekking or travel package with Paurakh Travels.",
}

// TODO: replace with real values from CompanyProfile / CONTACTS once available
const LAST_UPDATED = "July 18, 2026"
const COMPANY_NAME = "Paurakh Travels"
const COMPANY_ADDRESS = "Kathmandu, Nepal"
const CONTACT_EMAIL = "info@trekkingtopnepal.com"

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Agreement to these terms",
    body: (
      <P variant="md">
        These Terms & Conditions govern any booking or inquiry you make with{" "}
        <strong>{COMPANY_NAME}</strong> ({COMPANY_ADDRESS}, &quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) through this website. By submitting
        a booking request, you agree to these terms. Our{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>{" "}
        explains separately how we handle your personal information.
      </P>
    ),
  },
  {
    title: "2. Booking and confirmation",
    body: (
      <P variant="md">
        A booking request submitted through this website is not final until we
        confirm it by email. Once confirmed, your trip is reserved. We currently
        do not process online payments — payment is made in cash directly with
        our team once you arrive in Nepal, before your trek or tour begins.
      </P>
    ),
  },
  {
    title: "3. Cancellations and changes",
    body: (
      <>
        <P variant="md">
          Plans change, and we try to keep this policy fair to both sides:
        </P>
        <ul
          className={cn(
            paragraphVariants({ variant: "md" }),
            "list-disc space-y-2 pl-6"
          )}
        >
          <li>
            Cancellations made more than 15 days before departure: no
            cancellation fee.
          </li>
          <li>
            Cancellations made 7–15 days before departure: a partial fee may
            apply to cover non-refundable permits or reservations already
            arranged on your behalf.
          </li>
          <li>
            Cancellations made less than 7 days before departure, or no-shows:
            the full cost of any permits, guides, or accommodation already
            booked for your trip may be forfeited.
          </li>
          <li>
            Since payment is made on arrival, &quot;fees&quot; above refer to
            costs we may need to invoice you for separately, not a refund of
            money already paid.
          </li>
        </ul>
        <P variant="md">
          We&apos;ll always try to reschedule rather than cancel outright where
          that&apos;s possible.
        </P>
      </>
    ),
  },
  {
    title: "4. Permits, passports, and travel insurance",
    body: (
      <P variant="md">
        Some restricted-area treks (for example, in the Everest, Manaslu,
        Mustang, or Langtang regions) legally require a trekking permit or TIMS
        card, which requires a copy of your passport. For these packages, you
        must provide accurate passport details and proof of valid travel
        insurance before departure — we cannot arrange the required permits
        without them, and we are not responsible for delays or denied entry
        caused by inaccurate or missing documentation.
      </P>
    ),
  },
  {
    title: "5. Health, fitness, and assumption of risk",
    body: (
      <>
        <P variant="md">
          Trekking and mountain travel in Nepal involves inherent risks —
          altitude, remote terrain, weather, and physical exertion among them.
          By booking a package, you confirm that:
        </P>
        <ul
          className={cn(
            paragraphVariants({ variant: "md" }),
            "list-disc space-y-2 pl-6"
          )}
        >
          <li>
            You are in good health and reasonably fit for the difficulty level
            of the package you&apos;ve chosen.
          </li>
          <li>
            You understand and accept the risks of high-altitude trekking,
            including altitude sickness, and will inform your guide immediately
            of any symptoms.
          </li>
          <li>
            You hold valid travel insurance covering trekking at altitude and,
            where relevant, emergency evacuation.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Force majeure",
    body: (
      <P variant="md">
        Weather, landslides, road conditions, flight delays, and natural events
        (including earthquakes) can affect any itinerary in the Himalaya. We are
        not liable for delays, route changes, or cancellations caused by events
        outside our reasonable control, and we&apos;ll work with you to adjust
        the itinerary or reschedule where possible.
      </P>
    ),
  },
  {
    title: "7. Your account and conduct on this site",
    body: (
      <P variant="md">
        If you create an account to save liked packages or manage bookings,
        you&apos;re responsible for keeping your login details secure. Please
        don&apos;t use this site to submit false booking information, attempt to
        access other users&apos; accounts, or interfere with the normal
        operation of the website.
      </P>
    ),
  },
  {
    title: "8. Intellectual property",
    body: (
      <P variant="md">
        The text, photographs, itineraries, and design of this website belong to{" "}
        {COMPANY_NAME} unless otherwise credited. You&apos;re welcome to share
        links to our pages, but please don&apos;t reproduce our itineraries,
        descriptions, or images elsewhere without asking us first.
      </P>
    ),
  },
  {
    title: "9. Limitation of liability",
    body: (
      <P variant="md">
        To the extent permitted by law, {COMPANY_NAME} is not liable for
        indirect or consequential losses arising from your booking, including
        missed connections, lost belongings, or trip interruptions caused by
        third parties, weather, or events outside our control. Nothing in these
        terms limits liability that cannot be excluded under applicable law.
      </P>
    ),
  },
  {
    title: "10. Governing law",
    body: (
      <P variant="md">
        These terms are governed by the laws of Nepal. Any dispute arising from
        a booking made through this website will be handled under Nepali law.
      </P>
    ),
  },
  {
    title: "11. Changes to these terms",
    body: (
      <P variant="md">
        We may update these terms from time to time — for example, if we
        introduce online payments. We&apos;ll update the &quot;last
        updated&quot; date above whenever we do, and the terms in effect at the
        time of your booking confirmation are the ones that apply to your trip.
      </P>
    ),
  },
  {
    title: "12. Contact us",
    body: (
      <P variant="md">
        Questions about these terms? Reach us at{" "}
        <Button variant={"link"} size={"lg"} asChild className="px-0">
          <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
        </Button>
        .
      </P>
    ),
  },
]

export default function TermsPage() {
  return (
    <Section size="lg" className="space-y-10">
      <SectionHeader constrained className="max-w-4xl space-y-3 text-center">
        <P
          variant="sm"
          className="font-semibold tracking-widest text-muted-foreground uppercase"
        >
          Legal
        </P>
        <H1 className="text-4xl lg:text-5xl">Terms &amp; Conditions</H1>
        <P variant="sm" className="text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </P>
      </SectionHeader>

      <SectionContent constrained className="max-w-4xl space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <H2 className="text-xl sm:text-2xl">{section.title}</H2>
            {section.body}
          </div>
        ))}
      </SectionContent>
    </Section>
  )
}

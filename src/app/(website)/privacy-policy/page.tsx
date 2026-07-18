import type { Metadata } from "next"
import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { H1, H2 } from "@/components/ui/heading"
import { P } from "@/components/ui/paragraph"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Paurakh Travels",
  description:
    "How Paurakh Travels collects, uses, and protects your information when you browse or book a trekking package with us.",
}

// TODO: replace with real values from CompanyProfile / CONTACTS once available
const LAST_UPDATED = "July 18, 2026"
const COMPANY_NAME = "Paurakh Travels"
const COMPANY_ADDRESS = "Kathmandu, Nepal"
const CONTACT_EMAIL = "privacy@trekkingtopnepal.com"

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Who we are",
    body: (
      <>
        <P>
          This Privacy Policy explains how{" "}
          <strong className="text-primary">{COMPANY_NAME}</strong> (
          {COMPANY_ADDRESS}, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          collects, uses, and protects information when you browse this website
          or book a trekking or travel package with us. By using this site, you
          agree to the practices described below.
        </P>
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        <P>We collect a few different kinds of information: </P>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Account information.</strong> If you create an account, we
            store your email address and a securely hashed password. We never
            store your password in plain text.
          </li>
          <li>
            <strong>Booking and contact information.</strong> When you inquire
            about or book a package, we collect the details needed to confirm
            your trip — name, email, and any message you send us through a
            booking or contact form.
          </li>
          <li>
            <strong>Newsletter sign-up.</strong> If you subscribe to trip
            updates from our footer, we store the email address you provide for
            that purpose only.
          </li>
          <li>
            <strong>Liked packages.</strong> If you&apos;re signed in and use
            the heart/like feature on a package, we store which packages
            you&apos;ve liked against your account.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Sensitive information for certain packages",
    body: (
      <>
        <P>
          Some restricted-area treks in Nepal (for example, in the Everest,
          Manaslu, Mustang, or Langtang regions) legally require a valid
          trekking permit or TIMS card, which in turn requires a copy of your
          passport and proof of travel insurance. We do not currently collect
          this information through the website, but for packages where it
          becomes a legal requirement, we may request your passport or
          identification details and travel insurance documentation directly
          from you before departure. This information is used solely to arrange
          the required permits and is never used for any other purpose.
        </P>
      </>
    ),
  },
  {
    title: "4. How bookings and payment work",
    body: (
      <>
        <P>
          We do not process online payments or store any card or banking details
          on this website. When you request a booking, we confirm availability
          and send you a confirmation email — payment is made in cash directly
          with our team once you arrive in Nepal. If we introduce online payment
          options in the future, this policy will be updated to describe how
          that payment information is handled.
        </P>
      </>
    ),
  },
  {
    title: "5. Cookies and analytics",
    body: (
      <>
        <P>
          We use essential cookies to keep you signed in and to remember your
          session. We may also use privacy-conscious analytics tools, such as
          PostHog, to understand how visitors use our site — for example, which
          pages and packages are most viewed — so we can improve the experience.
          These tools do not collect your precise location or any payment
          information. We do not use advertising cookies, retargeting pixels, or
          any third-party ad-tracking tools; our marketing is entirely organic.
        </P>
      </>
    ),
  },
  {
    title: "6. How we use your information",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>To respond to inquiries and confirm bookings</li>
        <li>To send booking confirmations and trip-related updates</li>
        <li>
          To send newsletter emails, only if you&apos;ve subscribed, and you can
          unsubscribe at any time
        </li>
        <li>To arrange legally required permits for restricted-area treks</li>
        <li>To understand site usage and improve the website over time</li>
      </ul>
    ),
  },
  {
    title: "7. Who we share information with",
    body: (
      <>
        <P>
          We do not sell your information to anyone. We share information only
          with the service providers that help us run this website and our
          treks, including:
        </P>
        <ul className="list-disc space-y-2 pl-6">
          <li>Cloudflare, for secure storage of images and media</li>
          <li>PostHog, if enabled, for anonymized website analytics</li>
          <li>
            Local trekking permit authorities in Nepal, only when passport or
            insurance details are required for a specific package
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Data retention",
    body: (
      <>
        <P>
          We keep account and booking information for as long as your account is
          active or as needed to provide our services. Passport, identification,
          and travel insurance details collected for permit purposes are kept
          only as long as required for that trip and any related legal
          record-keeping, then deleted.
        </P>
      </>
    ),
  },
  {
    title: "9. Your rights",
    body: (
      <>
        <P>
          You can ask us to access, correct, or delete the personal information
          we hold about you at any time by contacting us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          . You can also unsubscribe from newsletter emails using the link in
          any newsletter, or by deleting your account.
        </P>
      </>
    ),
  },
  {
    title: "10. Children's privacy",
    body: (
      <>
        <P>
          Our family-friendly tours are designed to be booked by a parent or
          guardian on behalf of their family. This website is not directed at
          children, and we do not knowingly collect personal information
          directly from anyone under 18 without a parent or guardian&apos;s
          involvement in the booking.
        </P>
      </>
    ),
  },
  {
    title: "11. Changes to this policy",
    body: (
      <>
        <P>
          We may update this Privacy Policy from time to time — for example, if
          we introduce online payments or new analytics tools. We&apos;ll update
          the &quot;last updated&quot; date at the top of this page whenever we
          do.
        </P>
      </>
    ),
  },
  {
    title: "12. Contact us",
    body: (
      <>
        <P>
          If you have any questions about this policy or how your information is
          handled, reach out to us at{" "}
          <Button variant={"link"} size="lg" asChild className="px-0">
            <Link href={`mailto:${CONTACT_EMAIL}`} className="">
              {CONTACT_EMAIL}{" "}
            </Link>
          </Button>
          .
        </P>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Section size="lg" className="space-y-10">
      <SectionHeader constrained className="max-w-4xl space-y-3">
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Legal
        </p>
        <H1>Privacy Policy</H1>
        <p className="text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </SectionHeader>

      <SectionContent
        constrained
        className="max-w-4xl space-y-10 text-sm leading-relaxed text-foreground sm:text-base"
      >
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <H2>{section.title}</H2>
            {section.body}{" "}
          </div>
        ))}
      </SectionContent>
    </Section>
  )
}

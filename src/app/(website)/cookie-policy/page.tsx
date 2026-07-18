import type { Metadata } from "next"
import { Section, SectionContent, SectionHeader } from "@/components/ui/section"
import { H1, H2 } from "@/components/ui/heading"
import { P, paragraphVariants } from "@/components/ui/paragraph"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | Paurakh Travels",
  description:
    "How Paurakh Travels uses cookies and similar technologies on this website.",
}

// TODO: replace with real values from CompanyProfile / CONTACTS once available
const LAST_UPDATED = "July 18, 2026"
const CONTACT_EMAIL = "privacy@trekkingtopnepal.com"

const listClassName = cn(
  paragraphVariants({ variant: "md" }),
  "list-disc space-y-2 pl-6"
)

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. What are cookies?",
    body: (
      <P variant="md">
        Cookies are small text files stored on your device when you visit a
        website. They help the site remember who you are between page loads and,
        in some cases, help us understand how the site is used. This page
        explains which cookies we use on this website and why.
      </P>
    ),
  },
  {
    title: "2. Essential cookies",
    body: (
      <>
        <P variant="md">
          These cookies are necessary for the website to function and can&apos;t
          be switched off. We use them to:
        </P>
        <ul className={listClassName}>
          <li>Keep you signed in to your account as you browse</li>
          <li>
            Remember your session so you don&apos;t need to log in on every page
          </li>
          <li>
            Keep your saved/liked packages tied to your account between visits
          </li>
        </ul>
        <P variant="md">
          Without these cookies, core features like signing in or liking a
          package wouldn&apos;t work, so they&apos;re not something you can opt
          out of individually — you can still avoid them entirely by not
          creating an account.
        </P>
      </>
    ),
  },
  {
    title: "3. Analytics cookies",
    body: (
      <P variant="md">
        We may use privacy-conscious analytics tools, such as PostHog, to
        understand how visitors use this site — for example, which pages and
        packages are viewed most often — so we can improve the experience. These
        cookies don&apos;t identify you personally, and the information they
        collect is never sold or shared with advertisers.
      </P>
    ),
  },
  {
    title: "4. Cookies we don't use",
    body: (
      <P variant="md">
        We don&apos;t use advertising cookies, retargeting pixels, or any
        third-party ad-tracking technology on this site. Our marketing is
        entirely organic, so you won&apos;t be tracked across other websites
        because of your visit here.
      </P>
    ),
  },
  {
    title: "5. Third-party cookies",
    body: (
      <P variant="md">
        Some pages may load content from third-party services — for instance,
        embedded maps or images served from our media storage provider. These
        services may set their own cookies, governed by their own privacy
        policies, which we don&apos;t control.
      </P>
    ),
  },
  {
    title: "6. Managing cookies",
    body: (
      <>
        <P variant="md">
          Most browsers let you view, delete, or block cookies through their
          settings. If you block essential cookies, some parts of this site —
          like staying signed in — may stop working correctly. You can manage
          cookie settings in your browser at any time:
        </P>
        <ul className={listClassName}>
          <li>Chrome: Settings → Privacy and security → Cookies</li>
          <li>Safari: Settings → Privacy → Manage Website Data</li>
          <li>
            Firefox: Settings → Privacy &amp; Security → Cookies and Site Data
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Changes to this policy",
    body: (
      <P variant="md">
        We may update this Cookie Policy from time to time — for example, if we
        start using a new analytics or booking tool. We&apos;ll update the
        &quot;last updated&quot; date above whenever we do.
      </P>
    ),
  },
  {
    title: "8. Contact us",
    body: (
      <P variant="md">
        Questions about how we use cookies? Reach us at{" "}
        <Button variant="link" size="lg" asChild className="px-0">
          <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
        </Button>
        .
      </P>
    ),
  },
]

export default function CookiePolicyPage() {
  return (
    <Section size="lg" className="space-y-10">
      <SectionHeader constrained className="max-w-4xl space-y-3 text-center">
        <P
          variant="sm"
          className="font-semibold tracking-widest text-muted-foreground uppercase"
        >
          Legal
        </P>
        <H1>Cookie Policy</H1>
        <P variant="sm" className="text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </P>
      </SectionHeader>

      <SectionContent constrained className="max-w-4xl space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <H2>{section.title}</H2>
            {section.body}
          </div>
        ))}
      </SectionContent>
    </Section>
  )
}

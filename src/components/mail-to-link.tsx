import Link from "next/link"
import { Button } from "./ui/button"

interface MailtoLinkProps extends Omit<
  React.ComponentProps<typeof Link>,
  "href"
> {
  email: string
  subject?: string
  body?: string
}

export default function MailtoLink({
  email,
  subject,
  body,
  className,
  ...props
}: MailtoLinkProps) {
  const params = new URLSearchParams()

  if (subject) params.set("subject", subject)
  if (body) params.set("body", body)

  const href = `mailto:${email}${params.toString() ? `?${params}` : ""}`

  return (
    <Button asChild variant="link" className={className}>
      <Link href={href} {...props} />
    </Button>
  )
}

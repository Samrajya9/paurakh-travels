import Link from "next/link"

export interface TravelPackage {
  slug: string
  name: string
  duration: string
}

export default function NavTravelCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col gap-0.5 rounded-md p-2 transition-colors hover:bg-primary"
    >
      <span className="text-sm leading-none font-semibold group-hover:text-primary-foreground">
        {pkg.name}
      </span>

      <span className="text-xs text-muted-foreground group-hover:text-primary-foreground">
        Duration: {pkg.duration}
      </span>
    </Link>
  )
}

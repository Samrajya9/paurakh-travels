import PackageDetailSection from "./_components/package_detail_section"
import BookingSidebar from "./_components/booking_sidebar"
import RouteMap from "./_components/package_route_map"
import PackageSummaryCard from "./_components/package_summary_card"
import PackageHero from "./_components/package_hero"
import Itinerary from "./_components/Itinerary"
import Overview from "./_components/overview"

interface GlanceStat {
  icon: React.ReactNode
  label: string
  value: string
}

export const Icon = {
  MapPin: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
      />
    </svg>
  ),
  Clock: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
  ),
  Gauge: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22a10 10 0 100-20 10 10 0 000 20zm-4.24-5.76l2.83-2.83M12 7v2m0 6v2m5-5h-2M7 12H5m9.24-4.24l-1.42 1.42"
      />
    </svg>
  ),
  Activity: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <polyline
        strokeLinecap="round"
        strokeLinejoin="round"
        points="22 12 18 12 15 21 9 3 6 12 2 12"
      />
    </svg>
  ),
  Mountain: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 20l6-10 3 5 3-3 6 8H3z"
      />
    </svg>
  ),
  Users: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  Car: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 17H3v-5l2-5h14l2 5v5h-2m-1 0a2 2 0 01-4 0m-6 0a2 2 0 01-4 0"
      />
    </svg>
  ),
  Bed: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12v5h18v-5M3 12V7a2 2 0 012-2h14a2 2 0 012 2v5M3 12h18M7 12V9h4v3M13 12V9h4v3"
      />
    </svg>
  ),
  Utensils: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 2v7c0 2.2 1.8 4 4 4v9M9 2v20M15 2c0 0 4 3 4 8h-4M15 10v10M19 10h-4"
      />
    </svg>
  ),
  Check: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Phone: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      />
    </svg>
  ),
  Mail: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Share: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  ),
  Doc: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  ChevLeft: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevRight: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Close: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  ImageIcon: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Map: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Star: ({ filled }: { filled: boolean }) => (
    <svg
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
}

const GLANCE_STATS: GlanceStat[] = [
  { icon: <Icon.MapPin />, label: "Destination", value: "Nepal" },
  { icon: <Icon.Clock />, label: "Duration", value: "9 days" },
  {
    icon: <Icon.Gauge />,
    label: "Trip Difficulty",
    value: "Moderate to Strenuous",
  },
  { icon: <Icon.Activity />, label: "Activities", value: "Tour and Trek" },
  { icon: <Icon.Mountain />, label: "Max. Elevation", value: "5364m." },
  { icon: <Icon.Users />, label: "Group Size", value: "Max. 15 Pax" },
  {
    icon: <Icon.Car />,
    label: "Vehicle",
    value: "Private Luxury Tourist Vehicles and Helicopter",
  },
  {
    icon: <Icon.Bed />,
    label: "Accommodation",
    value: "Luxury Hotels in Kathmandu and Luxury Lodges in the Mountain",
  },
  {
    icon: <Icon.Utensils />,
    label: "Meals",
    value: "All Standard Meals throughout the trip",
  },
]

export const ROUTE_STOPS = [
  "Kathmandu",
  "Lukla",
  "Namche Bazaar",
  "Tengboche",
  "Dingboche",
  "Lobuche",
  "Gorak Shep",
  "EBC",
  "Kathmandu",
]

// ─── Page ─────────────────────────────────────────────────────────────────────

const PackageDetail = () => {
  const title = "Luxury Everest Base Camp Trek with Helicopter Return – 9 Days"

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
        <PackageHero title={title} rating={5.0} reviewCount={61} />

        {/* Two-column Flex layout setup allows the dynamic sticky component behavior */}
        <div className="relative mt-6 flex flex-col items-start gap-10 lg:flex-row">
          {/* Left content column */}
          <div className="min-w-0 flex-1 pb-24 lg:pb-8">
            <PackageSummaryCard data={GLANCE_STATS} />
            <RouteMap data={ROUTE_STOPS} />
            <Overview />
            <Itinerary />
          </div>

          {/* Right sticky sidebar */}
          <BookingSidebar className={"sticky top-3 pt-8"} />
        </div>
      </div>
    </main>
  )
}

export default PackageDetail

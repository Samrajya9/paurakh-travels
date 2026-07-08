import { ReviewsSection } from "@/components/reviews-section"
import { CTASection } from "@/components/sections/cta-section"
import HeroSection from "./components/hero-section"
import OverflowCard from "./components/luxury-card"
import DummyHeroSection from "./components/dummy-hero-section"
import { FeaturedPackagesSection } from "@/components/sections/featured-packages-section"

const packageData = {
  id: "cmr7cl5zh001z9nhibpfjqowo",
  slug: "everest-base-camp-trek",
  name: "Everest Base Camp",
  description:
    "Trek through Sherpa villages and dramatic Himalayan scenery to the foot of Mount Everest. A 14-day strenuous adventure featuring Namche Bazaar, Tengboche Monastery, and sweeping views from Kala Patthar at 5,644m.",
  htmlOverview:
    '<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>\n<p>The <strong class="font-bold">Everest Base Camp Trek</strong> is one of the most iconic trekking routes in the world, taking you through Sherpa villages, ancient monasteries, and dramatic mountain scenery to the foot of the world\'s tallest peak.</p>\n<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Why Trek to Everest Base Camp?</h3>\n<ul class="list-disc pl-6">\n<li class="my-0.5">Walk beneath four of the world\'s six tallest peaks</li>\n<li class="my-0.5">Experience authentic Sherpa culture in Namche Bazaar and Tengboche</li>\n<li class="my-0.5">Stand at the base of <span class="underline">Mount Everest</span> (8,849m)</li>\n</ul>\n<blockquote class="border-l-2 pl-2 [&>p]:before:content-[\'“\'] [&>p]:after:content-[\'”\']"><p>This trek changed the way I see mountains — and myself.</p></blockquote>\n<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Trip Facts</h3>\n<table class="border-collapse border border-border w-full my-2">\n<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Duration</th><td class="border border-border p-2 align-top">14 Days</td></tr>\n<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Max Altitude</th><td class="border border-border p-2 align-top">5,644m (Kala Patthar)</td></tr>\n<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Difficulty</th><td class="border border-border p-2 align-top">Strenuous</td></tr>\n</table>',
  basePrice: "1200",
  difficultyId: "cmr7cl5z9001w9nhiloawa478",
  difficulty: {
    id: "cmr7cl5z9001w9nhiloawa478",
    name: "Strenuous",
  },
  groupDiscounts: [
    {
      id: "cmr7cl5zm00219nhiyyoehc7x",
      minPeople: 4,
      price: "1050",
    },
    {
      id: "cmr7cl5zr00239nhidbr9vntw",
      minPeople: 9,
      price: "950",
    },
  ],
  itineraries: [
    {
      id: "cmr7cl60600259nhiycclktch",
      dayNumber: 1,
      title: "Arrival in Lukla",
      htmlDescription:
        '<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Arrival in Lukla</h4>\n<p>Fly from Kathmandu to Lukla\'s Tenzing-Hillary Airport, then begin trekking to <strong class="font-bold">Phakding</strong> alongside the Dudh Koshi river.</p>',
      distanceKm: 8,
      durationHours: 3,
      destinations: [
        {
          id: "cmr7cl60c00279nhi6s8t27vf",
          destinationId: "cmr7cl5vb000a9nhiznk14l1h",
          order: 1,
          destination: {
            id: "cmr7cl5vb000a9nhiznk14l1h",
            name: "Lukla",
            elevation: 2860,
            latitude: 27.6869,
            longitude: 86.7314,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
    {
      id: "cmr7cl60g00299nhi486xss2k",
      dayNumber: 2,
      title: "The Gateway: Namche Bazaar",
      htmlDescription:
        '<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Gateway: Namche Bazaar</h4>\n<p>A steep climb leads to Namche Bazaar, the bustling trading hub of the Khumbu region. Rest here for acclimatization.</p>\n<ul class="list-disc pl-6">\n<li class="my-0.5">Visit the Sherpa Culture Museum</li>\n<li class="my-0.5">First views of Everest from the trail above town</li>\n</ul>',
      distanceKm: 10,
      durationHours: 6,
      destinations: [
        {
          id: "cmr7cl60k002b9nhiue0y14aa",
          destinationId: "cmr7cl5vf000c9nhiqqrvi1w7",
          order: 1,
          destination: {
            id: "cmr7cl5vf000c9nhiqqrvi1w7",
            name: "Namche Bazaar",
            elevation: 3440,
            latitude: 27.804,
            longitude: 86.7147,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
    {
      id: "cmr7cl60r002d9nhi8ron4649",
      dayNumber: 3,
      title: "Tengboche Monastery",
      htmlDescription:
        '<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Tengboche Monastery</h4>\n<p>Trek to Tengboche, home to the largest monastery in the Khumbu, with panoramic views of <span class="underline">Ama Dablam</span> and Everest.</p>',
      distanceKm: 9,
      durationHours: 5,
      destinations: [
        {
          id: "cmr7cl60u002f9nhimsxzmhm7",
          destinationId: "cmr7cl5vk000e9nhit3875wen",
          order: 1,
          destination: {
            id: "cmr7cl5vk000e9nhit3875wen",
            name: "Tengboche",
            elevation: 3860,
            latitude: 27.8362,
            longitude: 86.7644,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
    {
      id: "cmr7cl60x002h9nhi1lye9ila",
      dayNumber: 4,
      title: "Critical Acclimatization Above Dingboche",
      htmlDescription:
        "<h4 class=\"scroll-m-20 text-base font-semibold tracking-tight text-foreground\">Critical Acclimatization Above Dingboche</h4>\n<p>An acclimatization day in Dingboche is essential before pushing higher. A short hike up the Nagarjun hill helps the body adjust.</p>\n<blockquote class=\"border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']\"><p>Climb high, sleep low.</p></blockquote>",
      distanceKm: 12,
      durationHours: 6,
      destinations: [
        {
          id: "cmr7cl610002j9nhimw659pqu",
          destinationId: "cmr7cl5vq000g9nhi3g9aij5y",
          order: 1,
          destination: {
            id: "cmr7cl5vq000g9nhi3g9aij5y",
            name: "Dingboche",
            elevation: 4410,
            latitude: 27.8917,
            longitude: 86.8297,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
    {
      id: "cmr7cl615002l9nhixohur8g3",
      dayNumber: 5,
      title: "The Destination: Everest Base Camp",
      htmlDescription:
        '<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Destination: Everest Base Camp</h4>\n<p>After trekking through Lobuche and Gorak Shep, arrive at <strong class="font-bold">Everest Base Camp</strong> (5,364m) — the ultimate goal of the journey.</p>',
      distanceKm: 15,
      durationHours: 8,
      destinations: [
        {
          id: "cmr7cl618002n9nhi6tfrw5hd",
          destinationId: "cmr7cl5vu000i9nhi8num2sd1",
          order: 1,
          destination: {
            id: "cmr7cl5vu000i9nhi8num2sd1",
            name: "Everest Base Camp",
            elevation: 5364,
            latitude: 28.0026,
            longitude: 86.8528,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
    {
      id: "cmr7cl61c002p9nhit13y22uu",
      dayNumber: 6,
      title: "The Final Approach: Gorak Shep and Everest",
      htmlDescription:
        '<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Final Approach: Gorak Shep and Everest</h4>\n<p>An early morning ascent of Kala Patthar (5,644m) rewards trekkers with the best panoramic view of Everest\'s summit in the entire region.</p>',
      distanceKm: 5,
      durationHours: 4,
      destinations: [
        {
          id: "cmr7cl61f002r9nhi2s86b7m0",
          destinationId: "cmr7cl5vy000k9nhidae8zp20",
          order: 1,
          destination: {
            id: "cmr7cl5vy000k9nhidae8zp20",
            name: "Kala Patthar",
            elevation: 5644,
            latitude: 27.9878,
            longitude: 86.8281,
            region: {
              id: "cmr7cl5v600089nhi237138fx",
              name: "Everest Region",
            },
          },
        },
      ],
    },
  ],
  faqs: [
    {
      id: "cmr7cl61m002u9nhid2uviwuu",
      order: 0,
      faq: {
        id: "cmr7cl61j002s9nhibia18d07",
        question: "What is the best time of year to trek to Everest Base Camp?",
        answer:
          "The best seasons are pre-monsoon (March–May) and post-monsoon (September–November), when skies are clear and temperatures are more stable.",
      },
    },
    {
      id: "cmr7cl61t002x9nhiefymareq",
      order: 1,
      faq: {
        id: "cmr7cl61r002v9nhi3di1176h",
        question: "Do I need previous trekking experience?",
        answer:
          "No technical climbing skills are required, but a good level of fitness and some hiking experience is strongly recommended.",
      },
    },
    {
      id: "cmr7cl62400309nhir5idxhz4",
      order: 2,
      faq: {
        id: "cmr7cl621002y9nhixzmz0hlo",
        question: "Is altitude sickness a serious risk?",
        answer:
          "Yes. Altitude sickness is the primary risk on this trek. Our itinerary builds in dedicated acclimatization days in Namche Bazaar and Dingboche to reduce this risk.",
      },
    },
  ],
  createdAt: "2026-07-05T05:25:39.341Z",
  updatedAt: "2026-07-05T05:25:39.341Z",
  images: [
    {
      id: "cmr7cl62800329nhifjlok1m6",
      entityType: "PACKAGE",
      entityId: "cmr7cl5zh001z9nhibpfjqowo",
      image: {
        id: "cmr7cl5yf001p9nhiepn4wpe4",
        url: "/uploads/critical-acclimatization-above-dingboche.png",
        altText: "Critical Acclimatization Above Dingboche",
      },
      createdAt: "2026-07-05T05:25:39.440Z",
    },
    {
      id: "cmr7cl62c00349nhi4b929r25",
      entityType: "PACKAGE",
      entityId: "cmr7cl5zh001z9nhibpfjqowo",
      image: {
        id: "cmr7cl5yj001q9nhi95cod31l",
        url: "/uploads/on-the-trail-crossing-a-suspension-bridge.png",
        altText: "On The Trail Crossing A Suspension Bridge",
      },
      createdAt: "2026-07-05T05:25:39.444Z",
    },
    {
      id: "cmr7cl62f00369nhih5lqagd2",
      entityType: "PACKAGE",
      entityId: "cmr7cl5zh001z9nhibpfjqowo",
      image: {
        id: "cmr7cl5yq001r9nhip7ansast",
        url: "/uploads/the-destination-everest-base-camp.png",
        altText: "The Destination Everest Base Camp",
      },
      createdAt: "2026-07-05T05:25:39.447Z",
    },
    {
      id: "cmr7cl62h00389nhihi8599io",
      entityType: "PACKAGE",
      entityId: "cmr7cl5zh001z9nhibpfjqowo",
      image: {
        id: "cmr7cl5yu001s9nhipqe3u8tv",
        url: "/uploads/the-final-approach-gorak-shep-and-everest.png",
        altText: "The Final Approach Gorak Shep And Everest",
      },
      createdAt: "2026-07-05T05:25:39.450Z",
    },
    {
      id: "cmr7cl62k003a9nhin5s9n29f",
      entityType: "PACKAGE",
      entityId: "cmr7cl5zh001z9nhibpfjqowo",
      image: {
        id: "cmr7cl5yy001t9nhira5k5edh",
        url: "/uploads/the-gateway-namche-bazaar.png",
        altText: "The Gateway Namche Bazaar",
      },
      createdAt: "2026-07-05T05:25:39.453Z",
    },
  ],
}
export default function Page() {
  return (
    <>
      {/* <HeroSection /> */}
      <DummyHeroSection />

      <ReviewsSection />
      <CTASection />
      {/* <OverflowCard /> */}
    </>
  )
}

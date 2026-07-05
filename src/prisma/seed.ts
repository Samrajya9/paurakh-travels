import "dotenv/config"
import * as fs from "fs"
import * as path from "path"
import {
  CompanyContactType,
  EntityType,
  PrismaClient,
  UserType,
} from "@prisma/client"
import * as argon2 from "argon2"

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

const prisma = new PrismaClient()

const PEPPER = process.env.PEPPER
if (!PEPPER) {
  throw new Error("PEPPER env var is missing — seed cannot hash passwords.")
}

/** Mirrors the exact options from auth.service.ts */
const argon2Options: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
  secret: Buffer.from(PEPPER),
}

// ---------------------------------------------------------------------------
// Seed data — change these before first deploy
// ---------------------------------------------------------------------------

const ADMIN = {
  email: "admin@paurakh.com",
  /** Change immediately after first login */
  password: "Admin@123!",
}

const COMPANY = {
  companyName: "Paurakh Travels",
  tagline: "Discover the Himalayas, Your Way.",
  address: "Thamel, Kathmandu 44600, Nepal",
}

const CONTACTS: { type: CompanyContactType; value: string }[] = [
  { type: CompanyContactType.PHONE, value: "+977-01-4700000" },
  { type: CompanyContactType.EMAIL, value: "info@paurakhtravels.com" },
  { type: CompanyContactType.WHATSAPP, value: "+977-9800000000" },
  { type: CompanyContactType.VIBER, value: "+977-9800000000" },
  {
    type: CompanyContactType.FACEBOOK,
    value: "https://facebook.com/paurakhtravels",
  },
  {
    type: CompanyContactType.INSTAGRAM,
    value: "https://instagram.com/paurakhtravels",
  },
]

const REGIONS: {
  name: string
  destinations: {
    name: string
    elevation: number
    latitude?: number
    longitude?: number
  }[]
}[] = [
  {
    name: "Everest Region",
    destinations: [
      { name: "Lukla", elevation: 2860, latitude: 27.6869, longitude: 86.7314 },
      {
        name: "Namche Bazaar",
        elevation: 3440,
        latitude: 27.804,
        longitude: 86.7147,
      },
      {
        name: "Tengboche",
        elevation: 3860,
        latitude: 27.8362,
        longitude: 86.7644,
      },
      {
        name: "Dingboche",
        elevation: 4410,
        latitude: 27.8917,
        longitude: 86.8297,
      },
      {
        name: "Everest Base Camp",
        elevation: 5364,
        latitude: 28.0026,
        longitude: 86.8528,
      },
      {
        name: "Kala Patthar",
        elevation: 5644,
        latitude: 27.9878,
        longitude: 86.8281,
      },
    ],
  },
  {
    name: "Annapurna Region",
    destinations: [
      {
        name: "Pokhara",
        elevation: 822,
        latitude: 28.2096,
        longitude: 83.9856,
      },
      {
        name: "Ghandruk",
        elevation: 1940,
        latitude: 28.3747,
        longitude: 83.8109,
      },
      {
        name: "Chhomrong",
        elevation: 2170,
        latitude: 28.3906,
        longitude: 83.8103,
      },
      {
        name: "Annapurna Base Camp",
        elevation: 4130,
        latitude: 28.5308,
        longitude: 83.8775,
      },
      {
        name: "Poon Hill",
        elevation: 3210,
        latitude: 28.3992,
        longitude: 83.6975,
      },
      {
        name: "Manang",
        elevation: 3519,
        latitude: 28.6667,
        longitude: 84.0167,
      },
      {
        name: "Thorong La Pass",
        elevation: 5416,
        latitude: 28.7911,
        longitude: 83.9317,
      },
    ],
  },
  {
    name: "Langtang Region",
    destinations: [
      {
        name: "Syabrubesi",
        elevation: 1503,
        latitude: 28.1667,
        longitude: 85.35,
      },
      {
        name: "Lama Hotel",
        elevation: 2470,
        latitude: 28.2072,
        longitude: 85.4136,
      },
      {
        name: "Langtang Village",
        elevation: 3430,
        latitude: 28.2144,
        longitude: 85.5261,
      },
      {
        name: "Kyanjin Gompa",
        elevation: 3870,
        latitude: 28.2167,
        longitude: 85.5667,
      },
    ],
  },
  {
    name: "Manaslu Region",
    destinations: [
      {
        name: "Machha Khola",
        elevation: 869,
        latitude: 28.2242,
        longitude: 84.8331,
      },
      {
        name: "Samagaon",
        elevation: 3530,
        latitude: 28.5667,
        longitude: 84.6333,
      },
      {
        name: "Larkya La Pass",
        elevation: 5106,
        latitude: 28.6167,
        longitude: 84.55,
      },
    ],
  },
  {
    name: "Kathmandu Valley",
    destinations: [
      {
        name: "Kathmandu",
        elevation: 1400,
        latitude: 27.7172,
        longitude: 85.324,
      },
      {
        name: "Bhaktapur",
        elevation: 1401,
        latitude: 27.671,
        longitude: 85.4298,
      },
      { name: "Patan", elevation: 1350, latitude: 27.6727, longitude: 85.3247 },
      {
        name: "Nagarkot",
        elevation: 2175,
        latitude: 27.7172,
        longitude: 85.5199,
      },
    ],
  },
]

const PACKAGE = {
  slug: "everest-base-camp-trek",
  name: "Everest Base Camp",
  description:
    "Trek through Sherpa villages and dramatic Himalayan scenery to the foot of Mount Everest. A 14-day strenuous adventure featuring Namche Bazaar, Tengboche Monastery, and sweeping views from Kala Patthar at 5,644m.",
  basePrice: 1200,

  htmlOverview: `<h2 class="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">Trip Overview</h2>
<p>The <strong class="font-bold">Everest Base Camp Trek</strong> is one of the most iconic trekking routes in the world, taking you through Sherpa villages, ancient monasteries, and dramatic mountain scenery to the foot of the world's tallest peak.</p>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Why Trek to Everest Base Camp?</h3>
<ul class="list-disc pl-6">
<li class="my-0.5">Walk beneath four of the world's six tallest peaks</li>
<li class="my-0.5">Experience authentic Sherpa culture in Namche Bazaar and Tengboche</li>
<li class="my-0.5">Stand at the base of <span class="underline">Mount Everest</span> (8,849m)</li>
</ul>
<blockquote class="border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']"><p>This trek changed the way I see mountains — and myself.</p></blockquote>
<h3 class="scroll-m-20 text-lg font-semibold tracking-tight text-foreground">Trip Facts</h3>
<table class="border-collapse border border-border w-full my-2">
<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Duration</th><td class="border border-border p-2 align-top">14 Days</td></tr>
<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Max Altitude</th><td class="border border-border p-2 align-top">5,644m (Kala Patthar)</td></tr>
<tr><th class="border border-border bg-muted font-semibold p-2 text-left">Difficulty</th><td class="border border-border p-2 align-top">Strenuous</td></tr>
</table>`,
}

const PACKAGE_ITINERARIES: {
  dayNumber: number
  title: string
  htmlDescription: string
  distanceKm?: number
  durationHours?: number
  destinationName: string
}[] = [
  {
    dayNumber: 1,
    title: "Arrival in Lukla",
    destinationName: "Lukla",
    distanceKm: 8,
    durationHours: 3,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Arrival in Lukla</h4>
<p>Fly from Kathmandu to Lukla's Tenzing-Hillary Airport, then begin trekking to <strong class="font-bold">Phakding</strong> alongside the Dudh Koshi river.</p>`,
  },
  {
    dayNumber: 2,
    title: "The Gateway: Namche Bazaar",
    destinationName: "Namche Bazaar",
    distanceKm: 10,
    durationHours: 6,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Gateway: Namche Bazaar</h4>
<p>A steep climb leads to Namche Bazaar, the bustling trading hub of the Khumbu region. Rest here for acclimatization.</p>
<ul class="list-disc pl-6">
<li class="my-0.5">Visit the Sherpa Culture Museum</li>
<li class="my-0.5">First views of Everest from the trail above town</li>
</ul>`,
  },
  {
    dayNumber: 3,
    title: "Tengboche Monastery",
    destinationName: "Tengboche",
    distanceKm: 9,
    durationHours: 5,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Tengboche Monastery</h4>
<p>Trek to Tengboche, home to the largest monastery in the Khumbu, with panoramic views of <span class="underline">Ama Dablam</span> and Everest.</p>`,
  },
  {
    dayNumber: 4,
    title: "Critical Acclimatization Above Dingboche",
    destinationName: "Dingboche",
    distanceKm: 12,
    durationHours: 6,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">Critical Acclimatization Above Dingboche</h4>
<p>An acclimatization day in Dingboche is essential before pushing higher. A short hike up the Nagarjun hill helps the body adjust.</p>
<blockquote class="border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']"><p>Climb high, sleep low.</p></blockquote>`,
  },
  {
    dayNumber: 5,
    title: "The Destination: Everest Base Camp",
    destinationName: "Everest Base Camp",
    distanceKm: 15,
    durationHours: 8,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Destination: Everest Base Camp</h4>
<p>After trekking through Lobuche and Gorak Shep, arrive at <strong class="font-bold">Everest Base Camp</strong> (5,364m) — the ultimate goal of the journey.</p>`,
  },
  {
    dayNumber: 6,
    title: "The Final Approach: Gorak Shep and Everest",
    destinationName: "Kala Patthar",
    distanceKm: 5,
    durationHours: 4,
    htmlDescription: `<h4 class="scroll-m-20 text-base font-semibold tracking-tight text-foreground">The Final Approach: Gorak Shep and Everest</h4>
<p>An early morning ascent of Kala Patthar (5,644m) rewards trekkers with the best panoramic view of Everest's summit in the entire region.</p>`,
  },
]

const PACKAGE_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the best time of year to trek to Everest Base Camp?",
    answer:
      "The best seasons are pre-monsoon (March–May) and post-monsoon (September–November), when skies are clear and temperatures are more stable.",
  },
  {
    question: "Do I need previous trekking experience?",
    answer:
      "No technical climbing skills are required, but a good level of fitness and some hiking experience is strongly recommended.",
  },
  {
    question: "Is altitude sickness a serious risk?",
    answer:
      "Yes. Altitude sickness is the primary risk on this trek. Our itinerary builds in dedicated acclimatization days in Namche Bazaar and Dingboche to reduce this risk.",
  },
]

const PACKAGE_GROUP_DISCOUNTS: { minPeople: number; price: number }[] = [
  { minPeople: 4, price: 1050 },
  { minPeople: 9, price: 950 },
]

const DIFFICULTIES: string[] = [
  "Easy",
  "Moderate",
  "Strenuous",
  "Very Strenuous",
]

function filenameToAltText(filename: string) {
  const base = filename.replace(path.extname(filename), "")
  return base
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")
}

async function upsertImageByUrl(url: string, altText?: string) {
  const existing = await prisma.image.findFirst({ where: { url } })
  if (existing) return existing

  return prisma.image.create({
    data: { url, altText },
  })
}

async function upsertFaqByQuestion(question: string, answer: string) {
  const existing = await prisma.faq.findFirst({ where: { question } })
  if (existing) return existing

  return prisma.faq.create({
    data: { question, answer },
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Starting seed...\n")

  // ── 1. Admin user ──────────────────────────────────────────────────────────
  const hashedPassword = await argon2.hash(ADMIN.password, argon2Options)

  const admin = await prisma.user.upsert({
    where: { email: ADMIN.email },
    create: {
      email: ADMIN.email,
      password: hashedPassword,
      user_type: UserType.ADMIN,
    },
    /**
     * On re-run: leave the password untouched so a changed production
     * password is never accidentally overwritten by re-seeding.
     */
    update: {},
    select: { id: true, email: true, user_type: true },
  })

  console.log(`✓ Admin user`)
  console.log(`  id         : ${admin.id}`)
  console.log(`  email      : ${admin.email}`)
  console.log(`  user_type  : ${admin.user_type}`)
  console.log(
    `  password   : ${ADMIN.password}  ← change this after first login\n`
  )

  // ── 2. Company profile ─────────────────────────────────────────────────────
  //
  // The `singleton: true` unique constraint on CompanyProfile means only one
  // row can ever exist. upsert uses it as the stable lookup key.
  //
  // Contacts are only created on the first insert. On subsequent runs the
  // `update: {}` no-op leaves everything intact so manual edits survive
  // re-seeding.

  const profile = await prisma.companyProfile.upsert({
    where: { singleton: true },
    create: {
      ...COMPANY,
      contacts: {
        create: CONTACTS,
      },
    },
    update: {},
    select: {
      id: true,
      companyName: true,
      tagline: true,
      address: true,
      contacts: { select: { type: true, value: true } },
    },
  })

  console.log(`✓ Company profile`)
  console.log(`  id          : ${profile.id}`)
  console.log(`  companyName : ${profile.companyName}`)
  console.log(`  tagline     : ${profile.tagline}`)
  console.log(`  address     : ${profile.address}`)
  console.log(`  contacts    : ${profile.contacts.length} entries`)
  profile.contacts.forEach((c) => console.log(`    [${c.type}] ${c.value}`))

  // ── 3. Regions + destinations ──────────────────────────────────────────────
  //
  // Region.name is unique, so upsert on it. Destination is unique on
  // [regionId, name], so each destination upsert needs the parent region's
  // id resolved first.

  console.log("")
  for (const { name: regionName, destinations } of REGIONS) {
    const region = await prisma.region.upsert({
      where: { name: regionName },
      create: { name: regionName },
      update: {},
      select: { id: true, name: true },
    })

    console.log(`✓ Region: ${region.name}`)

    for (const destination of destinations) {
      await prisma.destination.upsert({
        where: {
          regionId_name: {
            regionId: region.id,
            name: destination.name,
          },
        },
        create: {
          regionId: region.id,
          name: destination.name,
          elevation: destination.elevation,
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
        update: {},
      })

      console.log(`    - ${destination.name} (${destination.elevation}m)`)
    }
  }

  console.log(
    `\n✓ ${REGIONS.length} regions, ${REGIONS.reduce((sum, r) => sum + r.destinations.length, 0)} destinations seeded`
  )

  // ── 4. Images from public/uploads ──────────────────────────────────────────

  console.log("")
  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  const uploadedFiles = fs.existsSync(uploadsDir)
    ? fs
        .readdirSync(uploadsDir)
        .filter((f) =>
          [".png", ".jpg", ".jpeg", ".webp"].includes(
            path.extname(f).toLowerCase()
          )
        )
    : []

  const imagesByFilename = new Map<string, { id: string }>()

  for (const filename of uploadedFiles) {
    const image = await upsertImageByUrl(
      `/uploads/${filename}`,
      filenameToAltText(filename)
    )
    imagesByFilename.set(filename, image)
    console.log(`✓ Image: /uploads/${filename}`)
  }

  // ── 4.5. Difficulties ────────────────────────────────────────────────────

  console.log("")
  const difficultiesByName = new Map<string, { id: string }>()

  for (const name of DIFFICULTIES) {
    const difficulty = await prisma.difficulty.upsert({
      where: { name },
      create: { name },
      update: {},
      select: { id: true, name: true },
    })
    difficultiesByName.set(name, difficulty)
    console.log(`✓ Difficulty: ${difficulty.name}`)
  }

  const strenuous = difficultiesByName.get("Strenuous")
  if (!strenuous) {
    throw new Error(
      `Difficulty "Strenuous" not found — did the difficulty seed loop run first?`
    )
  }

  // ── 5. Package: Everest Base Camp ────────────────────────────────────────────

  const pkg = await prisma.package.upsert({
    where: { slug: PACKAGE.slug },
    create: {
      slug: PACKAGE.slug,
      name: PACKAGE.name,
      description: PACKAGE.description,
      basePrice: PACKAGE.basePrice,
      htmlOverview: PACKAGE.htmlOverview,
      difficultyId: strenuous.id,
    },
    update: {},
    select: { id: true, name: true },
  })

  console.log(`\n✓ Package: ${pkg.name}`)

  for (const tier of PACKAGE_GROUP_DISCOUNTS) {
    await prisma.packageGroupDiscount.upsert({
      where: {
        packageId_minPeople: {
          packageId: pkg.id,
          minPeople: tier.minPeople,
        },
      },
      create: {
        packageId: pkg.id,
        minPeople: tier.minPeople,
        price: tier.price,
      },
      update: {},
    })
    console.log(
      `    Discount tier: ${tier.minPeople}+ people → Rs. ${tier.price}`
    )
  }

  for (const day of PACKAGE_ITINERARIES) {
    const destination = await prisma.destination.findFirst({
      where: { name: day.destinationName },
      select: { id: true },
    })

    if (!destination) {
      console.warn(
        `  ⚠ Skipping day ${day.dayNumber}: destination "${day.destinationName}" not found — did the region/destination seed run first?`
      )
      continue
    }

    const itinerary = await prisma.itinerary.upsert({
      where: {
        packageId_dayNumber: {
          packageId: pkg.id,
          dayNumber: day.dayNumber,
        },
      },
      create: {
        packageId: pkg.id,
        dayNumber: day.dayNumber,
        title: day.title,
        htmlDescription: day.htmlDescription,
        distanceKm: day.distanceKm,
        durationHours: day.durationHours,
      },
      update: {},
      select: { id: true },
    })

    await prisma.itineraryDestination.upsert({
      where: {
        itineraryId_destinationId: {
          itineraryId: itinerary.id,
          destinationId: destination.id,
        },
      },
      create: {
        itineraryId: itinerary.id,
        destinationId: destination.id,
        order: 1,
      },
      update: {},
    })

    console.log(`    Day ${day.dayNumber}: ${day.title}`)
  }

  // ── 6. FAQs, linked via PackageFaq ────────────────────────────────────────

  for (const [index, faqData] of PACKAGE_FAQS.entries()) {
    const faq = await upsertFaqByQuestion(faqData.question, faqData.answer)

    await prisma.packageFaq.upsert({
      where: {
        packageId_faqId: {
          packageId: pkg.id,
          faqId: faq.id,
        },
      },
      create: {
        packageId: pkg.id,
        faqId: faq.id,
        order: index,
      },
      update: {},
    })

    console.log(`    FAQ: ${faqData.question}`)
  }

  // ── 7. Package image attachments ────────────────────────────────────────────

  for (const image of imagesByFilename.values()) {
    await prisma.imageAttachment.upsert({
      where: {
        imageId_entityType_entityId: {
          imageId: image.id,
          entityType: EntityType.PACKAGE,
          entityId: pkg.id,
        },
      },
      create: {
        imageId: image.id,
        entityType: EntityType.PACKAGE,
        entityId: pkg.id,
      },
      update: {},
    })
  }

  console.log("\n🌱 Seed complete.")
}

main()
  .catch((err) => {
    console.error("Seed failed:", err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

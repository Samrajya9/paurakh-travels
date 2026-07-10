import * as fs from "fs"
import * as path from "path"
import { EntityType, UserType } from "@prisma/client"
import * as argon2 from "argon2"

import { prisma, argon2Options } from "./client"
import {
  upsertImageByUrl,
  upsertFaqByQuestion,
  filenameToAltText,
} from "./helpers"
import { ADMIN } from "./data/admin.data"
import { COMPANY, CONTACTS } from "./data/company.data"
import { DESTINATIONS } from "./data/geography.data"
import { DIFFICULTIES } from "./data/difficulties.data"
import { CATEGORIES, ACTIVITIES, SEASONS, THEMES } from "./data/lookups.data"
import { PACKAGE } from "./data/package.data"
import { PACKAGE_ITINERARIES } from "./data/itineraries.data"
import { PACKAGE_FAQS } from "./data/faqs.data"
import { PACKAGE_GROUP_DISCOUNTS } from "./data/group-discounts.data"

async function main() {
  console.log("🌱 Starting seed...\n")

  // ── 1. Admin user ──────────────────────────────────────────────────────
  const hashedPassword = await argon2.hash(ADMIN.password, argon2Options)

  const admin = await prisma.user.upsert({
    where: { email: ADMIN.email },
    create: {
      email: ADMIN.email,
      password: hashedPassword,
      user_type: UserType.ADMIN,
    },
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

  // ── 2. Company profile ───────────────────────────────────────────────────
  const profile = await prisma.companyProfile.upsert({
    where: { singleton: true },
    create: { ...COMPANY, contacts: { create: CONTACTS } },
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

  // ── 3. Destinations → Regions → Places ───────────────────────────────────
  console.log("")
  let regionCount = 0
  let placeCount = 0

  for (const { name: destinationName, regions } of DESTINATIONS) {
    const destination = await prisma.destination.upsert({
      where: { name: destinationName },
      create: { name: destinationName },
      update: {},
      select: { id: true, name: true },
    })

    console.log(`✓ Destination: ${destination.name}`)

    for (const { name: regionName, places } of regions) {
      const region = await prisma.region.upsert({
        where: { name: regionName },
        create: { name: regionName, destinationId: destination.id },
        update: { destinationId: destination.id },
        select: { id: true, name: true },
      })

      regionCount++
      console.log(`  ✓ Region: ${region.name}`)

      for (const place of places) {
        await prisma.place.upsert({
          where: { regionId_name: { regionId: region.id, name: place.name } },
          create: {
            regionId: region.id,
            name: place.name,
            elevation: place.elevation,
            latitude: place.latitude,
            longitude: place.longitude,
          },
          update: {},
        })

        placeCount++
        console.log(`      - ${place.name} (${place.elevation}m)`)
      }
    }
  }

  console.log(
    `\n✓ ${DESTINATIONS.length} destinations, ${regionCount} regions, ${placeCount} places seeded`
  )

  // ── 4. Images from public/uploads ────────────────────────────────────────
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

  // ── 5. Difficulties ───────────────────────────────────────────────────
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

  // ── 5.5. Categories, Activities, Seasons, Themes ─────────────────────────
  console.log("")

  for (const name of CATEGORIES) {
    await prisma.category.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    console.log(`✓ Category: ${name}`)
  }

  console.log("")
  for (const name of ACTIVITIES) {
    await prisma.activity.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    console.log(`✓ Activity: ${name}`)
  }

  console.log("")
  for (const name of SEASONS) {
    await prisma.season.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    console.log(`✓ Season: ${name}`)
  }

  console.log("")
  for (const name of THEMES) {
    await prisma.theme.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    console.log(`✓ Theme: ${name}`)
  }

  // ── 6. Package: Everest Base Camp ────────────────────────────────────────
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
        packageId_minPeople: { packageId: pkg.id, minPeople: tier.minPeople },
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
    const place = await prisma.place.findFirst({
      where: { name: day.placeName },
      select: { id: true },
    })

    if (!place) {
      console.warn(
        `  ⚠ Skipping day ${day.dayNumber}: place "${day.placeName}" not found — did the geography seed run first?`
      )
      continue
    }

    const itinerary = await prisma.itinerary.upsert({
      where: {
        packageId_dayNumber: { packageId: pkg.id, dayNumber: day.dayNumber },
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

    await prisma.itineraryPlace.upsert({
      where: {
        itineraryId_placeId: { itineraryId: itinerary.id, placeId: place.id },
      },
      create: { itineraryId: itinerary.id, placeId: place.id, order: 1 },
      update: {},
    })

    console.log(`    Day ${day.dayNumber}: ${day.title}`)
  }

  // ── 7. FAQs ───────────────────────────────────────────────────────────
  for (const [index, faqData] of PACKAGE_FAQS.entries()) {
    const faq = await upsertFaqByQuestion(faqData.question, faqData.answer)

    await prisma.packageFaq.upsert({
      where: { packageId_faqId: { packageId: pkg.id, faqId: faq.id } },
      create: { packageId: pkg.id, faqId: faq.id, order: index },
      update: {},
    })

    console.log(`    FAQ: ${faqData.question}`)
  }

  // ── 8. Package image attachments ─────────────────────────────────────────
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

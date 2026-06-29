/**
 * Prisma seed — run with: pnpm prisma db seed
 *
 * Seeds:
 *   1. One admin user (upserted — safe to re-run)
 *   2. Company profile + contacts (upserted — safe to re-run)
 *
 * Required env vars (same .env the app uses):
 *   DATABASE_URL   — Prisma connection string
 *   PEPPER         — argon2 pepper (must match auth.service.ts)
 */

import "dotenv/config"
import { CompanyContactType, PrismaClient, UserType } from "@prisma/client"
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

  console.log("\n🌱 Seed complete.")
}

main()
  .catch((err) => {
    console.error("Seed failed:", err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

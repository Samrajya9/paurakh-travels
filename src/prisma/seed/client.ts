import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import * as argon2 from "argon2"

export const prisma = new PrismaClient()

const PEPPER = process.env.PEPPER
console.log("PEPPER", PEPPER)

if (!PEPPER) {
  throw new Error("PEPPER env var is missing — seed cannot hash passwords.")
}

/** Mirrors the exact options from auth.service.ts */
export const argon2Options: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
  secret: Buffer.from(PEPPER),
}

import { serverEnv } from "@/env/server"
import * as argon2 from "argon2"

const pepper = Buffer.from(serverEnv.PEPPER)

const argon2Options: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
  secret: pepper,
}

export async function hashPassword(password: string) {
  return argon2.hash(password, argon2Options)
}

export async function verifyPassword(password: string, hash: string) {
  return argon2.verify(hash, password, {
    secret: pepper,
  })
}

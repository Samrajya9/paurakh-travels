import { serverEnv } from "@/env/server"
import { UserSchema } from "@/types/users.type"
import { createUser, getUserByEmail } from "@/services/user.service"
import * as argon2 from "argon2"
import { AppError } from "@/lib/errors"

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

export async function register(dto: UserSchema) {
  const existingUser = await getUserByEmail(dto.email)

  if (existingUser) {
    throw new AppError("Email already exists", 409) // 409 Conflict, not 500
  }

  const hashedPassword = await hashPassword(dto.password)

  return createUser({
    ...dto,
    password: hashedPassword,
  })
}

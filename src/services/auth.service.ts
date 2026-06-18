import { serverEnv } from "@/env/server"
import { UserSchema } from "@/types/users.type"
import {
  createUser,
  getUserByEmail,
  getUserPasswordByEmail,
} from "@/services/user.service"
import * as argon2 from "argon2"
import { AppError } from "@/lib/errors"
import { LoginSchema } from "@/types/login.type"
import * as jose from "jose"
import { signAccessToken, signRefreshToken } from "@/lib/jwt"

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

// const accessSecret = new TextEncoder().encode(serverEnv.ACCESS_TOKEN_SECRET)
// const refreshSecret = new TextEncoder().encode(serverEnv.REFRESH_TOKEN_SECRET)

// export async function signAccessToken(payload: jose.JWTPayload) {
//   return new jose.SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("15m")
//     .sign(accessSecret)
// }

// export async function signRefreshToken(payload: jose.JWTPayload) {
//   return new jose.SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(refreshSecret)
// }

// export async function verifyAccessToken(token: string) {
//   const { payload } = await jose.jwtVerify(token, accessSecret)
//   return payload
// }

// export async function verifyRefreshToken(token: string) {
//   const { payload } = await jose.jwtVerify(token, refreshSecret)
//   return payload
// }

export async function register(dto: UserSchema) {
  const existingUser = await getUserByEmail(dto.email)

  if (existingUser) {
    throw new AppError("Email already exists", 409)
  }

  const hashedPassword = await hashPassword(dto.password)

  return createUser({
    ...dto,
    password: hashedPassword,
  })
}

export async function login({ email, password }: LoginSchema) {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new AppError("Invalid email or password", 401)
  }

  const passwordField = await getUserPasswordByEmail(email)

  if (!passwordField) {
    throw new AppError("Invalid email or password", 401)
  }

  const isValid = await verifyPassword(password, passwordField.password)

  if (!isValid) {
    throw new AppError("Invalid email or password", 401)
  }

  const tokenPayload: jose.JWTPayload = {
    sub: user.id,
    email: user.email,
    user_type: user.user_type,
  }

  const accessToken = await signAccessToken(tokenPayload)
  const refreshToken = await signRefreshToken(tokenPayload)

  return { accessToken, refreshToken }
}

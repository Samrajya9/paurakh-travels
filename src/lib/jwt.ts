import { serverEnv } from "@/env/server"
import * as jose from "jose"

// process.env used directly — serverEnv pulls argon2 transitively which breaks Edge
const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
const refreshSecret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET!
)

// const accessSecret = new TextEncoder().encode(serverEnv.ACCESS_TOKEN_SECRET)
// const refreshSecret = new TextEncoder().encode(serverEnv.REFRESH_TOKEN_SECRET)

export async function signAccessToken(payload: jose.JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(accessSecret)
}

export async function signRefreshToken(payload: jose.JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshSecret)
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jose.jwtVerify(token, accessSecret)
  return payload
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jose.jwtVerify(token, refreshSecret)
  return payload
}

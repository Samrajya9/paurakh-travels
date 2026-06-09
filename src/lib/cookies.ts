import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { clientEnv } from "@/env/client"

const isSecure = clientEnv.NEXT_PUBLIC_APP_URL.startsWith("https")

export const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isSecure,
  path: "/",
  maxAge: 60 * 15, // 15 minutes
} satisfies Partial<ResponseCookie>

export const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isSecure,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
} satisfies Partial<ResponseCookie>

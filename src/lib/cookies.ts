import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { clientEnv } from "@/env/client"

const isSecure = clientEnv.NEXT_PUBLIC_APP_URL.startsWith("https")

export const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isSecure,
  path: "/",
  maxAge: 60 * 20,
} satisfies Partial<ResponseCookie>

export const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isSecure,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
} satisfies Partial<ResponseCookie>

export function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean
    sameSite?: "lax" | "strict" | "none"
    secure?: boolean
    path?: string
    maxAge?: number
  }
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`]

  if (options.path) parts.push(`Path=${options.path}`)
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)
  if (options.httpOnly) parts.push("HttpOnly")
  if (options.secure) parts.push("Secure")
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`)

  return parts.join("; ")
}

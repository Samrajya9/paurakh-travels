import "server-only"

import { cookies } from "next/headers"
import * as jose from "jose"
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "@/services/auth.service"
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "@/lib/cookies"
import type { User } from "@/context/auth.context"
import { UserType } from "@/types/users_type.type"

// ── payload → User ─────────────────────────────────────────────────────────

/**
 * Maps a verified JWT payload to the shared `User` shape.
 * Centralises the casting so access-token and refresh-token paths
 * stay in sync automatically.
 */
export function payloadToUser(payload: jose.JWTPayload): User {
  return {
    id: payload.sub as string,
    email: payload.email as string,
    user_type: payload.user_type as UserType,
  }
}

// ── getCurrentUser ──────────────────────────────────────────────────────────

/**
 * Server-only helper called from RootLayout (and any other Server Component
 * that needs the authenticated user).
 *
 * Strategy:
 *  1. Try the access token first — cheapest path, no DB round-trip.
 *  2. On failure fall back to the refresh token.
 *  3. If the refresh token is valid, rotate both tokens and set new cookies.
 *  4. Return `null` when no valid session can be established.
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()

  // ── 1. Try access token ───────────────────────────────────────────────────

  const accessToken = cookieStore.get("access_token")?.value

  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken)
      return payloadToUser(payload)
    } catch {
      // expired or tampered — fall through to refresh
    }
  }

  // ── 2. Try refresh token ──────────────────────────────────────────────────

  const refreshToken = cookieStore.get("refresh_token")?.value

  if (!refreshToken) {
    return null
  }

  try {
    const refreshPayload = await verifyRefreshToken(refreshToken)

    // ── 3. Rotate tokens ────────────────────────────────────────────────────

    const newTokenPayload: jose.JWTPayload = {
      sub: refreshPayload.sub,
      email: refreshPayload.email as string | undefined,
      user_type: refreshPayload.user_type as string | undefined,
    }

    const newAccessToken = await signAccessToken(newTokenPayload)
    const newRefreshToken = await signRefreshToken({ sub: refreshPayload.sub })

    cookieStore.set("access_token", newAccessToken, accessTokenCookieOptions)
    cookieStore.set("refresh_token", newRefreshToken, refreshTokenCookieOptions)

    return payloadToUser(refreshPayload)
  } catch {
    // refresh token is invalid or expired
    return null
  }
}

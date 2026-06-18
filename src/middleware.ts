import { NextRequest, NextResponse } from "next/server"

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "./lib/cookies"
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/jwt"

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value
  const refreshToken = request.cookies.get("refresh_token")?.value

  // Happy path: valid access token — nothing to do
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken)
      return NextResponse.next()
    } catch {
      // Expired/tampered — fall through to refresh rotation
    }
  }

  if (!refreshToken) {
    return NextResponse.next()
  }

  try {
    const payload = await verifyRefreshToken(refreshToken)
    const newTokenPayload = {
      sub: payload.sub,
      email: payload.email as string,
      user_type: payload.user_type as string,
    }

    const newAccessToken = await signAccessToken(newTokenPayload)
    const newRefreshToken = await signRefreshToken(newTokenPayload)

    // Inject fresh tokens into the forwarded request so cookies() in RSC
    // (RootLayout → getCurrentUser) reads the new values, not the stale ones
    const newCookieHeader = request.cookies
      .getAll()
      .filter(({ name }) => name !== "access_token" && name !== "refresh_token")
      .map(({ name, value }) => `${name}=${value}`)
      .concat([
        `access_token=${newAccessToken}`,
        `refresh_token=${newRefreshToken}`,
      ])
      .join("; ")

    const newRequestHeaders = new Headers(request.headers)
    newRequestHeaders.set("cookie", newCookieHeader)

    const response = NextResponse.next({
      request: { headers: newRequestHeaders },
    })

    // Also write to the outgoing response so the browser persists the new cookies
    response.cookies.set(
      "access_token",
      newAccessToken,
      accessTokenCookieOptions
    )
    response.cookies.set(
      "refresh_token",
      newRefreshToken,
      refreshTokenCookieOptions
    )

    return response
  } catch (error) {
    // Refresh token invalid/expired — wipe both and pass through as unauthenticated
    const response = NextResponse.next()
    response.cookies.delete("access_token")
    response.cookies.delete("refresh_token")
    return response
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

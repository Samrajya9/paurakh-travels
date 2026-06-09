import type { NextRequest } from "next/server"
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "@/services/auth.service"
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  serializeCookie,
} from "@/lib/cookies"
import { extractRefreshToken } from "@/lib/tokens"

export async function POST(req: NextRequest) {
  const refreshToken = extractRefreshToken(req)

  if (!refreshToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await verifyRefreshToken(refreshToken)

    const tokenPayload = {
      sub: payload.sub,
      email: payload.email as string | undefined,
      user_type: payload.user_type as string | undefined,
    }

    const newAccessToken = await signAccessToken(tokenPayload)
    const newRefreshToken = await signRefreshToken({ sub: payload.sub })

    const response = Response.json({ ok: true }, { status: 200 })

    response.headers.append(
      "Set-Cookie",
      serializeCookie("access_token", newAccessToken, accessTokenCookieOptions)
    )
    response.headers.append(
      "Set-Cookie",
      serializeCookie(
        "refresh_token",
        newRefreshToken,
        refreshTokenCookieOptions
      )
    )

    return response
  } catch {
    return Response.json(
      { error: "Invalid or expired refresh token" },
      { status: 401 }
    )
  }
}

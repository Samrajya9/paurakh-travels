import type { NextRequest } from "next/server"
import { login } from "@/services/auth.service"
import { loginSchema } from "@/schemas/login.schema"
import { AppError } from "@/lib/errors"
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "@/lib/cookies"

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null)

  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    const { accessToken, refreshToken } = await login(parsed.data)

    const response = Response.json({ ok: true }, { status: 200 })

    response.headers.append(
      "Set-Cookie",
      serializeCookie("access_token", accessToken, accessTokenCookieOptions)
    )
    response.headers.append(
      "Set-Cookie",
      serializeCookie("refresh_token", refreshToken, refreshTokenCookieOptions)
    )

    return response
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

// ── helper ────────────────────────────────────────────────────────────────────

function serializeCookie(
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

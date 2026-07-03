import type { NextRequest } from "next/server"
import { login } from "@/services/auth.service"
import { LoginSchema } from "@/schemas/login.schema"
import { AppError } from "@/lib/errors"
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  serializeCookie,
} from "@/lib/cookies"

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null)

  const parsed = LoginSchema.safeParse(body)

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

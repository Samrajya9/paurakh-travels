import type { NextRequest } from "next/server"

export function extractAccessToken(req: NextRequest): string | undefined {
  return req.cookies.get("access_token")?.value
}

export function extractRefreshToken(req: NextRequest): string | undefined {
  return req.cookies.get("refresh_token")?.value
}

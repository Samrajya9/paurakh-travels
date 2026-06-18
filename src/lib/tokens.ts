import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

// export function extractAccessToken(req: NextRequest): string | undefined {
//   return req.cookies.get("access_token")?.value
// }

// export function extractRefreshToken(req: NextRequest): string | undefined {
//   return req.cookies.get("refresh_token")?.value
// }
export async function extractToken(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}
export async function extractAccessToken() {
  return await extractToken("access_token")
}

export async function extractRefreshToken() {
  return await extractToken("refresh_token")
}

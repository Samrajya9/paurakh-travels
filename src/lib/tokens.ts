import { cookies } from "next/headers"

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

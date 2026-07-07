import "server-only"

import { cookies } from "next/headers"
import * as jose from "jose"
import type { User } from "@/context/auth.context"
import { verifyAccessToken } from "./jwt"
import { UserType } from "@/constants/enums/user-type"

export function payloadToUser(payload: jose.JWTPayload): User {
  return {
    id: payload.sub as string,
    email: payload.email as string,
    user_type: payload.user_type as UserType,
  }
}

/**
 * Read-only — middleware has already rotated tokens and injected fresh
 * cookies into the request before this runs. All this needs to do is
 * verify the (guaranteed-fresh) access token.
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value

  if (!accessToken) return null

  try {
    const payload = await verifyAccessToken(accessToken)
    return payloadToUser(payload)
  } catch {
    return null
  }
}

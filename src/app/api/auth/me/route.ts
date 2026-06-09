import type { NextRequest } from "next/server"
import { verifyAccessToken } from "@/services/auth.service"
import { extractAccessToken } from "@/lib/tokens"

export async function GET(req: NextRequest) {
  const accessToken = extractAccessToken(req)

  if (!accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await verifyAccessToken(accessToken)
    return Response.json(payload, { status: 200 })
  } catch {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}

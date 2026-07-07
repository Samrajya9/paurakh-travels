import { NextRequest, NextResponse } from "next/server"
import { getAllLikedPackageIdsForUser } from "@/services/user-package-like.service"
import { getCurrentUser } from "@/lib/auth-server"

/**
 * GET returns ALL package ids liked by the current user
 * (the [id] in the url is not used here, per spec — this mirrors
 * "getAll" on the service, scoped to the logged-in user).
 */
export async function GET(_request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const likedPackageIds = await getAllLikedPackageIdsForUser(user.id)

  return NextResponse.json({ data: likedPackageIds })
}

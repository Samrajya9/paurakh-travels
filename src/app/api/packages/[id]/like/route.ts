import { NextRequest, NextResponse } from "next/server"
import {
  addPackageLike,
  removePackageLike,
} from "@/services/user-package-like.service"
import { getCurrentUser } from "@/lib/auth-server"

type RouteContext = {
  params: Promise<{ id: string }>
}

/**
 * POST likes the package_id from the url for the current user.
 */
export async function POST(_request: NextRequest, context: RouteContext) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // packageId is a string (cuid) here to match the schema you shared.
  // If Package.id is Int in your schema, parse it instead:
  //   const packageId = Number(id);
  //   if (Number.isNaN(packageId)) { ...400... }
  const { id: packageId } = await context.params

  try {
    const like = await addPackageLike({ userId: user.id, packageId })
    return NextResponse.json({ data: like }, { status: 201 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to like package"
    return NextResponse.json({ message }, { status: 400 })
  }
}

/**
 * DELETE unlikes the package_id from the url for the current user.
 */
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id: packageId } = await context.params

  try {
    await removePackageLike(user.id, packageId)
    return NextResponse.json({ message: "Package unliked" }, { status: 200 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to unlike package"
    return NextResponse.json({ message }, { status: 400 })
  }
}

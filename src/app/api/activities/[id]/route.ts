import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateActivitySchema } from "@/schemas/update-activity.schema"
import {
  deleteActivityById,
  getActivityById,
  updateActivityById,
} from "@/services/activity.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/activities/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const activity = await getActivityById(id)
    return NextResponse.json(activity)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/activities/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateActivitySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const activity = await updateActivityById(id, parsed.data)
    return NextResponse.json(activity)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/activities/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const activity = await deleteActivityById(id)
    return NextResponse.json(activity)
  } catch (error) {
    return handleApiError(error)
  }
}

import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateActivitySchema } from "@/schemas/create-activity.schema"
import { createActivity, getAllActivities } from "@/services/activity.service"

// GET /api/activities
export async function GET() {
  try {
    const activities = await getAllActivities()
    return NextResponse.json(activities)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/activities
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateActivitySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const activity = await createActivity(parsed.data)
    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

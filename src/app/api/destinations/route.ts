import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateDestinationSchema } from "@/schemas/create-destination.schema"
import { createDestination, getAllDestinations } from "@/services/destination.service"

// GET /api/destinations
export async function GET() {
  try {
    const destinations = await getAllDestinations()
    return NextResponse.json(destinations)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/destinations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateDestinationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const destination = await createDestination(parsed.data)
    return NextResponse.json(destination, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

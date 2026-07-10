import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreatePlaceSchema } from "@/schemas/create-place.schema"
import {
  createPlace,
  getAllPlaces,
  getPlacesByRegion,
} from "@/services/place.service"

// GET /api/places
// GET /api/places?regionId=<id>   ← optional filter by region
export async function GET(req: NextRequest) {
  try {
    const regionId = req.nextUrl.searchParams.get("regionId")

    const places = regionId
      ? await getPlacesByRegion(regionId)
      : await getAllPlaces()

    return NextResponse.json(places)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/places
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreatePlaceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const place = await createPlace(parsed.data)
    return NextResponse.json(place, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

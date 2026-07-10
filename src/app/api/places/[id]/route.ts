import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdatePlaceSchema } from "@/schemas/update-place.schema"
import {
  deletePlaceById,
  getPlaceById,
  updatePlaceById,
} from "@/services/place.service"

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/places/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const place = await getPlaceById(id)
    return NextResponse.json(place)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/places/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdatePlaceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const place = await updatePlaceById(id, parsed.data)
    return NextResponse.json(place)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/places/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const place = await deletePlaceById(id)
    return NextResponse.json(place)
  } catch (error) {
    return handleApiError(error)
  }
}

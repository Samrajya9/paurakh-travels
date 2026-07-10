import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateDestinationSchema } from "@/schemas/update-destination.schema"
import {
  deleteDestinationById,
  getDestinationById,
  updateDestinationById,
} from "@/services/destination.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/destinations/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const destination = await getDestinationById(id)
    return NextResponse.json(destination)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/destinations/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateDestinationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const destination = await updateDestinationById(id, parsed.data)
    return NextResponse.json(destination)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/destinations/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const destination = await deleteDestinationById(id)
    return NextResponse.json(destination)
  } catch (error) {
    return handleApiError(error)
  }
}

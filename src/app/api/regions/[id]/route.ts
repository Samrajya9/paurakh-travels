import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateRegionSchema } from "@/schemas/update-region.schema"
import {
  deleteRegionById,
  getRegionById,
  updateRegionById,
} from "@/services/region.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/regions/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const region = await getRegionById(id)
    return NextResponse.json(region)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/regions/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateRegionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const region = await updateRegionById(id, parsed.data)
    return NextResponse.json(region)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/regions/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const region = await deleteRegionById(id)
    return NextResponse.json(region)
  } catch (error) {
    return handleApiError(error)
  }
}

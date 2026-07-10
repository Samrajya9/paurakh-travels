import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateSeasonSchema } from "@/schemas/update-season.schema"
import {
  deleteSeasonById,
  getSeasonById,
  updateSeasonById,
} from "@/services/season.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/seasons/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const season = await getSeasonById(id)
    return NextResponse.json(season)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/seasons/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateSeasonSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const season = await updateSeasonById(id, parsed.data)
    return NextResponse.json(season)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/seasons/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const season = await deleteSeasonById(id)
    return NextResponse.json(season)
  } catch (error) {
    return handleApiError(error)
  }
}

import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateThemeSchema } from "@/schemas/update-theme.schema"
import {
  deleteThemeById,
  getThemeById,
  updateThemeById,
} from "@/services/theme.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/themes/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const theme = await getThemeById(id)
    return NextResponse.json(theme)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/themes/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateThemeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const theme = await updateThemeById(id, parsed.data)
    return NextResponse.json(theme)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/themes/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const theme = await deleteThemeById(id)
    return NextResponse.json(theme)
  } catch (error) {
    return handleApiError(error)
  }
}

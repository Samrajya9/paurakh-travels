import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateImageSchema } from "@/schemas/update-image.schema"
import {
  deleteImageById,
  getImageById,
  updateImageById,
} from "@/services/image.service"

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/images/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const image = await getImageById(id)
    return NextResponse.json(image)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/images/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateImageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const image = await updateImageById(id, parsed.data)
    return NextResponse.json(image)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/images/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const image = await deleteImageById(id)
    return NextResponse.json(image)
  } catch (error) {
    return handleApiError(error)
  }
}

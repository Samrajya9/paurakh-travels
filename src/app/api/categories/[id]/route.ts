import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateCategorySchema } from "@/schemas/update-category.schema"
import {
  deleteCategoryById,
  getCategoryById,
  updateCategoryById,
} from "@/services/category.service"

// Next.js 16: dynamic route params are async and must be awaited.
type RouteContext = { params: Promise<{ id: string }> }

// GET /api/categories/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const category = await getCategoryById(id)
    return NextResponse.json(category)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/categories/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const category = await updateCategoryById(id, parsed.data)
    return NextResponse.json(category)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/categories/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const category = await deleteCategoryById(id)
    return NextResponse.json(category)
  } catch (error) {
    return handleApiError(error)
  }
}

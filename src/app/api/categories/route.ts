import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateCategorySchema } from "@/schemas/create-category.schema"
import { createCategory, getAllCategories } from "@/services/category.service"

// GET /api/categories
export async function GET() {
  try {
    const categories = await getAllCategories()
    return NextResponse.json(categories)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/categories
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const category = await createCategory(parsed.data)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

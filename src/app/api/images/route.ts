import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateImageSchema } from "@/schemas/create-image.schema"
import { createImage, getAllImages } from "@/services/image.service"

// GET /api/images
// GET /api/images?search=<term>   ← optional filter by url/altText
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") ?? undefined
    const images = await getAllImages(search)
    return NextResponse.json(images)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/images
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateImageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const image = await createImage(parsed.data)
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { uploadFile } from "@/lib/upload"
import { UploadImageSchema } from "@/schemas/upload-image.schema"
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
// multipart/form-data: { file: File, altText?: string }
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const parsed = UploadImageSchema.safeParse({
      file: formData.get("file"),
      altText: formData.get("altText") || undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const { file, altText } = parsed.data
    const { url } = await uploadFile(file)

    const image = await createImage({ url, altText })
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

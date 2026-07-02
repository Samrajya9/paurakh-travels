import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateFaqSchema } from "@/schemas/update-faq.schema"
import {
  deleteFaqById,
  getFaqById,
  updateFaqById,
} from "@/services/faq.service"

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/faqs/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const faq = await getFaqById(id)
    return NextResponse.json(faq)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/faqs/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateFaqSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const faq = await updateFaqById(id, parsed.data)
    return NextResponse.json(faq)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/faqs/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const faq = await deleteFaqById(id)
    return NextResponse.json(faq)
  } catch (error) {
    return handleApiError(error)
  }
}

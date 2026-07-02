import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateFaqSchema } from "@/schemas/create-faq.schema"
import { createFaq, getAllFaqs } from "@/services/faq.service"

// GET /api/faqs
export async function GET() {
  try {
    const faqs = await getAllFaqs()
    return NextResponse.json(faqs)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/faqs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateFaqSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const faq = await createFaq(parsed.data)
    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

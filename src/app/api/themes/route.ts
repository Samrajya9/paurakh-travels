import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateThemeSchema } from "@/schemas/create-theme.schema"
import { createTheme, getAllThemes } from "@/services/theme.service"

// GET /api/themes
export async function GET() {
  try {
    const themes = await getAllThemes()
    return NextResponse.json(themes)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/themes
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateThemeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const theme = await createTheme(parsed.data)
    return NextResponse.json(theme, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateSeasonSchema } from "@/schemas/create-season.schema"
import { createSeason, getAllSeasons } from "@/services/season.service"

// GET /api/seasons
export async function GET() {
  try {
    const seasons = await getAllSeasons()
    return NextResponse.json(seasons)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/seasons
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateSeasonSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const season = await createSeason(parsed.data)
    return NextResponse.json(season, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

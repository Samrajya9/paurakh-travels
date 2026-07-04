import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateDifficultySchema } from "@/schemas/create-difficulty.schema"
import {
  createDifficulty,
  getAllDifficulties,
} from "@/services/difficulty.service"

// GET /api/difficulties
export async function GET() {
  try {
    const difficulties = await getAllDifficulties()
    return NextResponse.json(difficulties)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/difficulties
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateDifficultySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const difficulty = await createDifficulty(parsed.data)
    return NextResponse.json(difficulty, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

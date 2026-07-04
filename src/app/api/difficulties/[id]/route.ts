import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdateDifficultySchema } from "@/schemas/update-difficulty.schema"
import {
  deleteDifficultyById,
  getDifficultyById,
  updateDifficultyById,
} from "@/services/difficulty.service"

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/difficulties/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const difficulty = await getDifficultyById(id)
    return NextResponse.json(difficulty)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/difficulties/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdateDifficultySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const difficulty = await updateDifficultyById(id, parsed.data)
    return NextResponse.json(difficulty)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/difficulties/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const difficulty = await deleteDifficultyById(id)
    return NextResponse.json(difficulty)
  } catch (error) {
    return handleApiError(error)
  }
}

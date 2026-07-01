import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { UpdatePackageSchema } from "@/schemas/update-package.schema"
import {
  deletePackageById,
  getPackageById,
  updatePackageById,
} from "@/services/package.service"

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/packages/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const pkg = await getPackageById(id)
    return NextResponse.json(pkg)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/packages/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = UpdatePackageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const pkg = await updatePackageById(id, parsed.data)
    return NextResponse.json(pkg)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/packages/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const pkg = await deletePackageById(id)
    return NextResponse.json(pkg)
  } catch (error) {
    return handleApiError(error)
  }
}

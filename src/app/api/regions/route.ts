import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreateRegionSchema } from "@/schemas/create-region.schema"
import { createRegion, getAllRegions } from "@/services/region.service"

// GET /api/regions
export async function GET() {
  try {
    const regions = await getAllRegions()
    return NextResponse.json(regions)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/regions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateRegionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const region = await createRegion(parsed.data)
    return NextResponse.json(region, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

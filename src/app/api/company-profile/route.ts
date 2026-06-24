import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CompanyProfileCreateSchema } from "@/schemas/company-profile-create.schema"
import { CompanyProfileUpdateSchema } from "@/schemas/company-profile-update.schema"
import {
  createCompanyProfile,
  deleteCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} from "@/services/company-profile.service"

// GET /api/company-profile
export async function GET() {
  try {
    const profile = await getCompanyProfile()
    return NextResponse.json(profile)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/company-profile
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CompanyProfileCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const profile = await createCompanyProfile(parsed.data)
    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/company-profile
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CompanyProfileUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const profile = await updateCompanyProfile(parsed.data)
    return NextResponse.json(profile)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/company-profile
export async function DELETE() {
  try {
    const profile = await deleteCompanyProfile()
    return NextResponse.json(profile)
  } catch (error) {
    return handleApiError(error)
  }
}

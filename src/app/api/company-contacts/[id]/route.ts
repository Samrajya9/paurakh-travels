import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CompanyContactUpdateSchema } from "@/schemas/company-contacts-update.schema"
import {
  deleteCompanyContact,
  getCompanyContact,
  updateCompanyContact,
} from "@/services/company-contacts.service"

type RouteContext = { params: { id: string } }

// GET /api/company-contacts/[id]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const contact = await getCompanyContact(params.id)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/company-contacts/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const body = await req.json()
    const parsed = CompanyContactUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const contact = await updateCompanyContact(params.id, parsed.data)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/company-contacts/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const contact = await deleteCompanyContact(params.id)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CompanyContactUpdateSchema } from "@/schemas/company-contacts-update.schema"
import {
  deleteCompanyContact,
  getCompanyContact,
  updateCompanyContact,
} from "@/services/company-contacts.service"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}
// GET /api/company-contacts/[id]
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params

    const contact = await getCompanyContact(id)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/company-contacts/[id]
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
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

    const contact = await updateCompanyContact(id, parsed.data)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/company-contacts/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const contact = await deleteCompanyContact(id)
    return NextResponse.json(contact)
  } catch (error) {
    return handleApiError(error)
  }
}

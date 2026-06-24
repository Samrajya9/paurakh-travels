import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CompanyContactCreateSchema } from "@/schemas/company-contacts-create.schema"
import {
  createCompanyContact,
  listCompanyContacts,
} from "@/services/company-contacts.service"

// GET /api/company-contacts
export async function GET() {
  try {
    const contacts = await listCompanyContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/company-contacts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CompanyContactCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const contact = await createCompanyContact(parsed.data)
    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

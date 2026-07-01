import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreatePackageSchema } from "@/schemas/create-package.schema"
import { createPackage, getAllPackages } from "@/services/package.service"

export async function GET() {
  try {
    const packages = await getAllPackages()
    return NextResponse.json(packages)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreatePackageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const pkg = await createPackage(parsed.data)
    return NextResponse.json(pkg, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

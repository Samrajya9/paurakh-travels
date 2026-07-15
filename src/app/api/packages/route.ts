import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { CreatePackageSchema } from "@/schemas/create-package.schema"
import { createPackage, getAllPackages } from "@/services/package.service"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const packages = await getAllPackages({
      search: searchParams.get("q") ?? undefined,
      difficultyId: searchParams.get("difficultyId") ?? undefined,
      categoryId: searchParams.get("categoryId") ?? undefined,
      regionId: searchParams.get("regionId") ?? undefined,
      activityIds: searchParams.get("activityIds")?.split(",").filter(Boolean),
      themeIds: searchParams.get("themeIds")?.split(",").filter(Boolean),
      seasonIds: searchParams.get("seasonIds")?.split(",").filter(Boolean),
    })

    return NextResponse.json({ packages, total: packages.length })
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

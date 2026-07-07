import { handleApiError } from "@/lib/api-error-handler"
import { getPackageBySlug } from "@/services/package.service"
import { NextRequest, NextResponse } from "next/server"

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params
    const pkg = await getPackageBySlug(slug)
    return NextResponse.json(pkg)
  } catch (error) {
    return handleApiError(error)
  }
}

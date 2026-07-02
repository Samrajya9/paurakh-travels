import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { detachImageFromEntity } from "@/services/image-attachment.service"

type RouteContext = { params: Promise<{ id: string }> }

// DELETE /api/image-attachments/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const attachment = await detachImageFromEntity(id)
    return NextResponse.json(attachment)
  } catch (error) {
    return handleApiError(error)
  }
}

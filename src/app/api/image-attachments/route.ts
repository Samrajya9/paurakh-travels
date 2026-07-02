import { NextRequest, NextResponse } from "next/server"

import { handleApiError } from "@/lib/api-error-handler"
import { AppError } from "@/lib/errors"
import { EntityType } from "@/constants/enums/entity-type"
import { CreateImageAttachmentSchema } from "@/schemas/create-image-attachment.schema"
import {
  attachImageToEntity,
  getAttachmentsForEntity,
} from "@/services/image-attachment.service"

// GET /api/image-attachments?entityType=PACKAGE&entityId=<id>
export async function GET(req: NextRequest) {
  try {
    const entityType = req.nextUrl.searchParams.get("entityType")
    const entityId = req.nextUrl.searchParams.get("entityId")

    if (!entityType || !entityId) {
      throw new AppError("entityType and entityId are required.", 400)
    }

    if (!Object.values(EntityType).includes(entityType as EntityType)) {
      throw new AppError(`Invalid entityType "${entityType}".`, 400)
    }

    const attachments = await getAttachmentsForEntity(
      entityType as EntityType,
      entityId
    )
    return NextResponse.json(attachments)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/image-attachments
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateImageAttachmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const attachment = await attachImageToEntity(parsed.data)
    return NextResponse.json(attachment, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

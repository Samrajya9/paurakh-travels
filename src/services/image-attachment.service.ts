import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { EntityType } from "@/constants/enums/entity-type"
import type { CreateImageAttachmentInput } from "@/schemas/create-image-attachment.schema"
import { imageAttachmentSelect } from "@/types/image-attachment.type"

// ------------------------------------------------------------------ helpers

async function findAttachmentByIdOrThrow(id: string) {
  const attachment = await prismaClient.imageAttachment.findUnique({
    where: { id },
    select: imageAttachmentSelect,
  })

  if (!attachment) {
    throw new AppError(`Image attachment "${id}" not found.`, 404)
  }

  return attachment
}

function throwIfDuplicateAttachment(error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError("This image is already attached to this entity.", 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function attachImageToEntity(dto: CreateImageAttachmentInput) {
  try {
    return await prismaClient.imageAttachment.create({
      data: {
        imageId: dto.imageId,
        entityType: dto.entityType,
        entityId: dto.entityId,
      },
      select: imageAttachmentSelect,
    })
  } catch (error) {
    throwIfDuplicateAttachment(error)
  }
}
// add alongside the existing functions

export async function attachImagesToEntity(
  entityType: EntityType,
  entityId: string,
  imageIds: string[]
) {
  if (imageIds.length === 0) return []

  // skipDuplicates is supported on MySQL (compiles to INSERT ... IGNORE) —
  // unlike attachImageToEntity, a duplicate here is silently a no-op rather
  // than a 409, since this is "ensure these are attached," not "attach this
  // one specific thing."
  await prismaClient.imageAttachment.createMany({
    data: imageIds.map((imageId) => ({ imageId, entityType, entityId })),
    skipDuplicates: true,
  })

  return getAttachmentsForEntity(entityType, entityId)
}
// ----------------------------------------------------------------- findAll

export async function getAttachmentsForEntity(
  entityType: EntityType,
  entityId: string
) {
  return prismaClient.imageAttachment.findMany({
    where: { entityType, entityId },
    select: imageAttachmentSelect,
    orderBy: { createdAt: "asc" },
  })
}

// ------------------------------------------------------------------ remove

export async function detachImageFromEntity(id: string) {
  await findAttachmentByIdOrThrow(id)

  // Only removes the link. The Image row itself is untouched and stays
  // in the media library for reuse elsewhere — this is the "detach",
  // not a "delete image" operation.
  return prismaClient.imageAttachment.delete({
    where: { id },
    select: imageAttachmentSelect,
  })
}

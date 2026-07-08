import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateImageInput } from "@/schemas/create-image.schema"
import type { UpdateImageInput } from "@/schemas/update-image.schema"
import { clientEnv } from "@/env/client"

const imageSelect = {
  id: true,
  url: true,
  altText: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.ImageSelect

export type Image = PrismaClient.ImageGetPayload<{
  select: typeof imageSelect
}>

// ------------------------------------------------------------------ helpers

async function findImageByIdOrThrow(id: string) {
  const image = await prisma.image.findUnique({
    where: { id },
    select: imageSelect,
  })

  if (!image) {
    throw new AppError(`Image "${id}" not found.`, 404)
  }

  return image
}

// ------------------------------------------------------------------ create

export async function createImage(dto: CreateImageInput) {
  return prisma.image.create({
    data: {
      url: dto.url,
      altText: dto.altText,
    },
    select: imageSelect,
  })
}

// ----------------------------------------------------------------- findAll

export async function getAllImages(search?: string) {
  const images = await prisma.image.findMany({
    where: search
      ? {
          OR: [
            { altText: { contains: search } },
            { url: { contains: search } },
          ],
        }
      : undefined,
    select: imageSelect,
    orderBy: { createdAt: "desc" },
  })

  return images.map((image) => {
    return {
      ...image,
      url: `${clientEnv.NEXT_PUBLIC_IMAGE_BASE_URL}${image.url}`,
    }
  })
}

// ----------------------------------------------------------------- findOne

export async function getImageById(id: string) {
  return findImageByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateImageById(id: string, dto: UpdateImageInput) {
  await findImageByIdOrThrow(id)

  return prisma.image.update({
    where: { id },
    data: dto,
    select: imageSelect,
  })
}

// ------------------------------------------------------------------ remove

export async function deleteImageById(id: string) {
  await findImageByIdOrThrow(id)

  // ImageAttachment has onDelete: Cascade on the image relation, so
  // every entity currently displaying this image loses the link too —
  // that's a deliberate consequence of deleting from the media library,
  // not a bug.
  return prisma.image.delete({
    where: { id },
    select: imageSelect,
  })
}

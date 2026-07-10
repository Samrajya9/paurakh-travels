import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateDestinationInput } from "@/schemas/create-place.schema"
import type { UpdateDestinationInput } from "@/schemas/update-destination.schema"

const destinationSelect = {
  id: true,
  name: true,
  elevation: true,
  latitude: true,
  longitude: true,
  regionId: true,
  region: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.DestinationSelect

export type Destination = PrismaClient.DestinationGetPayload<{
  select: typeof destinationSelect
}>

// ------------------------------------------------------------------ helpers

async function findDestinationByIdOrThrow(id: string) {
  const destination = await prisma.destination.findUnique({
    where: { id },
    select: destinationSelect,
  })

  if (!destination) {
    throw new AppError(`Destination "${id}" not found.`, 404)
  }

  return destination
}

function throwIfDuplicateDestination(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(
      `A destination named "${name}" already exists in this region.`,
      409
    )
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createDestination(dto: CreateDestinationInput) {
  try {
    return await prisma.destination.create({
      data: {
        name: dto.name,
        elevation: dto.elevation,
        latitude: dto.latitude,
        longitude: dto.longitude,
        regionId: dto.regionId,
      },
      select: destinationSelect,
    })
  } catch (error) {
    throwIfDuplicateDestination(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllDestinations() {
  return prisma.destination.findMany({
    select: destinationSelect,
    orderBy: { name: "asc" },
  })
}

export async function getDestinationsByRegion(regionId: string) {
  return prisma.destination.findMany({
    where: { regionId },
    select: destinationSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getDestinationById(id: string) {
  return findDestinationByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateDestinationById(
  id: string,
  dto: UpdateDestinationInput
) {
  await findDestinationByIdOrThrow(id)

  try {
    return await prisma.destination.update({
      where: { id },
      data: dto,
      select: destinationSelect,
    })
  } catch (error) {
    throwIfDuplicateDestination(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteDestinationById(id: string) {
  await findDestinationByIdOrThrow(id)

  return prisma.destination.delete({
    where: { id },
    select: destinationSelect,
  })
}

import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateRegionInput } from "@/schemas/create-region.schema"
import type { UpdateRegionInput } from "@/schemas/update-region.schema"
import { regionSelect } from "@/types/region.type"

// ------------------------------------------------------------------ helpers

async function findRegionByIdOrThrow(id: string) {
  const region = await prismaClient.region.findUnique({
    where: { id },
    select: regionSelect,
  })

  if (!region) {
    throw new AppError(`Region "${id}" not found.`, 404)
  }

  return region
}

async function throwIfDestinationNotFound(destinationId: string) {
  const destination = await prismaClient.destination.findUnique({
    where: { id: destinationId },
  })

  if (!destination) {
    throw new AppError(`Destination "${destinationId}" not found.`, 404)
  }
}

function throwIfDuplicateRegionName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Region "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createRegion(dto: CreateRegionInput) {
  await throwIfDestinationNotFound(dto.destinationId)

  try {
    return await prismaClient.region.create({
      data: { name: dto.name, destinationId: dto.destinationId },
      select: regionSelect,
    })
  } catch (error) {
    throwIfDuplicateRegionName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllRegions() {
  return prismaClient.region.findMany({
    select: regionSelect,
    orderBy: { name: "asc" },
  })
}

export async function getRegionsByDestination(destinationId: string) {
  await throwIfDestinationNotFound(destinationId)

  return prismaClient.region.findMany({
    where: { destinationId },
    select: regionSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getRegionById(id: string) {
  return findRegionByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateRegionById(id: string, dto: UpdateRegionInput) {
  await findRegionByIdOrThrow(id)

  if (dto.destinationId) {
    await throwIfDestinationNotFound(dto.destinationId)
  }

  try {
    return await prismaClient.region.update({
      where: { id },
      data: dto,
      select: regionSelect,
    })
  } catch (error) {
    throwIfDuplicateRegionName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteRegionById(id: string) {
  await findRegionByIdOrThrow(id)

  return prismaClient.region.delete({
    where: { id },
  })
}

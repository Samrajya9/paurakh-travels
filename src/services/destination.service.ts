import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateDestinationInput } from "@/schemas/create-destination.schema"
import type { UpdateDestinationInput } from "@/schemas/update-destination.schema"
import { destinationSelect } from "@/types/destination.type"

// ------------------------------------------------------------------ helpers

async function findDestinationByIdOrThrow(id: string) {
  const destination = await prismaClient.destination.findUnique({
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
    throw new AppError(`Destination "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createDestination(dto: CreateDestinationInput) {
  try {
    return await prismaClient.destination.create({
      data: { name: dto.name },
      select: destinationSelect,
    })
  } catch (error) {
    throwIfDuplicateDestination(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllDestinations() {
  return prismaClient.destination.findMany({
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
    return await prismaClient.destination.update({
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

  return prismaClient.destination.delete({
    where: { id },
    select: destinationSelect,
  })
}

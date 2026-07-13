import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateItineraryInput } from "@/schemas/create-itinerary.schema"
import type { UpdateItineraryInput } from "@/schemas/update-itinerary.schema"
import { itinerarySelect } from "@/types/itinerary.type"

// ------------------------------------------------------------------ helpers

async function findItineraryByIdOrThrow(id: string) {
  const itinerary = await prismaClient.itinerary.findUnique({
    where: { id },
    select: itinerarySelect,
  })

  if (!itinerary) {
    throw new AppError(`Itinerary "${id}" not found.`, 404)
  }

  return itinerary
}

async function throwIfPackageNotFound(packageId: string) {
  const pkg = await prismaClient.package.findUnique({
    where: { id: packageId },
  })

  if (!pkg) {
    throw new AppError(`Package "${packageId}" not found.`, 404)
  }
}

function throwIfDuplicateItinerary(dayNumber: number, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(
      `An itinerary for day ${dayNumber} already exists in this package.`,
      409
    )
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createItinerary(dto: CreateItineraryInput) {
  await throwIfPackageNotFound(dto.packageId)

  try {
    return await prismaClient.itinerary.create({
      data: {
        packageId: dto.packageId,
        dayNumber: dto.dayNumber,
        title: dto.title,
        htmlDescription: dto.htmlDescription,
        distanceKm: dto.distanceKm,
        durationHours: dto.durationHours,
        // Nested write: creates the ItineraryPlace rows in the
        // same operation as the itinerary itself.
        places:
          dto.places && dto.places.length > 0
            ? {
                create: dto.places.map((p) => ({
                  placeId: p.placeId,
                  order: p.order,
                })),
              }
            : undefined,
      },
      select: itinerarySelect,
    })
  } catch (error) {
    throwIfDuplicateItinerary(dto.dayNumber, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllItineraries() {
  return prismaClient.itinerary.findMany({
    select: itinerarySelect,
    orderBy: [{ packageId: "asc" }, { dayNumber: "asc" }],
  })
}

export async function getItinerariesByPackageId(packageId: string) {
  await throwIfPackageNotFound(packageId)

  return prismaClient.itinerary.findMany({
    where: { packageId },
    select: itinerarySelect,
    orderBy: { dayNumber: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getItineraryById(id: string) {
  return findItineraryByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateItineraryById(
  id: string,
  dto: UpdateItineraryInput
) {
  const existing = await findItineraryByIdOrThrow(id)

  if (dto.packageId) {
    await throwIfPackageNotFound(dto.packageId)
  }

  try {
    return await prismaClient.itinerary.update({
      where: { id },
      data: {
        packageId: dto.packageId,
        dayNumber: dto.dayNumber,
        title: dto.title,
        htmlDescription: dto.htmlDescription,
        distanceKm: dto.distanceKm,
        durationHours: dto.durationHours,
        // Only touch places if the caller actually sent a new set.
        // Replaces the full list: wipe existing links, then recreate —
        // both happen inside Prisma's implicit nested-write transaction.
        places: dto.places
          ? {
              deleteMany: {},
              create: dto.places.map((p) => ({
                placeId: p.placeId,
                order: p.order,
              })),
            }
          : undefined,
      },
      select: itinerarySelect,
    })
  } catch (error) {
    throwIfDuplicateItinerary(dto.dayNumber ?? existing.dayNumber, error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteItineraryById(id: string) {
  await findItineraryByIdOrThrow(id)

  return prismaClient.itinerary.delete({
    where: { id },
    select: itinerarySelect,
  })
}

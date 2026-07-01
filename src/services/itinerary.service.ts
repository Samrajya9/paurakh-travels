import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateItineraryInput } from "@/schemas/create-itinerary.schema"
import type { UpdateItineraryInput } from "@/schemas/update-itinerary.schema"

const itinerarySelect = {
  id: true,
  packageId: true,
  package: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  dayNumber: true,
  title: true,
  htmlDescription: true,
  distanceKm: true,
  durationHours: true,
  destinations: {
    select: {
      id: true,
      destinationId: true,
      order: true,
      destination: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { order: "asc" },
  },
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.ItinerarySelect

export type Itinerary = PrismaClient.ItineraryGetPayload<{
  select: typeof itinerarySelect
}>

// ------------------------------------------------------------------ helpers

async function findItineraryByIdOrThrow(id: string) {
  const itinerary = await prisma.itinerary.findUnique({
    where: { id },
    select: itinerarySelect,
  })

  if (!itinerary) {
    throw new AppError(`Itinerary "${id}" not found.`, 404)
  }

  return itinerary
}

async function throwIfPackageNotFound(packageId: string) {
  const pkg = await prisma.package.findUnique({
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
    return await prisma.itinerary.create({
      data: {
        packageId: dto.packageId,
        dayNumber: dto.dayNumber,
        title: dto.title,
        htmlDescription: dto.htmlDescription,
        distanceKm: dto.distanceKm,
        durationHours: dto.durationHours,
      },
      select: itinerarySelect,
    })
  } catch (error) {
    throwIfDuplicateItinerary(dto.dayNumber, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllItineraries() {
  return prisma.itinerary.findMany({
    select: itinerarySelect,
    orderBy: [
      { packageId: "asc" },
      { dayNumber: "asc" },
    ],
  })
}

export async function getItinerariesByPackageId(packageId: string) {
  await throwIfPackageNotFound(packageId)

  return prisma.itinerary.findMany({
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
    return await prisma.itinerary.update({
      where: { id },
      data: {
        packageId: dto.packageId,
        dayNumber: dto.dayNumber,
        title: dto.title,
        htmlDescription: dto.htmlDescription,
        distanceKm: dto.distanceKm,
        durationHours: dto.durationHours,
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

  return prisma.itinerary.delete({
    where: { id },
    select: itinerarySelect,
  })
}

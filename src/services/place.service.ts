import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"

import { AppError } from "@/lib/errors"
import type { CreatePlaceInput } from "@/schemas/create-place.schema"
import type { UpdatePlaceInput } from "@/schemas/update-place.schema"

const placeSelect = {
  id: true,
  name: true,
  elevation: true,
  latitude: true,
  longitude: true,
  regionId: true,
  region: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.PlaceSelect

export type Place = PrismaClient.PlaceGetPayload<{
  select: typeof placeSelect
}>

// ------------------------------------------------------------------ helpers

async function findPlaceByIdOrThrow(id: string) {
  const place = await prismaClient.place.findUnique({
    where: { id },
    select: placeSelect,
  })

  if (!place) {
    throw new AppError(`Place "${id}" not found.`, 404)
  }

  return place
}

async function throwIfRegionNotFound(regionId: string) {
  const region = await prismaClient.region.findUnique({
    where: { id: regionId },
  })

  if (!region) {
    throw new AppError(`Region "${regionId}" not found.`, 404)
  }
}

function throwIfDuplicatePlace(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(
      `A place named "${name}" already exists in this region.`,
      409
    )
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createPlace(dto: CreatePlaceInput) {
  await throwIfRegionNotFound(dto.regionId)

  try {
    return await prismaClient.place.create({
      data: {
        name: dto.name,
        elevation: dto.elevation,
        latitude: dto.latitude,
        longitude: dto.longitude,
        regionId: dto.regionId,
      },
      select: placeSelect,
    })
  } catch (error) {
    throwIfDuplicatePlace(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllPlaces() {
  return prismaClient.place.findMany({
    select: placeSelect,
    orderBy: { name: "asc" },
  })
}

export async function getPlacesByRegion(regionId: string) {
  await throwIfRegionNotFound(regionId)

  return prismaClient.place.findMany({
    where: { regionId },
    select: placeSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getPlaceById(id: string) {
  return findPlaceByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updatePlaceById(id: string, dto: UpdatePlaceInput) {
  await findPlaceByIdOrThrow(id)

  if (dto.regionId) {
    await throwIfRegionNotFound(dto.regionId)
  }

  try {
    return await prismaClient.place.update({
      where: { id },
      data: dto,
      select: placeSelect,
    })
  } catch (error) {
    throwIfDuplicatePlace(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deletePlaceById(id: string) {
  await findPlaceByIdOrThrow(id)

  return prismaClient.place.delete({
    where: { id },
    select: placeSelect,
  })
}

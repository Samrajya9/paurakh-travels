import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateSeasonInput } from "@/schemas/create-season.schema"
import type { UpdateSeasonInput } from "@/schemas/update-season.schema"

const seasonSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.SeasonSelect

export type Season = PrismaClient.SeasonGetPayload<{
  select: typeof seasonSelect
}>

// ------------------------------------------------------------------ helpers

async function findSeasonByIdOrThrow(id: string) {
  const season = await prisma.season.findUnique({
    where: { id },
    select: seasonSelect,
  })

  if (!season) {
    throw new AppError(`Season "${id}" not found.`, 404)
  }

  return season
}

function throwIfDuplicateSeasonName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Season "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createSeason(dto: CreateSeasonInput) {
  try {
    return await prisma.season.create({
      data: { name: dto.name },
      select: seasonSelect,
    })
  } catch (error) {
    throwIfDuplicateSeasonName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllSeasons() {
  return prisma.season.findMany({
    select: seasonSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getSeasonById(id: string) {
  return findSeasonByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateSeasonById(id: string, dto: UpdateSeasonInput) {
  await findSeasonByIdOrThrow(id)

  try {
    return await prisma.season.update({
      where: { id },
      data: dto,
      select: seasonSelect,
    })
  } catch (error) {
    throwIfDuplicateSeasonName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteSeasonById(id: string) {
  await findSeasonByIdOrThrow(id)

  return prisma.season.delete({
    where: { id },
    select: seasonSelect,
  })
}

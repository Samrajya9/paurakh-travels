import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateDifficultyInput } from "@/schemas/create-difficulty.schema"
import type { UpdateDifficultyInput } from "@/schemas/update-difficulty.schema"

const difficultySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.DifficultySelect

export type Difficulty = PrismaClient.DifficultyGetPayload<{
  select: typeof difficultySelect
}>

// ------------------------------------------------------------------ helpers

async function findDifficultyByIdOrThrow(id: string) {
  const difficulty = await prisma.difficulty.findUnique({
    where: { id },
    select: difficultySelect,
  })

  if (!difficulty) {
    throw new AppError(`Difficulty "${id}" not found.`, 404)
  }

  return difficulty
}

function throwIfDuplicateDifficultyName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Difficulty "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createDifficulty(dto: CreateDifficultyInput) {
  try {
    return await prisma.difficulty.create({
      data: { name: dto.name },
      select: difficultySelect,
    })
  } catch (error) {
    throwIfDuplicateDifficultyName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllDifficulties() {
  return prisma.difficulty.findMany({
    select: difficultySelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getDifficultyById(id: string) {
  return findDifficultyByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateDifficultyById(
  id: string,
  dto: UpdateDifficultyInput
) {
  await findDifficultyByIdOrThrow(id)

  try {
    return await prisma.difficulty.update({
      where: { id },
      data: dto,
      select: difficultySelect,
    })
  } catch (error) {
    throwIfDuplicateDifficultyName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteDifficultyById(id: string) {
  await findDifficultyByIdOrThrow(id)

  return prisma.difficulty.delete({
    where: { id },
    select: difficultySelect,
  })
}

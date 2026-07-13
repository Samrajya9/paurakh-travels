import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"

import { AppError } from "@/lib/errors"
import type { CreateThemeInput } from "@/schemas/create-theme.schema"
import type { UpdateThemeInput } from "@/schemas/update-theme.schema"
import { themeSelect } from "@/types/theme.type"

// ------------------------------------------------------------------ helpers

async function findThemeByIdOrThrow(id: string) {
  const theme = await prismaClient.theme.findUnique({
    where: { id },
    select: themeSelect,
  })

  if (!theme) {
    throw new AppError(`Theme "${id}" not found.`, 404)
  }

  return theme
}

function throwIfDuplicateThemeName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Theme "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createTheme(dto: CreateThemeInput) {
  try {
    return await prismaClient.theme.create({
      data: { name: dto.name },
      select: themeSelect,
    })
  } catch (error) {
    throwIfDuplicateThemeName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllThemes() {
  return prismaClient.theme.findMany({
    select: themeSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getThemeById(id: string) {
  return findThemeByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateThemeById(id: string, dto: UpdateThemeInput) {
  await findThemeByIdOrThrow(id)

  try {
    return await prismaClient.theme.update({
      where: { id },
      data: dto,
      select: themeSelect,
    })
  } catch (error) {
    throwIfDuplicateThemeName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteThemeById(id: string) {
  await findThemeByIdOrThrow(id)

  return prismaClient.theme.delete({
    where: { id },
    select: themeSelect,
  })
}

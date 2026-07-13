import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateCategoryInput } from "@/schemas/create-category.schema"
import type { UpdateCategoryInput } from "@/schemas/update-category.schema"

const categorySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.CategorySelect

export type Category = PrismaClient.CategoryGetPayload<{
  select: typeof categorySelect
}>

// ------------------------------------------------------------------ helpers

async function findCategoryByIdOrThrow(id: string) {
  const category = await prismaClient.category.findUnique({
    where: { id },
    select: categorySelect,
  })

  if (!category) {
    throw new AppError(`Category "${id}" not found.`, 404)
  }

  return category
}

function throwIfDuplicateCategoryName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Category "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createCategory(dto: CreateCategoryInput) {
  try {
    return await prismaClient.category.create({
      data: { name: dto.name },
      select: categorySelect,
    })
  } catch (error) {
    throwIfDuplicateCategoryName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllCategories() {
  return prismaClient.category.findMany({
    select: categorySelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getCategoryById(id: string) {
  return findCategoryByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateCategoryById(id: string, dto: UpdateCategoryInput) {
  await findCategoryByIdOrThrow(id)

  try {
    return await prismaClient.category.update({
      where: { id },
      data: dto,
      select: categorySelect,
    })
  } catch (error) {
    throwIfDuplicateCategoryName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteCategoryById(id: string) {
  await findCategoryByIdOrThrow(id)

  return prismaClient.category.delete({
    where: { id },
    select: categorySelect,
  })
}

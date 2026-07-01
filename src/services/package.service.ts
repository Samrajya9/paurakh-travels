import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import type { UpdatePackageInput } from "@/schemas/update-package.schema"

const packageSelect = {
  id: true,
  slug: true,
  name: true,
  html_overview: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.PackageSelect

export type Package = PrismaClient.PackageGetPayload<{
  select: typeof packageSelect
}>

// ------------------------------------------------------------------ helpers

async function findPackageByIdOrThrow(id: string) {
  const pkg = await prisma.package.findUnique({
    where: { id },
    select: packageSelect,
  })

  if (!pkg) {
    throw new AppError(`Package "${id}" not found.`, 404)
  }

  return pkg
}

function throwIfDuplicatePackageSlug(slug: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Package with slug "${slug}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createPackage(dto: CreatePackageInput) {
  try {
    return await prisma.package.create({
      data: {
        slug: dto.slug,
        name: dto.name,
        html_overview: dto.html_overview,
      },
      select: packageSelect,
    })
  } catch (error) {
    throwIfDuplicatePackageSlug(dto.slug, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllPackages() {
  return prisma.package.findMany({
    select: packageSelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getPackageById(id: string) {
  return findPackageByIdOrThrow(id)
}

export async function getPackageBySlug(slug: string) {
  const pkg = await prisma.package.findUnique({
    where: { slug },
    select: packageSelect,
  })

  if (!pkg) {
    throw new AppError(`Package "${slug}" not found.`, 404)
  }

  return pkg
}

// ------------------------------------------------------------------ update

export async function updatePackageById(id: string, dto: UpdatePackageInput) {
  await findPackageByIdOrThrow(id)

  try {
    return await prisma.package.update({
      where: { id },
      data: dto,
      select: packageSelect,
    })
  } catch (error) {
    throwIfDuplicatePackageSlug(dto.slug ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deletePackageById(id: string) {
  await findPackageByIdOrThrow(id)

  return prisma.package.delete({
    where: { id },
    select: packageSelect,
  })
}

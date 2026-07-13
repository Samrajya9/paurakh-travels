import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateActivityInput } from "@/schemas/create-activity.schema"
import type { UpdateActivityInput } from "@/schemas/update-activity.schema"
import { activitySelect } from "@/types/activity.type"

// ------------------------------------------------------------------ helpers

async function findActivityByIdOrThrow(id: string) {
  const activity = await prismaClient.activity.findUnique({
    where: { id },
    select: activitySelect,
  })

  if (!activity) {
    throw new AppError(`Activity "${id}" not found.`, 404)
  }

  return activity
}

function throwIfDuplicateActivityName(name: string, error: unknown): never {
  if (
    error instanceof PrismaClient.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError(`Activity "${name}" already exists.`, 409)
  }

  throw error
}

// ------------------------------------------------------------------ create

export async function createActivity(dto: CreateActivityInput) {
  try {
    return await prismaClient.activity.create({
      data: { name: dto.name },
      select: activitySelect,
    })
  } catch (error) {
    throwIfDuplicateActivityName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllActivities() {
  return prismaClient.activity.findMany({
    select: activitySelect,
    orderBy: { name: "asc" },
  })
}

// ----------------------------------------------------------------- findOne

export async function getActivityById(id: string) {
  return findActivityByIdOrThrow(id)
}

// ------------------------------------------------------------------ update

export async function updateActivityById(id: string, dto: UpdateActivityInput) {
  await findActivityByIdOrThrow(id)

  try {
    return await prismaClient.activity.update({
      where: { id },
      data: dto,
      select: activitySelect,
    })
  } catch (error) {
    throwIfDuplicateActivityName(dto.name ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deleteActivityById(id: string) {
  await findActivityByIdOrThrow(id)

  return prismaClient.activity.delete({
    where: { id },
    select: activitySelect,
  })
}

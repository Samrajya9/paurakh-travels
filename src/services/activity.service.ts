import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CreateActivityInput } from "@/schemas/create-activity.schema"
import type { UpdateActivityInput } from "@/schemas/update-activity.schema"

const activitySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.ActivitySelect

export type Activity = PrismaClient.ActivityGetPayload<{
  select: typeof activitySelect
}>

// ------------------------------------------------------------------ helpers

async function findActivityByIdOrThrow(id: string) {
  const activity = await prisma.activity.findUnique({
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
    return await prisma.activity.create({
      data: { name: dto.name },
      select: activitySelect,
    })
  } catch (error) {
    throwIfDuplicateActivityName(dto.name, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllActivities() {
  return prisma.activity.findMany({
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
    return await prisma.activity.update({
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

  return prisma.activity.delete({
    where: { id },
    select: activitySelect,
  })
}

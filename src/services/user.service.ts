import { Prisma as PrismaClient, UserType } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { UserSchema } from "@/types/users.type"

export type CreateUserInput = Omit<UserSchema, "user_type"> & {
  user_type?: UserType
}

export type UpdateUserInput = Partial<UserSchema>

const userSelect = {
  id: true,
  email: true,
  user_type: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.UserSelect

export async function listUsers() {
  return prismaClient.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: userSelect,
  })
}

export async function getUserById(id: string) {
  return prismaClient.user.findUnique({
    where: {
      id,
    },
    select: userSelect,
  })
}

export async function getUserByEmail(email: string) {
  return prismaClient.user.findUnique({
    where: {
      email,
    },
    select: userSelect,
  })
}
export async function getUserPasswordByEmail(email: string) {
  return prismaClient.user.findUnique({
    where: { email },
    select: { password: true },
  })
}

export async function createUser({
  email,
  password,
  user_type = UserType.CUSTOMER,
}: CreateUserInput) {
  return prismaClient.user.create({
    data: {
      email,
      password,
      user_type,
    },
    select: userSelect,
  })
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const data: PrismaClient.UserUpdateInput = {}

  if (input.email !== undefined) {
    data.email = input.email
  }

  if (input.password !== undefined) {
    data.password = input.password
  }

  if (input.user_type !== undefined) {
    data.user_type = input.user_type
  }

  return prismaClient.user.update({
    where: {
      id,
    },
    data,
    select: userSelect,
  })
}

export async function deleteUser(id: string) {
  return prismaClient.user.delete({
    where: {
      id,
    },
    select: userSelect,
  })
}

import { Prisma, UserType } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { UserSchema } from "@/types/users.type"

const userSelect = {
  id: true,
  email: true,
  user_type: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UsersSelect

export async function listUsers() {
  return prisma.users.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: userSelect,
  })
}

export async function getUserById(id: string) {
  return prisma.users.findUnique({
    where: {
      id,
    },
    select: userSelect,
  })
}

export async function createUser({
  email,
  password,
  user_type = UserType.CUSTOMER,
}: UserSchema) {
  return prisma.users.create({
    data: {
      email,
      password,
      user_type,
    },
    select: userSelect,
  })
}

export async function updateUser(id: string, input: Partial<UserSchema>) {
  const data: Prisma.UsersUpdateInput = {}

  if (input.email !== undefined) {
    data.email = input.email
  }

  if (input.password !== undefined) {
    data.password = input.password
  }

  if (input.user_type !== undefined) {
    data.user_type = input.user_type
  }

  return prisma.users.update({
    where: {
      id,
    },
    data,
    select: userSelect,
  })
}

export async function deleteUser(id: string) {
  return prisma.users.delete({
    where: {
      id,
    },
    select: userSelect,
  })
}

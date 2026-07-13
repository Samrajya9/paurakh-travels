import { Prisma } from "@prisma/client"
import prismaClient from "@/lib/prisma"
import {
  createUserPackageLikeSchema,
  type CreateUserPackageLikeInput,
} from "@/schemas/create-user-package-like.schema"
import { userPackageLikeSelect } from "@/types/user-package-like.type"

export async function throwIfAlreadyLiked(userId: string, packageId: string) {
  const existing = await prismaClient.userPackageLike.findUnique({
    where: {
      userId_packageId: {
        userId,
        packageId,
      },
    },
  })

  if (existing) {
    throw new Error("Package is already liked by this user")
  }
}

/**
 * Returns all package ids the given user has liked.
 */
export async function getAllLikedPackageIdsForUser(userId: string) {
  const likes = await prismaClient.userPackageLike.findMany({
    where: { userId },
    select: { packageId: true },
  })

  return likes.map((like) => like.packageId)
}

/**
 * Adds a package_id to the user's liked list.
 */
export async function addPackageLike(input: CreateUserPackageLikeInput) {
  const data = createUserPackageLikeSchema.parse(input)

  await throwIfAlreadyLiked(data.userId, data.packageId)

  return prismaClient.userPackageLike.create({
    data,
    select: userPackageLikeSelect,
  })
}

/**
 * Removes a package_id from the user's liked list.
 */
export async function removePackageLike(userId: string, packageId: string) {
  return prismaClient.userPackageLike.delete({
    where: {
      userId_packageId: {
        userId,
        packageId,
      },
    },
  })
}

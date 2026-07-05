import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import { createItinerary } from "@/services/itinerary.service"
import { createFaq } from "@/services/faq.service"
import {
  getAttachmentsForEntity,
  type ImageAttachment,
} from "@/services/image-attachment.service"
import { EntityType } from "@/constants/enums/entity-type"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import type { UpdatePackageInput } from "@/schemas/update-package.schema"

const packageSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  htmlOverview: true,
  basePrice: true,
  difficultyId: true,
  difficulty: {
    select: {
      id: true,
      name: true,
    },
  },
  groupDiscounts: {
    select: {
      id: true,
      minPeople: true,
      price: true,
    },
    orderBy: { minPeople: "asc" },
  },
  itineraries: {
    select: {
      id: true,
      dayNumber: true,
      title: true,
      htmlDescription: true,
      distanceKm: true,
      durationHours: true,
      destinations: {
        select: {
          id: true,
          destinationId: true,
          order: true,
          destination: {
            select: {
              id: true,
              name: true,
              elevation: true,
              latitude: true,
              longitude: true,
              region: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { dayNumber: "asc" },
  },
  faqs: {
    select: {
      id: true,
      order: true,
      faq: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
    orderBy: { order: "asc" },
  },
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.PackageSelect

export type Package = PrismaClient.PackageGetPayload<{
  select: typeof packageSelect
}>

// Package has no direct Prisma relation to ImageAttachment (the link is
// polymorphic via entityType/entityId), so "images" can't be part of
// packageSelect — it's fetched separately and merged on here.
export type PackageWithImages = Package & { images: ImageAttachment[] }

// ------------------------------------------------------------------ helpers

async function findPackageByIdOrThrow(id: string) {
  const pkg = await prisma.package.findUnique({
    where: { id },
    select: packageSelect,
  })

  if (!pkg) {
    throw new AppError(`Package "${id}" not found.`, 404)
  }
  const images = await getAttachmentsForEntity(EntityType.PACKAGE, pkg.id)

  return { ...pkg, images }
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

// Creates each FAQ, then links it to the package via PackageFaq,
// preserving array order.
async function attachFaqsToPackage(
  packageId: string,
  faqs: NonNullable<CreatePackageInput["faqs"]>
) {
  await Promise.all(
    faqs.map(async (faq, index) => {
      const createdFaq = await createFaq(faq)
      return prisma.packageFaq.create({
        data: {
          packageId,
          faqId: createdFaq.id,
          order: index,
        },
      })
    })
  )
}

// Full replace, not merge: wipes existing tiers for the package and
// recreates from the submitted array. This is deliberate — group
// discounts support edit/delete of individual tiers, so an append-only
// approach (like itineraries/faqs use) would leave stale rows behind
// every time a tier is removed or its price changes.
async function replaceGroupDiscountsForPackage(
  packageId: string,
  groupDiscounts: NonNullable<CreatePackageInput["groupDiscounts"]>
) {
  await prisma.packageGroupDiscount.deleteMany({ where: { packageId } })

  if (groupDiscounts.length === 0) return

  await prisma.packageGroupDiscount.createMany({
    data: groupDiscounts.map((discount) => ({
      packageId,
      minPeople: discount.minPeople,
      price: discount.price,
    })),
  })
}

// ------------------------------------------------------------------ create

export async function createPackage(dto: CreatePackageInput) {
  const { itineraries, faqs, groupDiscounts, ...packageData } = dto

  try {
    // 1. Create the package
    const pkg = await prisma.package.create({
      data: {
        slug: packageData.slug,
        name: packageData.name,
        description: packageData.description,
        htmlOverview: packageData.htmlOverview,
        basePrice: packageData.basePrice,
        difficultyId: packageData.difficultyId,
      },
      select: { id: true },
    })

    // 2. Delegate itinerary creation to itinerary.service,
    //    injecting the newly created packageId into each entry
    if (itineraries.length > 0) {
      await Promise.all(
        itineraries.map((itinerary) =>
          createItinerary({ ...itinerary, packageId: pkg.id })
        )
      )
    }

    // 3. If faqs are provided, create them and link via PackageFaq
    if (faqs && faqs.length > 0) {
      await attachFaqsToPackage(pkg.id, faqs)
    }

    // 4. If group discount tiers are provided, create them
    if (groupDiscounts) {
      await replaceGroupDiscountsForPackage(pkg.id, groupDiscounts)
    }

    // 5. Return the full package with itineraries + faqs + discounts attached
    return findPackageByIdOrThrow(pkg.id)
  } catch (error) {
    throwIfDuplicatePackageSlug(packageData.slug, error)
  }
}

// ----------------------------------------------------------------- findAll

export async function getAllPackages(): Promise<PackageWithImages[]> {
  const packages = await prisma.package.findMany({
    select: packageSelect,
    orderBy: { name: "asc" },
  })

  return Promise.all(
    packages.map(async (pkg) => ({
      ...pkg,
      images: await getAttachmentsForEntity(EntityType.PACKAGE, pkg.id),
    }))
  )
}

// ----------------------------------------------------------------- findOne

export async function getPackageById(id: string) {
  return findPackageByIdOrThrow(id)
}

export async function getPackageBySlug(
  slug: string
): Promise<PackageWithImages> {
  const pkg = await prisma.package.findUnique({
    where: { slug },
    select: packageSelect,
  })

  if (!pkg) {
    throw new AppError(`Package "${slug}" not found.`, 404)
  }

  const images = await getAttachmentsForEntity(EntityType.PACKAGE, pkg.id)

  return { ...pkg, images }
}

// ------------------------------------------------------------------ update

export async function updatePackageById(id: string, dto: UpdatePackageInput) {
  await findPackageByIdOrThrow(id)

  const { itineraries, faqs, groupDiscounts, ...packageData } = dto

  try {
    await prisma.package.update({
      where: { id },
      data: packageData,
      select: { id: true },
    })

    if (itineraries && itineraries.length > 0) {
      await Promise.all(
        itineraries.map((itinerary) =>
          createItinerary({ ...itinerary, packageId: id })
        )
      )
    }

    if (faqs && faqs.length > 0) {
      await attachFaqsToPackage(id, faqs)
    }

    // Only touch group discounts if the caller actually sent the key.
    // groupDiscounts: [] means "delete all tiers" — that's a valid,
    // intentional state, not "nothing was sent".
    if (groupDiscounts !== undefined) {
      await replaceGroupDiscountsForPackage(id, groupDiscounts)
    }

    return findPackageByIdOrThrow(id)
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

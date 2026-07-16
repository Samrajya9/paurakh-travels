import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import { createItinerary } from "@/services/itinerary.service"
import { createFaq } from "@/services/faq.service"
import {
  attachImagesToEntity,
  attachImageToEntity,
  getAttachmentsForEntity,
} from "@/services/image-attachment.service"
import { EntityType } from "@/constants/enums/entity-type"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import type { UpdatePackageInput } from "@/schemas/update-package.schema"
import { Package, PackageListResult, packageSelect } from "@/types/package.type"

// ------------------------------------------------------------------ helpers

async function findPackageByIdOrThrow(id: string) {
  const pkg = await prismaClient.package.findUnique({
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
      return prismaClient.packageFaq.create({
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
  await prismaClient.packageGroupDiscount.deleteMany({ where: { packageId } })

  if (groupDiscounts.length === 0) return

  await prismaClient.packageGroupDiscount.createMany({
    data: groupDiscounts.map((discount) => ({
      packageId,
      minPeople: discount.minPeople,
      price: discount.price,
    })),
  })
}

// Full replace, not merge — same rationale as replaceGroupDiscountsForPackage:
// these tag-style associations support add/remove of individual entries, so
// wiping and recreating from the submitted array avoids leaving stale rows
// behind when an id is removed.
async function replaceActivitiesForPackage(
  packageId: string,
  activityIds: string[]
) {
  await prismaClient.packageActivity.deleteMany({ where: { packageId } })

  if (activityIds.length === 0) return

  await prismaClient.packageActivity.createMany({
    data: activityIds.map((activityId) => ({ packageId, activityId })),
  })
}

async function replaceImagesForPackage(packageId: string, imageIds: string[]) {
  // Direct deleteMany rather than looping detachImageFromEntity — that
  // function expects attachment ids (not image ids) and enforces
  // one-at-a-time existence checks, which is right for a single explicit
  // "remove this image" click but wasteful for a full wipe-and-recreate.
  await prismaClient.imageAttachment.deleteMany({
    where: { entityType: EntityType.PACKAGE, entityId: packageId },
  })

  if (imageIds.length === 0) return

  await attachImagesToEntity(EntityType.PACKAGE, packageId, imageIds)
}

async function replaceSeasonsForPackage(
  packageId: string,
  seasonIds: string[]
) {
  await prismaClient.packageSeason.deleteMany({ where: { packageId } })

  if (seasonIds.length === 0) return

  await prismaClient.packageSeason.createMany({
    data: seasonIds.map((seasonId) => ({ packageId, seasonId })),
  })
}

async function replaceThemesForPackage(packageId: string, themeIds: string[]) {
  await prismaClient.packageTheme.deleteMany({ where: { packageId } })

  if (themeIds.length === 0) return

  await prismaClient.packageTheme.createMany({
    data: themeIds.map((themeId) => ({ packageId, themeId })),
  })
}

async function replaceRegionsForPackage(
  packageId: string,
  regionIds: string[]
) {
  await prismaClient.packageRegion.deleteMany({ where: { packageId } })

  if (regionIds.length === 0) return

  await prismaClient.packageRegion.createMany({
    data: regionIds.map((regionId) => ({ packageId, regionId })),
  })
}

// ------------------------------------------------------------------ create

export async function createPackage(dto: CreatePackageInput) {
  const {
    itineraries,
    faqs,
    groupDiscounts,
    imageIds,
    activityIds,
    seasonIds,
    themeIds,
    regionIds, // ← added
    ...packageData
  } = dto

  try {
    // 1. Create the package
    const pkg = await prismaClient.package.create({
      data: {
        slug: packageData.slug,
        name: packageData.name,
        description: packageData.description,
        htmlOverview: packageData.htmlOverview,
        basePrice: packageData.basePrice,
        difficultyId: packageData.difficultyId,
        categoryId: packageData.categoryId,
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

    // 4b. Tag-style associations — activities, seasons, themes
    if (activityIds) {
      await replaceActivitiesForPackage(pkg.id, activityIds)
    }

    if (seasonIds) {
      await replaceSeasonsForPackage(pkg.id, seasonIds)
    }

    if (themeIds) {
      await replaceThemesForPackage(pkg.id, themeIds)
    }

    if (regionIds) {
      await replaceRegionsForPackage(pkg.id, regionIds)
    }

    if (imageIds && imageIds.length > 0) {
      await attachImagesToEntity(EntityType.PACKAGE, pkg.id, imageIds)
    }

    // 5. Return the full package with itineraries + faqs + discounts attached
    return findPackageByIdOrThrow(pkg.id)
  } catch (error) {
    throwIfDuplicatePackageSlug(packageData.slug, error)
  }
}

// ----------------------------------------------------------------- findAll

export interface GetAllPackagesOptions {
  search?: string
  difficultyId?: string
  categoryId?: string
  regionIds?: string[] // ← was regionId?: string
  activityIds?: string[]
  themeIds?: string[]
  seasonIds?: string[]
  page?: number
  limit?: number
}

export async function getAllPackages(
  options: GetAllPackagesOptions = {}
): Promise<PackageListResult> {
  const {
    search,
    difficultyId,
    categoryId,
    regionIds,
    activityIds,
    themeIds,
    seasonIds,
    page = 1,
    limit = 12,
  } = options

  const where = {
    ...(search && { name: { contains: search } }),
    ...(difficultyId && { difficultyId }),
    ...(categoryId && { categoryId }),
    ...(regionIds &&
      regionIds.length > 0 && {
        regions: { some: { regionId: { in: regionIds } } },
      }),
    ...(activityIds &&
      activityIds.length > 0 && {
        activities: { some: { activityId: { in: activityIds } } },
      }),
    ...(themeIds &&
      themeIds.length > 0 && {
        themes: { some: { themeId: { in: themeIds } } },
      }),
    ...(seasonIds &&
      seasonIds.length > 0 && {
        seasons: { some: { seasonId: { in: seasonIds } } },
      }),
  } satisfies PrismaClient.PackageWhereInput

  const [packages, total] = await prismaClient.$transaction([
    prismaClient.package.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
      select: packageSelect,
    }),
    prismaClient.package.count({
      where,
    }),
  ])

  const result = await Promise.all(
    packages.map(async (pkg) => {
      let maxElevation = 0

      for (const itinerary of pkg.itineraries) {
        for (const itineraryPlace of itinerary.places) {
          if (itineraryPlace.place.elevation > maxElevation) {
            maxElevation = itineraryPlace.place.elevation
          }
        }
      }

      let minPrice = pkg.basePrice

      if (pkg.groupDiscounts.length > 0) {
        minPrice = pkg.groupDiscounts[0].price

        for (const discount of pkg.groupDiscounts) {
          // Decimal comparisons must use .lessThan()
          if (discount.price.lessThan(minPrice)) {
            minPrice = discount.price
          }
        }
      }

      return {
        id: pkg.id,
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        basePrice: Number(pkg.basePrice),
        difficultyId: pkg.difficultyId,
        difficulty: pkg.difficulty,
        images: await getAttachmentsForEntity(EntityType.PACKAGE, pkg.id),
        metaData: {
          totalDuration: pkg.itineraries.length,
          maxElevation,
          minPrice: Number(minPrice),
        },
      }
    })
  )

  return {
    packages: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export async function getPackageById(id: string) {
  return findPackageByIdOrThrow(id)
}

export async function getPackageBySlug(slug: string): Promise<Package> {
  const pkg = await prismaClient.package.findUnique({
    where: { slug },
    select: packageSelect,
  })

  if (!pkg) {
    throw new AppError(`Package "${slug}" not found.`, 404)
  }
  let maxElevation = 0

  for (const itinerary of pkg.itineraries) {
    for (const itineraryPlace of itinerary.places) {
      if (itineraryPlace.place.elevation > maxElevation) {
        maxElevation = itineraryPlace.place.elevation
      }
    }
  }

  let minPrice = pkg.basePrice

  if (pkg.groupDiscounts.length > 0) {
    minPrice = pkg.groupDiscounts[0].price

    for (const discount of pkg.groupDiscounts) {
      // Decimal comparisons must use .lessThan()
      if (discount.price.lessThan(minPrice)) {
        minPrice = discount.price
      }
    }
  }

  const images = await getAttachmentsForEntity(EntityType.PACKAGE, pkg.id)

  return {
    ...pkg,
    basePrice: Number(pkg.basePrice),
    groupDiscounts: pkg.groupDiscounts.map((discount) => {
      return {
        ...discount,
        price: Number(discount.price),
      }
    }),
    images,
    metaData: {
      totalDuration: pkg.itineraries.length,
      maxElevation,
      minPrice: Number(minPrice),
    },
  }
}

// ------------------------------------------------------------------ update

export async function updatePackageById(id: string, dto: UpdatePackageInput) {
  await findPackageByIdOrThrow(id)

  const {
    itineraries,
    faqs,
    groupDiscounts,
    imageIds,
    activityIds,
    seasonIds,
    themeIds,
    regionIds, // ← added
    ...packageData
  } = dto

  try {
    await prismaClient.package.update({
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

    // Same "key present means intentional" rule for the tag-style
    // associations — an empty array means "clear them all".
    if (activityIds !== undefined) {
      await replaceActivitiesForPackage(id, activityIds)
    }

    if (seasonIds !== undefined) {
      await replaceSeasonsForPackage(id, seasonIds)
    }

    if (themeIds !== undefined) {
      await replaceThemesForPackage(id, themeIds)
    }

    if (regionIds !== undefined) {
      await replaceRegionsForPackage(id, regionIds)
    }
    if (imageIds !== undefined) {
      await replaceImagesForPackage(id, imageIds)
    }

    return findPackageByIdOrThrow(id)
  } catch (error) {
    throwIfDuplicatePackageSlug(dto.slug ?? "", error)
  }
}

// ------------------------------------------------------------------ remove

export async function deletePackageById(id: string) {
  await findPackageByIdOrThrow(id)

  return prismaClient.package.delete({
    where: { id },
    select: packageSelect,
  })
}

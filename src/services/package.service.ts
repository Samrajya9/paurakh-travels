import { Prisma as PrismaClient } from "@prisma/client"

import prisma from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import { createItinerary } from "@/services/itinerary.service"
import { createFaq } from "@/services/faq.service"
import type { CreatePackageInput } from "@/schemas/create-package.schema"
import type { UpdatePackageInput } from "@/schemas/update-package.schema"

const packageSelect = {
  id: true,
  slug: true,
  name: true,
  htmlOverview: true,
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

// ------------------------------------------------------------------ create

export async function createPackage(dto: CreatePackageInput) {
  const { itineraries, faqs, ...packageData } = dto

  try {
    // 1. Create the package
    const pkg = await prisma.package.create({
      data: {
        slug: packageData.slug,
        name: packageData.name,
        htmlOverview: packageData.htmlOverview,
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

    // 4. Return the full package with itineraries + faqs attached
    return findPackageByIdOrThrow(pkg.id)
  } catch (error) {
    throwIfDuplicatePackageSlug(packageData.slug, error)
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

  const { itineraries, faqs, ...packageData } = dto

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

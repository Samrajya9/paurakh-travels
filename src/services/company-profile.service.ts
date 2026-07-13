import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CompanyProfileCreateInput } from "@/schemas/company-profile-create.schema"
import type { CompanyProfileUpdateInput } from "@/schemas/company-profile-update.schema"

const companyProfileSelect = {
  id: true,
  companyName: true,
  tagline: true,
  address: true,
  contacts: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.CompanyProfileSelect

// ------------------------------------------------------------------ create
export async function createCompanyProfile(dto: CompanyProfileCreateInput) {
  const existing = await prismaClient.companyProfile.findUnique({
    where: { singleton: true },
  })

  if (existing) {
    throw new AppError(
      "A company profile already exists. Use PATCH to update it.",
      409
    )
  }

  return prismaClient.companyProfile.create({
    data: dto,
    select: companyProfileSelect,
  })
}

// ----------------------------------------------------------------- findOne
export async function getCompanyProfile() {
  const profile = await prismaClient.companyProfile.findUnique({
    where: { singleton: true },
    select: companyProfileSelect,
  })

  if (!profile) {
    throw new AppError("Company profile not found.", 404)
  }

  return profile
}

// ------------------------------------------------------------------ update
export async function updateCompanyProfile(dto: CompanyProfileUpdateInput) {
  await getCompanyProfile()

  return prismaClient.companyProfile.update({
    where: { singleton: true },
    data: dto,
    select: companyProfileSelect,
  })
}

// ------------------------------------------------------------------ remove
export async function deleteCompanyProfile() {
  await getCompanyProfile()

  return prismaClient.companyProfile.delete({
    where: { singleton: true },
    select: companyProfileSelect,
  })
}

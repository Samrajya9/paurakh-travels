import { Prisma as PrismaClient } from "@prisma/client"

import prismaClient from "@/lib/prisma"
import { AppError } from "@/lib/errors"
import type { CompanyContactCreateInput } from "@/schemas/company-contacts-create.schema"
import type { CompanyContactUpdateInput } from "@/schemas/company-contacts-update.schema"

const companyContactSelect = {
  id: true,
  companyId: true,
  type: true,
  value: true,
  createdAt: true,
  updatedAt: true,
} satisfies PrismaClient.CompanyContactSelect

// ------------------------------------------------------------------ helpers
async function resolveProfileId(): Promise<string> {
  const profile = await prismaClient.companyProfile.findUnique({
    where: { singleton: true },
    select: { id: true },
  })

  if (!profile) {
    throw new AppError(
      "Company profile not found. Create one before managing contacts.",
      404
    )
  }

  return profile.id
}

async function findContactOrThrow(id: string) {
  const contact = await prismaClient.companyContact.findUnique({
    where: { id },
    select: companyContactSelect,
  })

  if (!contact) {
    throw new AppError(`Contact "${id}" not found.`, 404)
  }

  return contact
}

// ------------------------------------------------------------------ create
export async function createCompanyContact(dto: CompanyContactCreateInput) {
  const companyId = await resolveProfileId()

  return prismaClient.companyContact.create({
    data: { ...dto, companyId },
    select: companyContactSelect,
  })
}

// ----------------------------------------------------------------- findAll
export async function listCompanyContacts() {
  const companyId = await resolveProfileId()

  return prismaClient.companyContact.findMany({
    where: { companyId },
    orderBy: { createdAt: "asc" },
    select: companyContactSelect,
  })
}

// ----------------------------------------------------------------- findOne
export async function getCompanyContact(id: string) {
  return findContactOrThrow(id)
}

// ------------------------------------------------------------------ update
export async function updateCompanyContact(
  id: string,
  dto: CompanyContactUpdateInput
) {
  await findContactOrThrow(id)

  return prismaClient.companyContact.update({
    where: { id },
    data: dto,
    select: companyContactSelect,
  })
}

// ------------------------------------------------------------------ remove
export async function deleteCompanyContact(id: string) {
  await findContactOrThrow(id)

  return prismaClient.companyContact.delete({
    where: { id },
    select: companyContactSelect,
  })
}

// --------------------------------------------------------------- removeAll
export async function deleteAllCompanyContacts() {
  const companyId = await resolveProfileId()

  return prismaClient.companyContact.deleteMany({ where: { companyId } })
}

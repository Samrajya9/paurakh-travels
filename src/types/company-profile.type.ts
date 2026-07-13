import type { Prisma } from "@prisma/client"

const companyProfileSelect = {
  id: true,
  companyName: true,
  tagline: true,
  address: true,
  contacts: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CompanyProfileSelect

export type CompanyProfile = Prisma.CompanyProfileGetPayload<{
  select: typeof companyProfileSelect
}>

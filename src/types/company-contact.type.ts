import type { Prisma } from "@prisma/client"

const companyContactSelect = {
  id: true,
  companyId: true,
  type: true,
  value: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CompanyContactSelect

// Shared
export const COMPANY_CONTACT_TYPES = [
  "PHONE",
  "EMAIL",
  "WHATSAPP",
  "VIBER",
  "FACEBOOK",
  "INSTAGRAM",
  "LINKEDIN",
  "YOUTUBE",
  "TIKTOK",
  "X",
] as const

export type CompanyContactType = (typeof COMPANY_CONTACT_TYPES)[number]

// Prisma payload
export type CompanyContact = Prisma.CompanyContactGetPayload<{
  select: typeof companyContactSelect
}>

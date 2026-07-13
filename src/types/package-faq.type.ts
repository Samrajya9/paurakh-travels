import type { Prisma } from "@prisma/client"

export const packageFaqSelect = {
  id: true,
  packageId: true,
  faqId: true,
  order: true,
} satisfies Prisma.PackageFaqSelect

export type PackageFaq = Prisma.PackageFaqGetPayload<{
  select: typeof packageFaqSelect
}>

import type { Prisma } from "@prisma/client"

export const faqSelect = {
  id: true,
  question: true,
  answer: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FaqSelect

export type Faq = Prisma.FaqGetPayload<{
  select: typeof faqSelect
}>

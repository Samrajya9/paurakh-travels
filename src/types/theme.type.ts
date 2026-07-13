import type { Prisma } from "@prisma/client"

export const themeSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ThemeSelect

export type Theme = Prisma.ThemeGetPayload<{
  select: typeof themeSelect
}>

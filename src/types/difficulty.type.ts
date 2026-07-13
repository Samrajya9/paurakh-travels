import type { Prisma } from "@prisma/client"

export const difficultySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.DifficultySelect

export type Difficulty = Prisma.DifficultyGetPayload<{
  select: typeof difficultySelect
}>

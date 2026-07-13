import type { Prisma } from "@prisma/client"

export const destinationSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.DestinationSelect

export type Destination = Prisma.DestinationGetPayload<{
  select: typeof destinationSelect
}>

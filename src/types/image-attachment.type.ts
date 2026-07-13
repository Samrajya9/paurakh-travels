import type { Prisma } from "@prisma/client"
import { imageSelect } from "./image.type"

export const imageAttachmentSelect = {
  id: true,
  entityType: true,
  entityId: true,
  image: {
    select: imageSelect,
  },
  createdAt: true,
} satisfies Prisma.ImageAttachmentSelect

export type ImageAttachment = Prisma.ImageAttachmentGetPayload<{
  select: typeof imageAttachmentSelect
}>

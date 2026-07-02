import { z } from "zod"
import { EntityType } from "@/constants/enums/entity-type"

export const CreateImageAttachmentSchema = z.object({
  imageId: z.cuid2("Invalid image id"),
  entityType: z.enum(EntityType, "Invalid entity type"),
  entityId: z.cuid2("Invalid entity id"),
})

export type CreateImageAttachmentInput = z.infer<
  typeof CreateImageAttachmentSchema
>

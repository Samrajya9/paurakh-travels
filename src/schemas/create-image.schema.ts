import { z } from "zod"

export const CreateImageSchema = z.object({
  url: z.url("Must be a valid URL"),
  altText: z
    .string()
    .trim()
    .max(300, "Alt text cannot exceed 300 characters")
    .optional(),
})

export type CreateImageInput = z.infer<typeof CreateImageSchema>

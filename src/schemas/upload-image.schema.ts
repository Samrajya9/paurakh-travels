import { z } from "zod"

export const UploadImageSchema = z.object({
  file: z
    .file()
    .max(5 * 1024 * 1024, "File must be smaller than 5MB")
    .mime(
      ["image/jpeg", "image/png", "image/webp", "image/gif"],
      "Unsupported file type"
    ),
  altText: z
    .string()
    .trim()
    .max(300, "Alt text cannot exceed 300 characters")
    .optional(),
})

export type UploadImageInput = z.infer<typeof UploadImageSchema>

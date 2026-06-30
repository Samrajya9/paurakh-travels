import { z } from "zod"

export const CreateFaqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required")
    .max(300, "Question cannot exceed 300 characters"),

  answer: z
    .string()
    .trim()
    .min(1, "Answer is required")
    .max(10000, "Answer is too long"),
})

export type CreateFaqInput = z.infer<typeof CreateFaqSchema>

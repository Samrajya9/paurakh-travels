import { z } from "zod"

export const CompanyProfileCreateSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  tagline: z.string().optional(),
  address: z.string().optional(),
})

export type CompanyProfileCreateDto = z.infer<typeof CompanyProfileCreateSchema>

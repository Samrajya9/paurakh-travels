import { CompanyContactType } from "@/types/company-contract.enum"
import { z } from "zod"

export const CompanyContactTypeSchema = z.enum(CompanyContactType)

export const CompanyContactCreateSchema = z.object({
  type: CompanyContactTypeSchema,
  value: z.string().min(1, "Contact value is required"),
})

export type CompanyContactCreateDto = z.infer<typeof CompanyContactCreateSchema>

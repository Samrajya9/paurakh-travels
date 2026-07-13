import { COMPANY_CONTACT_TYPES } from "@/types/company-contact.type"
import { z } from "zod"

export const CompanyContactTypeSchema = z.enum(COMPANY_CONTACT_TYPES)

export const CompanyContactCreateSchema = z.object({
  type: CompanyContactTypeSchema,
  value: z.string().min(1, "Contact value is required"),
})

export type CompanyContactCreateInput = z.infer<
  typeof CompanyContactCreateSchema
>

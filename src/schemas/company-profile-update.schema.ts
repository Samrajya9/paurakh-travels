import { z } from "zod"
import { CompanyProfileCreateSchema } from "./company-profile-create.schema"

export const CompanyProfileUpdateSchema = CompanyProfileCreateSchema.partial()

export type CompanyProfileUpdateInput = z.infer<typeof CompanyProfileUpdateSchema>

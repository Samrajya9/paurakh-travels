import { z } from "zod"
import { CompanyContactCreateSchema } from "./company-contacts-create.schema"

export const CompanyContactUpdateSchema = CompanyContactCreateSchema.partial()

export type CompanyContactUpdateInput = z.infer<typeof CompanyContactUpdateSchema>

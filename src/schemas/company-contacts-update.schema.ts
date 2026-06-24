import { z } from "zod"
import { CompanyContactCreateSchema } from "./company-contacts-create.schema"

export const CompanyContactUpdateSchema = CompanyContactCreateSchema.partial()

export type CompanyContactUpdateDto = z.infer<typeof CompanyContactUpdateSchema>

import {
  CreateRegionInput,
  CreateRegionSchema,
} from "@/schemas/create-region.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, useFormContext } from "react-hook-form"

const defaultValues: CreateRegionInput = {
  name: "",
}

export const useRegionForm = (
  initialValues: Partial<CreateRegionInput> = {}
) => {
  const form = useForm<CreateRegionInput>({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateRegionSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

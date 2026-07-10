import {
  CreateSeasonInput,
  CreateSeasonSchema,
} from "@/schemas/create-season.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateSeasonInput = {
  name: "",
}

export const useSeasonForm = (
  initialValues: Partial<CreateSeasonInput> = {}
) => {
  const form = useForm<CreateSeasonInput>({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateSeasonSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

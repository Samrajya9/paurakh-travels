import {
  CreateThemeInput,
  CreateThemeSchema,
} from "@/schemas/create-theme.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateThemeInput = {
  name: "",
}

export const useThemeForm = (initialValues: Partial<CreateThemeInput> = {}) => {
  const form = useForm<CreateThemeInput>({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateThemeSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

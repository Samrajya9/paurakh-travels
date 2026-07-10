import {
  CreateCategoryInput,
  CreateCategorySchema,
} from "@/schemas/create-category.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateCategoryInput = {
  name: "",
}

export const useCategoryForm = (
  initialValues: Partial<CreateCategoryInput> = {}
) => {
  const form = useForm<CreateCategoryInput>({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateCategorySchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

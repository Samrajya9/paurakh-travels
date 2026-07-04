import {
  CreateDifficultyInput,
  CreateDifficultySchema,
} from "@/schemas/create-difficulty.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateDifficultyInput = {
  name: "",
}

export const useDifficultyForm = (
  initialValues: Partial<CreateDifficultyInput> = {}
) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateDifficultySchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

import {
  CreateActivityInput,
  CreateActivitySchema,
} from "@/schemas/create-activity.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateActivityInput = {
  name: "",
}

export const useActivityForm = (
  initialValues: Partial<CreateActivityInput> = {}
) => {
  const form = useForm<CreateActivityInput>({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateActivitySchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

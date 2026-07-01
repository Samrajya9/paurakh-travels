"use client"

import {
  CreateDestinationInput,
  CreateDestinationSchema,
} from "@/schemas/create-destination.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateDestinationInput = {
  name: "",
  elevation: 0,
  latitude: undefined,
  longitude: undefined,
  regionId: "",
}

export const useDestinationForm = (
  initialValues: Partial<CreateDestinationInput> = {}
) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateDestinationSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

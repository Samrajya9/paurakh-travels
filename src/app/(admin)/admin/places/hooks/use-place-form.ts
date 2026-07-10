"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  CreatePlaceInput,
  CreatePlaceSchema,
} from "@/schemas/create-place.schema"

const defaultValues: CreatePlaceInput = {
  name: "",
  elevation: 0,
  latitude: undefined,
  longitude: undefined,
  regionId: "",
}

export const usePlaceForm = (initialValues: Partial<CreatePlaceInput> = {}) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreatePlaceSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

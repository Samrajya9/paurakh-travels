"use client"

import {
  CreateItineraryInput,
  CreateItinerarySchema,
} from "@/schemas/create-itinerary.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreateItineraryInput = {
  packageId: "",
  dayNumber: 1,
  title: "",
  htmlDescription: "",
  distanceKm: undefined,
  durationHours: undefined,
}

export const useItineraryForm = (
  initialValues: Partial<CreateItineraryInput> = {}
) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreateItinerarySchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

"use client"

import {
  CreatePackageInput,
  CreatePackageSchema,
} from "@/schemas/create-package.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const defaultValues: CreatePackageInput = {
  name: "",
  slug: "",
  description: "",
  htmlOverview: "",
  basePrice: 0,
  difficultyId: "",
  itineraries: [
    {
      dayNumber: 1,
      title: "",
      htmlDescription: "",
      distanceKm: undefined,
      durationHours: undefined,
      destinations: [
        {
          destinationId: "",
          order: 1,
        },
      ],
    },
  ],
}

export const usePackageForm = (
  initialValues: Partial<CreatePackageInput> = {}
) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(CreatePackageSchema),
  })

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValues)])

  return form
}

"use client"

import { useRegionForm } from "../hooks/region-form.hook"
import { FormProvider } from "react-hook-form"
import RegionFormFields from "./region-form-fields"
import { Button } from "@/components/ui/button"
import { CreateRegionInput } from "@/schemas/create-region.schema"

import { toast } from "sonner"

type CreateRegionErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateRegionInput, string[]>>
}

const RegionForm = () => {
  const form = useRegionForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/regions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: CreateRegionErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateRegionInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      form.reset()
      toast.success("Region created.")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-create-region"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <RegionFormFields />
        <Button type="submit" form="form-create-region">
          Create
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegionForm

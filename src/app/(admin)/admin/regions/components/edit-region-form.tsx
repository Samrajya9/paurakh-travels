"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useRegionForm } from "../hooks/region-form.hook"
import RegionFormFields from "./region-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateRegionInput } from "@/schemas/create-region.schema"
import type { Region } from "@/services/region.service"

type UpdateRegionErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateRegionInput, string[]>>
}

export default function EditRegionForm({
  region,
  onSuccess,
}: {
  region: Region
  onSuccess: (region: Region) => void
}) {
  const form = useRegionForm({ name: region.name, destinationId: region.destinationId })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/regions/${region.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateRegionErrorResponse = await res.json()

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

      const updated: Region = await res.json()
      toast.success("Region updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form id="form-edit-region" onSubmit={handleSubmit} className="space-y-4">
        <RegionFormFields />
        <Button
          type="submit"
          form="form-edit-region"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}

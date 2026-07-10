"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useDestinationForm } from "../hooks/destination-form.hook"
import DestinationFormFields from "./destination-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateDestinationInput } from "@/schemas/create-destination.schema"
import type { Destination } from "@/services/destination.service"

type UpdateDestinationErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateDestinationInput, string[]>>
}

export default function EditDestinationForm({
  destination,
  onSuccess,
}: {
  destination: Destination
  onSuccess: (destination: Destination) => void
}) {
  const form = useDestinationForm({ name: destination.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/destinations/${destination.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateDestinationErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateDestinationInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const updated: Destination = await res.json()
      toast.success("Destination updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form id="form-edit-destination" onSubmit={handleSubmit} className="space-y-4">
        <DestinationFormFields />
        <Button
          type="submit"
          form="form-edit-destination"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}

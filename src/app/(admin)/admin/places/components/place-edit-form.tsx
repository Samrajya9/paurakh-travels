"use client"

import { FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { usePlaceForm } from "../hooks/use-place-form"
import PlaceFormFields from "./place-form-fields"
import { Button } from "@/components/ui/button"
import type { CreatePlaceInput } from "@/schemas/create-place.schema"

export default function PlaceEditForm({
  placeId,
  initialValues,
}: {
  placeId: string
  initialValues: CreatePlaceInput
}) {
  const router = useRouter()
  const form = usePlaceForm(initialValues)

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/places/${placeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: {
          message?: string
          errors?: Record<string, string[]>
        } = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreatePlaceInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      toast.success("Destination updated successfully.")
      router.push("/admin/destinations")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <PlaceFormFields />

        <Button
          type="submit"
          className="self-end"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}

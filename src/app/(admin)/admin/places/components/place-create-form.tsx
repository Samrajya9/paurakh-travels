"use client"
import { FormProvider } from "react-hook-form"
import { usePlaceForm } from "../hooks/use-place-form"
import PlaceFormFields from "./place-form-fields"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CreatePlaceInput } from "@/schemas/create-place.schema"

export default function PlaceCreateForm() {
  const form = usePlaceForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/places", {
        method: "POST",
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

      form.reset()
      toast.success("Destination created successfully.")
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <>
      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <PlaceFormFields />

          <Button
            type="submit"
            className="self-end"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Destination"}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

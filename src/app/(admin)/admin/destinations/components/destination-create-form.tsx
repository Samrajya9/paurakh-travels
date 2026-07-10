"use client"
import { FormProvider } from "react-hook-form"
import { useDestinationForm } from "../hooks/use-destination-form"
import DestinationFormFields from "./destination-form-fields"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CreateDestinationInput } from "@/schemas/create-place.schema"

export default function DestinationCreateForm() {
  const form = useDestinationForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/destinations", {
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
          <DestinationFormFields />
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

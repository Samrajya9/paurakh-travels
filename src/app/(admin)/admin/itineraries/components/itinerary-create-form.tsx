"use client"

import { FormProvider } from "react-hook-form"
import { useItineraryForm } from "../hooks/use-itinerary-form.hook"
import { Button } from "@/components/ui/button"
import ItineraryFormFields from "./itinerary-form-fields"

export default function ItineraryCreateForm() {
  const form = useItineraryForm()

  const onSubmit = (data: any) => {
    console.log("Itinerary Form Submitted Data:", data)
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <ItineraryFormFields />

          <Button
            type="submit"
            className="w-max self-end animate-in fade-in zoom-in-95 duration-200"
            size={"lg"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Itinerary"}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

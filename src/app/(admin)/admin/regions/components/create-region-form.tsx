"use client"

import { useRegionForm } from "../hooks/region-form.hook"
import { FormProvider } from "react-hook-form"
import RegionFormFields from "./region-form-fields"
import { Button } from "@/components/ui/button"

const RegionForm = () => {
  const form = useRegionForm()

  const handleSubmit = form.handleSubmit(
    async (data) => {
      console.log(data)
    },
    (errors) => {
      console.log(errors)
    }
  )

  return (
    <>
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
    </>
  )
}

export default RegionForm

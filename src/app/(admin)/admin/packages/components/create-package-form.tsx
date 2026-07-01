"use client"
import { CreatePackageSchema } from "@/schemas/create-package.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import PackageFormFields from "./package-form-fields"
import { Button } from "@/components/ui/button"

const CreatePackageForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      html_overview: "",
    },
    resolver: zodResolver(CreatePackageSchema),
  })
  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <PackageFormFields />
          <Button
            type="submit"
            className="w-max self-end"
            size={"lg"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Package"}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

export default CreatePackageForm

"use client"

import { FormProvider } from "react-hook-form"
import { toast } from "sonner"

import { useCategoryForm } from "../hooks/category-form.hook"
import CategoryFormFields from "./category-form-fields"
import { Button } from "@/components/ui/button"
import type { CreateCategoryInput } from "@/schemas/create-category.schema"
import type { Category } from "@/services/category.service"

type UpdateCategoryErrorResponse = {
  message: string
  errors?: Partial<Record<keyof CreateCategoryInput, string[]>>
}

export default function EditCategoryForm({
  category,
  onSuccess,
}: {
  category: Category
  onSuccess: (category: Category) => void
}) {
  const form = useCategoryForm({ name: category.name })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: UpdateCategoryErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof CreateCategoryInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const updated: Category = await res.json()
      toast.success("Category updated.")
      onSuccess(updated)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <FormProvider {...form}>
      <form
        id="form-edit-category"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <CategoryFormFields />
        <Button
          type="submit"
          form="form-edit-category"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  )
}

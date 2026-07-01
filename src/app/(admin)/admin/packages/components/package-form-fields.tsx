"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { CreatePackageInput } from "@/schemas/create-package.schema"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import RichTextEditor from "@/components/tiptap/rich-text-editor"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

const PackageFormFields = () => {
  const form = useFormContext<CreatePackageInput>()
  const name = useWatch({ control: form.control, name: "name" })

  const isSlugManuallyEdited = useRef(false)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (isSlugManuallyEdited.current) return

    form.setValue("slug", slugify(name ?? ""), {
      shouldValidate: form.formState.isSubmitted,
      shouldDirty: true,
    })
  }, [name])

  return (
    <>
      <FieldSet>
        <FieldLegend>Package Information</FieldLegend>
        <FieldDescription>
          Add basic information about the package.
        </FieldDescription>

        <FieldGroup>
          <Field orientation="horizontal">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Package Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Name of the Package"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    onChange={(e) => {
                      isSlugManuallyEdited.current = true
                      field.onChange(slugify(e.target.value))
                    }}
                    aria-invalid={fieldState.invalid}
                    placeholder="everest-base-camp-trek"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </Field>

          <Controller
            name="htmlOverview"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Overview</FieldLabel>
                <RichTextEditor
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Package Itineraries</FieldLegend>
        <FieldDescription>Add itineraries for the package.</FieldDescription>
      </FieldSet>
    </>
  )
}

export default PackageFormFields

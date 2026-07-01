"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import RichTextEditor from "@/components/tiptap/rich-text-editor"
import { PlusIcon, TrashIcon } from "lucide-react"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

const PackageFormFields = () => {
  const form = useFormContext<CreatePackageInput>()
  const name = useWatch({ control: form.control, name: "name" })
  const itineraries = useWatch({ control: form.control, name: "itineraries" })

  const isSlugManuallyEdited = useRef(false)
  const hasMounted = useRef(false)

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itineraries",
  })

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
        <FieldLegend className="flex w-full items-center justify-between">
          <span>Package Itineraries</span>
          <Button
            type="button"
            onClick={() =>
              append({
                dayNumber: fields.length + 1,
                title: "",
                htmlDescription: "",
                distanceKm: undefined,
                durationHours: undefined,
              })
            }
            className="flex items-center gap-1.5"
          >
            <PlusIcon className="h-4 w-4" />
            Add Itinerary
          </Button>
        </FieldLegend>
        <FieldDescription>Add itineraries for the package.</FieldDescription>

        <div className="mt-4 space-y-6 rounded-lg border border-border p-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative space-y-4 rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="flex items-center border-b border-border pb-2">
                <span className="text-sm font-medium">
                  Day - {itineraries?.[index]?.dayNumber ?? index + 1}
                </span>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="ml-auto"
                  disabled={fields.length <= 1}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>

              <FieldGroup>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Day Number */}
                  <Controller
                    control={form.control}
                    name={`itineraries.${index}.dayNumber`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Day Number</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="number"
                          min={1}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 1"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Title */}
                  <Controller
                    control={form.control}
                    name={`itineraries.${index}.title`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Arrival in Kathmandu"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Distance (km) */}
                  <Controller
                    control={form.control}
                    name={`itineraries.${index}.distanceKm`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Distance (km)
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id={field.name}
                          type="number"
                          step="any"
                          min={0}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 12.5"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Duration (hours) */}
                  <Controller
                    control={form.control}
                    name={`itineraries.${index}.durationHours`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Duration (hours)
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id={field.name}
                          type="number"
                          min={0}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 6"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* HTML Description */}
                <Controller
                  control={form.control}
                  name={`itineraries.${index}.htmlDescription`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
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
            </div>
          ))}
        </div>
      </FieldSet>
    </>
  )
}

export default PackageFormFields

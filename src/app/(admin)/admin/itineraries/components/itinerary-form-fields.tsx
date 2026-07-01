"use client"

import { CreateItineraryInput } from "@/schemas/create-itinerary.schema"
import { Controller, useFormContext } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import RichTextEditor from "@/components/tiptap/rich-text-editor"
import PackageSelect from "../../packages/components/package-select"

export default function ItineraryFormFields() {
  const form = useFormContext<CreateItineraryInput>()

  return (
    <>
      <FieldSet>
        <FieldLegend>Itinerary Details</FieldLegend>
        <FieldDescription>
          Specify the package, day number, and overview details for this
          itinerary.
        </FieldDescription>

        <FieldGroup>
          {" "}
          <Controller
            control={form.control}
            name="packageId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Package</FieldLabel>
                <PackageSelect {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="dayNumber"
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
            name="title"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Distance (km) */}
            <Controller
              control={form.control}
              name="distanceKm"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Distance (km)</FieldLabel>
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
              name="durationHours"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Duration (hours)</FieldLabel>
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
            name="htmlDescription"
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
      </FieldSet>
    </>
  )
}

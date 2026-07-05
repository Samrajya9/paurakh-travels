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
import DestinationSelect from "../../destinations/components/destination-select"
import { Textarea } from "@/components/ui/textarea"
import { PackageGroupDiscountSchema } from "@/schemas/create-package.schema"

import DifficultySelect from "../../packages/difficulties/components/difficulty-select"

// Owns the top-level, optional `groupDiscounts` field array.
function PackageGroupDiscountsField() {
  const form = useFormContext<CreatePackageInput>()
  const basePrice = useWatch({ control: form.control, name: "basePrice" })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "groupDiscounts",
  })

  return (
    <FieldSet>
      <FieldLegend className="flex w-full items-center justify-between">
        <span>Group Discounts</span>
        <Button
          type="button"
          onClick={() =>
            append({
              minPeople: fields.length === 0 ? 4 : 2,
              price: 0,
            })
          }
          className="flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" />
          Add Discount Tier
        </Button>
      </FieldLegend>
      <FieldDescription>
        Optional. Offer a lower per-person price once a booking reaches a
        minimum group size.
      </FieldDescription>

      {fields.length > 0 && (
        <div className="mt-4 space-y-4 rounded-lg border border-border p-4">
          {fields.map((field, index) => {
            const discountedPrice =
              form.watch(`groupDiscounts.${index}.price`) ?? 0
            const minPeople =
              form.watch(`groupDiscounts.${index}.minPeople`) ?? 0

            return (
              <div
                key={field.id}
                className="relative space-y-3 rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex items-center border-b border-border pb-2">
                  <span className="text-sm font-medium">Tier {index + 1}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className="ml-auto"
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    control={form.control}
                    name={`groupDiscounts.${index}.minPeople`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Minimum People
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id={field.name}
                          type="number"
                          min={2}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 4"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name={`groupDiscounts.${index}.price`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Price per Person
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id={field.name}
                          type="number"
                          step="0.01"
                          min={0}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 70.00"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                {basePrice > 0 && minPeople > 0 && discountedPrice > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Shown to guests as:{" "}
                    <span className="line-through">Rs. {basePrice}</span>{" "}
                    <span className="font-semibold text-foreground">
                      Rs. {discountedPrice}
                    </span>{" "}
                    for {minPeople}+ people
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </FieldSet>
  )
}
function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

// Owns the nested `itineraries.${itineraryIndex}.destinations` field array.
function ItineraryDestinationsField({
  itineraryIndex,
}: {
  itineraryIndex: number
}) {
  const form = useFormContext<CreatePackageInput>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `itineraries.${itineraryIndex}.destinations`,
  })

  return (
    <Field>
      <FieldLegend className="flex w-full items-center justify-between">
        <span>Destinations</span>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            append({
              destinationId: "",
              order: fields.length + 1,
            })
          }
          className="flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" />
          Add Destination
        </Button>
      </FieldLegend>
      <FieldDescription>
        Add destinations in the order you want them to appear in the package
      </FieldDescription>

      <FieldGroup>
        {fields.map((field, destIndex) => (
          <div key={field.id} className="flex items-end gap-3">
            <Controller
              control={form.control}
              name={`itineraries.${itineraryIndex}.destinations.${destIndex}.destinationId`}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Destination</FieldLabel>
                  <DestinationSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name={`itineraries.${itineraryIndex}.destinations.${destIndex}.order`}
              render={({ field, fieldState }) => (
                <Field className="w-24" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Order</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(destIndex)}
              disabled={fields.length <= 1}
            >
              <TrashIcon className="size-4" />
            </Button>
          </div>
        ))}
      </FieldGroup>
    </Field>
  )
}

// Owns the top-level, optional `faqs` field array.
function PackageFaqsField() {
  const form = useFormContext<CreatePackageInput>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  })

  return (
    <FieldSet>
      <FieldLegend className="flex w-full items-center justify-between">
        <span>FAQs</span>
        <Button
          type="button"
          onClick={() => append({ question: "", answer: "" })}
          className="flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" />
          Add FAQ
        </Button>
      </FieldLegend>
      <FieldDescription>
        Optional. Add frequently asked questions for this package.
      </FieldDescription>

      {fields.length > 0 && (
        <div className="mt-4 space-y-4 rounded-lg border border-border p-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative space-y-4 rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="flex items-center border-b border-border pb-2">
                <span className="text-sm font-medium">FAQ {index + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="ml-auto"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>

              <FieldGroup>
                <Controller
                  control={form.control}
                  name={`faqs.${index}.question`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Question</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. What is the best season to trek?"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name={`faqs.${index}.answer`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Answer</FieldLabel>
                      <Textarea {...field} />
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
      )}
    </FieldSet>
  )
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
      {/* <FieldSet>
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
      </FieldSet> */}

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

          <Field orientation="horizontal">
            <Controller
              name="difficultyId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Difficulty</FieldLabel>
                  <DifficultySelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="basePrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Base Price (per person)
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id={field.name}
                    type="number"
                    step="0.01"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 100.00"
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <FieldDescription>
                  A short summary (150–300 characters) shown on package cards
                  and search results. This is plain text — the full trip
                  overview below supports rich formatting.
                </FieldDescription>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id={field.name}
                  maxLength={300}
                  aria-invalid={fieldState.invalid}
                  placeholder="A short, compelling summary of this trek..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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

      <PackageGroupDiscountsField />
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
                destinations: [
                  {
                    destinationId: "",
                    order: fields.length + 1,
                  },
                ],
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

                <ItineraryDestinationsField itineraryIndex={index} />
              </FieldGroup>
            </div>
          ))}
        </div>
      </FieldSet>

      <PackageFaqsField />
    </>
  )
}

export default PackageFormFields

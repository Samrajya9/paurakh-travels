import { Input } from "@/components/ui/input"
import { CreateRegionInput } from "@/schemas/create-region.schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"
import DestinationSelect from "@/app/(admin)/admin/destinations/components/destination-select"

const RegionFormFields = () => {
  const form = useFormContext<CreateRegionInput>()

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Region Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name of the Region"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="destinationId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Destination</FieldLabel>
              <DestinationSelect
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  )
}

export default RegionFormFields


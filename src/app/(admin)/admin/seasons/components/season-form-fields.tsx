import { Input } from "@/components/ui/input"
import { CreateSeasonInput } from "@/schemas/create-season.schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

const SeasonFormFields = () => {
  const form = useFormContext<CreateSeasonInput>()

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Season Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name of the Season"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  )
}

export default SeasonFormFields

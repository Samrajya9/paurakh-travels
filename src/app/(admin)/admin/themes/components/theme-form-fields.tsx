import { Input } from "@/components/ui/input"
import { CreateThemeInput } from "@/schemas/create-theme.schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

const ThemeFormFields = () => {
  const form = useFormContext<CreateThemeInput>()

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Theme Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name of the Theme"
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

export default ThemeFormFields

import { Input } from "@/components/ui/input"
import { CreateActivityInput } from "@/schemas/create-activity.schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

const ActivityFormFields = () => {
  const form = useFormContext<CreateActivityInput>()

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Activity Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name of the Activity"
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

export default ActivityFormFields

import { Input } from "@/components/ui/input"
import { CreateCategoryInput } from "@/schemas/create-category.schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

const CategoryFormFields = () => {
  const form = useFormContext<CreateCategoryInput>()

  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name of the Category"
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

export default CategoryFormFields

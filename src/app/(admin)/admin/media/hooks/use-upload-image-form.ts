import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  UploadImageInput,
  UploadImageSchema,
} from "@/schemas/upload-image.schema"

export const useUploadImageForm = (
  initialValues: Partial<UploadImageInput> = {}
) => {
  return useForm<UploadImageInput>({
    defaultValues: {
      file: undefined,
      altText: "",
      ...initialValues,
    },
    resolver: zodResolver(UploadImageSchema),
  })
}

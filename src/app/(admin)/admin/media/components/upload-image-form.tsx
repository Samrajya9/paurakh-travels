"use client"

import { useEffect, useRef, useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { ImagePlus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import type { Image } from "@/services/image.service"
import { UploadImageInput } from "@/schemas/upload-image.schema"
import { useUploadImageForm } from "../hooks/use-upload-image-form"

const ACCEPTED_MIME_TYPES = "image/jpeg,image/png,image/webp,image/gif"

type UploadImageErrorResponse = {
  message: string
  errors?: Partial<Record<keyof UploadImageInput, string[]>>
}

interface UploadImageFormProps {
  // Called with the persisted image once the upload actually succeeds.
  // The form itself doesn't know or care whether it's rendered inside a
  // modal, a page, or anything else — the caller decides what "done"
  // means (close a modal, redirect, append to a list, etc).
  onSubmit?: (image: Image) => void
}

const UploadImageForm = ({ onSubmit }: UploadImageFormProps) => {
  const form = useUploadImageForm()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Local, pre-upload preview of whatever file the user just selected.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  // Server-confirmed preview, shown once the upload actually succeeds.
  const [uploadedImage, setUploadedImage] = useState<Image | null>(null)

  // Object URLs are only valid for the lifetime of this component /
  // until replaced — revoke the old one whenever it's swapped out.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      formData.append("file", data.file)
      if (data.altText) formData.append("altText", data.altText)

      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const body: UploadImageErrorResponse = await res.json()

        if (res.status === 422 && body.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            form.setError(field as keyof UploadImageInput, {
              type: "server",
              message: messages?.[0],
            })
          }
          return
        }

        toast.error(body.message ?? "Something went wrong. Please try again.")
        return
      }

      const image: Image = await res.json()

      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      setUploadedImage(image)

      form.reset()
      if (fileInputRef.current) fileInputRef.current.value = ""

      toast.success("Image uploaded.")
      onSubmit?.(image)
    } catch {
      toast.error("Could not reach the server. Please try again.")
    }
  })

  return (
    <form
      id="form-upload-image"
      onSubmit={handleFormSubmit}
      className="max-w-100 space-y-4"
    >
      <FieldGroup>
        <Controller
          name="file"
          control={form.control}
          render={({ field: { onChange, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="file"
                className={cn(
                  "flex h-60 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border p-6 text-center text-xs text-muted-foreground transition-colors hover:bg-input/50",
                  fieldState.invalid && "border-destructive"
                )}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected file preview"
                    className="max-h-40 rounded-md object-contain"
                  />
                ) : (
                  <>
                    <ImagePlus className="size-6" />
                    <span>Click to choose an image, or drag one here</span>
                  </>
                )}
              </FieldLabel>

              <input
                {...field}
                ref={(el) => {
                  field.ref(el)
                  fileInputRef.current = el
                }}
                id="file"
                type="file"
                accept={ACCEPTED_MIME_TYPES}
                className="sr-only"
                value={undefined}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return

                  if (previewUrl) URL.revokeObjectURL(previewUrl)
                  setPreviewUrl(URL.createObjectURL(file))
                  setUploadedImage(null)

                  onChange(file)
                  form.trigger("file")
                }}
              />

              <FieldDescription>
                JPEG, PNG, WEBP, or GIF. Max 5MB.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="altText"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Alt text</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Short description of the image (optional)"
                rows={2}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        form="form-upload-image"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </Button>

      {/* {uploadedImage && (
        <Field>
          <FieldLabel>Uploaded</FieldLabel>
          <div className="flex items-center gap-3 rounded-md border border-border p-2">
\            <img
              src={uploadedImage.url}
              alt={uploadedImage.altText ?? "Uploaded image"}
              className="size-16 rounded-md object-cover"
            />
            <span className="truncate text-xs text-muted-foreground">
              {uploadedImage.url}
            </span>
          </div>
        </Field>
      )} */}
    </form>
  )
}

export default UploadImageForm

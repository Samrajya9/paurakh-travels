import { z } from "zod"

const destinationShape = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Destination name is required")
    .max(100, "Destination name cannot exceed 100 characters"),

  elevation: z.coerce
    .number()
    .int("Elevation must be a whole number")
    .gt(0, "Elevation should be greater than 0"),

  latitude: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),

  longitude: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional(),

  regionId: z.cuid2("Invalid region id"),
})

function requireLatLngTogether(
  data: { latitude?: number; longitude?: number },
  ctx: z.RefinementCtx
) {
  const hasLat = data.latitude !== undefined
  const hasLng = data.longitude !== undefined

  if (hasLat !== hasLng) {
    const field = hasLat ? "longitude" : "latitude"
    ctx.addIssue({
      code: "custom",
      path: [field],
      message: "Latitude and longitude must both be provided or both omitted",
    })
  }
}

export const CreateDestinationSchema = destinationShape.superRefine(
  requireLatLngTogether
)

export { destinationShape }
export type CreateDestinationInput = z.infer<typeof CreateDestinationSchema>

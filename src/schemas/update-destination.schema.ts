import { z } from "zod"

import { destinationShape } from "./create-destination.schema"

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

export const UpdateDestinationSchema = destinationShape
  .partial()
  .superRefine(requireLatLngTogether)

export type UpdateDestinationInput = z.infer<typeof UpdateDestinationSchema>

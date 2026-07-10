import { notFound } from "next/navigation"

import { getPlaceById } from "@/services/place.service"
import { AppError } from "@/lib/errors"
import PlaceEditForm from "../../components/place-edit-form"

type RouteContext = { params: Promise<{ id: string }> }

export default async function EditPlacePage({ params }: RouteContext) {
  const { id } = await params

  const place = await getPlaceById(id).catch((error) => {
    if (error instanceof AppError && error.status === 404) return null
    throw error
  })

  if (!place) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Place</h1>
        <p className="text-sm text-muted-foreground">
          Update details for {place.name}.
        </p>
      </div>

      <PlaceEditForm
        placeId={place.id}
        initialValues={{
          name: place.name,
          elevation: place.elevation,
          latitude: place.latitude ?? undefined,
          longitude: place.longitude ?? undefined,
          regionId: place.regionId,
        }}
      />
    </div>
  )
}

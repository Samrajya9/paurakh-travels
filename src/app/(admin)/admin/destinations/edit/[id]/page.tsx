import { notFound } from "next/navigation"

import { getDestinationById } from "@/services/destination.service"
import { AppError } from "@/lib/errors"
import DestinationEditForm from "../../components/destination-edit-form"

type RouteContext = { params: Promise<{ id: string }> }

export default async function EditDestinationPage({ params }: RouteContext) {
  const { id } = await params

  const destination = await getDestinationById(id).catch((error) => {
    if (error instanceof AppError && error.status === 404) return null
    throw error
  })

  if (!destination) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Destination</h1>
        <p className="text-sm text-muted-foreground">
          Update details for {destination.name}.
        </p>
      </div>

      <DestinationEditForm
        destinationId={destination.id}
        initialValues={{
          name: destination.name,
          elevation: destination.elevation,
          latitude: destination.latitude ?? undefined,
          longitude: destination.longitude ?? undefined,
          regionId: destination.regionId,
        }}
      />
    </div>
  )
}

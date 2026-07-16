import { notFound } from "next/navigation"

import { getPackageById } from "@/services/package.service"
import { AppError } from "@/lib/errors"
import PackageEditForm from "../../components/package-edit-form"
import type { CreatePackageInput } from "@/schemas/create-package.schema"

type RouteContext = { params: Promise<{ id: string }> }

export default async function EditPackagePage({ params }: RouteContext) {
  const { id } = await params

  const pkg = await getPackageById(id).catch((error) => {
    if (error instanceof AppError && error.status === 404) return null
    throw error
  })

  if (!pkg) notFound()

  const initialValues: CreatePackageInput = {
    slug: pkg.slug,
    name: pkg.name,
    description: pkg.description ?? "",
    htmlOverview: pkg.htmlOverview ?? "",
    basePrice: pkg.basePrice.toNumber(),
    difficultyId: pkg.difficultyId,
    categoryId: pkg.categoryId,
    activityIds: pkg.activities.map((a) => a.activity.id),
    seasonIds: pkg.seasons.map((s) => s.season.id),
    themeIds: pkg.themes.map((t) => t.theme.id),
    imageIds: pkg.images.map((image) => image.image.id),
    itineraries: pkg.itineraries.map((itinerary) => ({
      dayNumber: itinerary.dayNumber,
      title: itinerary.title,
      htmlDescription: itinerary.htmlDescription,
      distanceKm: itinerary.distanceKm ?? undefined,
      durationHours: itinerary.durationHours ?? undefined,
      places: itinerary.places.map((p) => ({
        placeId: p.placeId,
        order: p.order,
      })),
    })),
    faqs: pkg.faqs.length
      ? pkg.faqs.map((pf) => ({
          question: pf.faq.question,
          answer: pf.faq.answer,
        }))
      : undefined,
    groupDiscounts: pkg.groupDiscounts.length
      ? pkg.groupDiscounts.map((gd) => ({
          minPeople: gd.minPeople,
          price: gd.price.toNumber(),
        }))
      : undefined,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Package</h1>
        <p className="text-sm text-muted-foreground">
          Update details for {pkg.name}.
        </p>
      </div>

      <PackageEditForm packageId={pkg.id} initialValues={initialValues} />
    </div>
  )
}

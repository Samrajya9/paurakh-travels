// src/types/package.type.ts
import type { Prisma } from "@prisma/client"
import type { ImageAttachment } from "./image-attachment.type"
import { categorySelect } from "./category.type"
import { difficultySelect } from "./difficulty.type"
import { activitySelect } from "./activity.type"
import { seasonSelect } from "./season.type"
import { themeSelect } from "./theme.type"
import { itinerarySelect } from "./itinerary.type"
import { faqSelect } from "./faq.type"
import type { PackageGroupDiscount } from "./package-group-discount.type"
import { packageGroupDiscountSelect } from "./package-group-discount.type"
import { regionSelect } from "./region.type"
import { Pagination } from "./pagination.type"

export const packageSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  htmlOverview: true,
  basePrice: true,
  difficultyId: true,
  difficulty: {
    select: difficultySelect,
  },
  categoryId: true,
  category: {
    select: categorySelect,
  },
  regions: {
    select: {
      id: true,
      region: { select: regionSelect },
    },
  },

  activities: {
    select: {
      id: true,
      activity: {
        select: activitySelect,
      },
    },
  },
  seasons: {
    select: {
      id: true,
      season: {
        select: seasonSelect,
      },
    },
  },
  themes: {
    select: {
      id: true,
      theme: {
        select: themeSelect,
      },
    },
  },
  groupDiscounts: {
    select: packageGroupDiscountSelect,
    orderBy: { minPeople: "asc" },
  },
  itineraries: {
    select: itinerarySelect,
    orderBy: { dayNumber: "asc" },
  },
  faqs: {
    select: {
      id: true,
      packageId: true,
      faqId: true,
      order: true,
      faq: {
        select: faqSelect,
      },
    },
    orderBy: { order: "asc" },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PackageSelect

type PackagePayload = Prisma.PackageGetPayload<{
  select: typeof packageSelect
}>

export type Package = Omit<PackagePayload, "basePrice" | "groupDiscounts"> & {
  basePrice: number
  groupDiscounts: PackageGroupDiscount[]
  images: ImageAttachment[]
  metaData: {
    totalDuration: number
    maxElevation: number
    minPrice: number
  }
}

// Named list-item type instead of an inline Pick<> repeated in two places
export type PackageListItem = Pick<
  Package,
  | "id"
  | "name"
  | "slug"
  | "description"
  | "basePrice"
  | "images"
  | "metaData"
  | "difficultyId"
  | "difficulty"
>

export type PackageListResult = {
  packages: PackageListItem[]
  pagination: Pagination
}

import type { Prisma } from "@prisma/client"
import { ImageAttachment } from "./image-attachment.type"
import { categorySelect } from "./category.type"
import { difficultySelect } from "./difficulty.type"
import { activitySelect } from "./activity.type"
import { seasonSelect } from "./season.type"
import { themeSelect } from "./theme.type"
import { itinerarySelect } from "./itinerary.type"
import { faqSelect } from "./faq.type"
import { packageGroupDiscountSelect } from "./package-group-discount.type"
import { packageFaqSelect } from "./package-faq.type"

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

export type Package = Prisma.PackageGetPayload<{
  select: typeof packageSelect
}> & { images: ImageAttachment[] }

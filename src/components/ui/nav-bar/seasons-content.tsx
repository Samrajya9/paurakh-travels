// seasons-content.tsx
"use client"

import CategoryTabs from "./category-tabs"
import { mockNavBarData } from "@/lib/mock-nav-data"

export default function SeasonContent() {
  return <CategoryTabs data={mockNavBarData.seasons} leftLabel="SEASONS" />
}

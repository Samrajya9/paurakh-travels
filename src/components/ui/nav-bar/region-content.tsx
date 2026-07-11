// region-content.tsx
"use client"

import CategoryTabs from "./category-tabs"
import { mockNavBarData } from "@/lib/mock-nav-data"

export default function RegionContent() {
  return <CategoryTabs data={mockNavBarData.regions} leftLabel="REGIONS" />
}

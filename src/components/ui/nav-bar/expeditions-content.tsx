// expeditions-content.tsx
"use client"

import CategoryTabs from "./category-tabs"
import { mockNavBarData } from "@/lib/mock-nav-data"

export default function ExpeditionContent() {
  return (
    <CategoryTabs data={mockNavBarData.expeditions} leftLabel="ACTIVITIES" />
  )
}

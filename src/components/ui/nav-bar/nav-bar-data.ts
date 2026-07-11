import { mockNavBarData } from "@/lib/mock-nav-data"
import type { TravelPackage } from "./nav-travel-card"

export type NavItemConfig = {
  title: string
  url?: string
  data?: Record<string, TravelPackage[]>
}

export const navBarData: NavItemConfig[] = [
  { title: "expeditions", data: mockNavBarData.expeditions },
  { title: "regions", data: mockNavBarData.regions },
  { title: "seasons", data: mockNavBarData.seasons },
  { title: "about", url: "/about" },
]

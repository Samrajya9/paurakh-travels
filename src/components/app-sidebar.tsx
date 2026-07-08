"use client"

import * as React from "react"
import { FilePen, Frame, Map, MapPinHouse } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"

const data = {
  navMain: [
    {
      title: "Packages",
      url: "/admin/packages",
      icon: Map,
      isActive: true,
      items: [
        {
          title: "Listings",
          url: "/admin/packages/listings",
        },
        {
          title: "Itineraries",
          url: "#",
        },
        {
          title: "Difficulties",
          url: "/admin/packages/difficulties",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Region",
      url: "/admin/regions",
      icon: Frame,
    },
    {
      name: "Destinations",
      url: "/admin/destinations",
      icon: MapPinHouse,
    },
    {
      name: "Media",
      url: "/admin/media",
      icon: FilePen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

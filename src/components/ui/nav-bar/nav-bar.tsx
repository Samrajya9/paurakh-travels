"use client"

import { useRef, useState } from "react"
import { useAuth } from "@/context/auth.context"
import Link from "next/link"
import { Button } from "../button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Heart, Settings, ChevronDown } from "lucide-react"
import { Section, SectionContent } from "../section"
import { cn } from "@/lib/utils"
import { navBarData } from "./nav-bar-data"
import ExpeditionContent from "./expeditions-content"
import RegionContent from "./region-content"
import SeasonContent from "./seasons-content"
import MobileNav from "./mobile-nav"

// Desktop-only: maps each item's title to its mega-menu panel content.
// Kept separate from navBarData since these are JSX, not raw data.
const desktopPanels: Record<string, React.ReactNode> = {
  expeditions: <ExpeditionContent />,
  regions: <RegionContent />,
  seasons: <SeasonContent />,
}

const CLOSE_DELAY_MS = 150

export default function NavBar() {
  const { user, logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
  }

  const openMenu = (title: string) => {
    clearCloseTimeout()
    setActiveMenu(title)
  }

  const scheduleClose = () => {
    clearCloseTimeout()
    closeTimeout.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY_MS)
  }

  const activePanel = activeMenu ? desktopPanels[activeMenu] : null
  const isOpen = Boolean(activePanel)

  return (
    <Section asChild>
      <header
        className="relative z-40 bg-transparent"
        onMouseLeave={scheduleClose}
      >
        <SectionContent asChild constrained>
          <nav aria-label="Primary navigation">
            {/* Mobile row (logo + hamburger) — desktop grid below is hidden on mobile */}
            <MobileNav />

            {/* Desktop 3-column layout */}
            <div className="hidden grid-cols-3 items-center md:grid">
              {/* Left: logo */}
              <div className="flex justify-start">
                <Link href="/" className="text-xl font-semibold text-primary">
                  Paurakh Travels
                </Link>
              </div>

              {/* Middle: menu list */}
              <ul className="flex items-center justify-center gap-6">
                {navBarData.map((navItem) => {
                  if (!navItem.data) {
                    return (
                      <li key={navItem.title}>
                        <Button
                          asChild
                          variant="link"
                          className="font-hanken-grotesk text-base text-foreground hover:text-primary"
                        >
                          <Link href={navItem.url ?? "#"} className="uppercase">
                            {navItem.title}
                          </Link>
                        </Button>
                      </li>
                    )
                  }

                  const isActive = activeMenu === navItem.title

                  return (
                    <li
                      key={navItem.title}
                      onMouseEnter={() => openMenu(navItem.title)}
                    >
                      <Button
                        variant="link"
                        aria-expanded={isActive}
                        className="flex items-center gap-1 font-hanken-grotesk text-base text-foreground hover:text-primary"
                      >
                        <span className="uppercase">{navItem.title}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            isActive && "rotate-180"
                          )}
                        />
                      </Button>
                    </li>
                  )
                })}
              </ul>

              {/* Right: user actions */}
              <div className="flex items-center justify-end gap-3">
                {user ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <User className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-fit">
                      <DropdownMenuLabel className="px-8">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User className="mr-2 size-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/liked-packages">
                          <Heart className="mr-2 size-4" />
                          Liked Packages
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 size-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 size-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="flex items-center justify-center gap-2"
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </SectionContent>

        {/* Desktop-only full-width mega menu panel */}
        <div
          className={cn(
            "absolute inset-x-0 top-[80%] hidden border-t border-b bg-popover text-popover-foreground shadow-lg transition-all duration-200 md:block",
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          )}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        >
          <SectionContent className="py-8">{activePanel}</SectionContent>
        </div>
      </header>
    </Section>
  )
}

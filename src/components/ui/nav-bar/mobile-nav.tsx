"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { useAuth } from "@/context/auth.context"
import { Button } from "../button"
import { cn } from "@/lib/utils"
import { navBarData } from "./nav-bar-data"
import NavTravelCard from "./nav-travel-card"

// path: [] = root list, [itemTitle] = category list, [itemTitle, categoryKey] = packages
export default function MobileNav() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<string[]>([])

  const close = () => {
    setOpen(false)
    // wait for the slide-out transition before resetting, so it doesn't flash
    // back to the root screen while still visibly closing
    setTimeout(() => setPath([]), 300)
  }

  const activeItem = path[0]
    ? navBarData.find((item) => item.title === path[0])
    : undefined

  const breadcrumbs = ["nav", ...path]

  return (
    <>
      {/* Mobile top row: logo + hamburger */}
      <div className="flex items-center justify-between md:hidden">
        <Link href="/" className="text-xl font-semibold text-primary">
          Paurakh Travels
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-xl transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Top row: logo + close */}
        <div className="flex items-center justify-between border-b p-4">
          <Link
            href="/"
            className="text-xl font-semibold text-primary"
            onClick={close}
          >
            Paurakh Travels
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 overflow-x-auto border-b px-4 py-3 text-xs uppercase">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <span
                key={index}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                {index > 0 && <span className="text-muted-foreground">/</span>}
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => setPath(path.slice(0, index))}
                  className={cn(
                    isLast
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {crumb}
                </button>
              </span>
            )
          })}
        </div>

        {/* Drill-down content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Screen 0: root nav items */}
          {path.length === 0 && (
            <ul className="flex flex-col divide-y">
              {navBarData.map((item) => (
                <li key={item.title}>
                  {item.data ? (
                    <button
                      type="button"
                      onClick={() => setPath([item.title])}
                      className="group flex w-full items-center justify-between py-4 font-hanken-grotesk text-base text-foreground transition-colors hover:text-primary"
                    >
                      <span className="tracking-wide uppercase">
                        {item.title}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                    </button>
                  ) : (
                    <Link
                      href={item.url ?? "#"}
                      onClick={close}
                      className="flex w-full items-center py-4 font-hanken-grotesk text-base text-foreground transition-colors hover:text-primary"
                    >
                      <span className="tracking-wide uppercase">
                        {item.title}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Screen 1: category list for the selected item */}
          {path.length === 1 && activeItem?.data && (
            <ul className="flex flex-col divide-y">
              {Object.keys(activeItem.data).map((categoryKey) => (
                <li key={categoryKey}>
                  <button
                    type="button"
                    onClick={() => setPath([activeItem.title, categoryKey])}
                    className="group flex w-full items-center justify-between py-4 font-hanken-grotesk text-base text-foreground transition-colors hover:text-primary"
                  >
                    <span className="tracking-wide uppercase">
                      {categoryKey}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Screen 2: packages for the selected category */}
          {path.length === 2 && activeItem?.data && (
            <div className="flex flex-col gap-2">
              {activeItem.data[path[1]]?.length ? (
                activeItem.data[path[1]].map((pkg) => (
                  <div key={pkg.slug} onClick={close}>
                    <NavTravelCard pkg={pkg} />
                  </div>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  No packages yet.
                </span>
              )}
            </div>
          )}
        </div>

        {/* User section, pinned full width at the bottom */}
        <div className="border-t p-4">
          {user ? (
            <div className="flex flex-col gap-2">
              <span className="px-1 text-xs text-muted-foreground">
                {user.email}
              </span>
              <Button
                variant="outline"
                asChild
                className="w-full"
                onClick={close}
              >
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  logout()
                  close()
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full" onClick={close}>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

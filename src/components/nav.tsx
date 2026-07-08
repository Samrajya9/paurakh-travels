"use client"

import { useAuth } from "@/context/auth.context"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Heart, Settings, UserKey, UserLock } from "lucide-react"
import { Section } from "./ui/section"

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <Section
          asChild
          width="constrained"
          className="flex items-center justify-between bg-transparent py-6"
        >
          <nav aria-label="Primary navigation">
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold">
              Paurakh Travels
            </Link>

            {/* Navigation Links */}
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/packages">Packages</Link>
              </li>
              <li>
                <Link href="/destinations">Destinations</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            {/* Right-side actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-fit">
                    <DropdownMenuLabel>
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
          </nav>
        </Section>
      </header>
    </>
  )
}

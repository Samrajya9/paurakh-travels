"use client"

import { useAuth } from "@/context/auth.context"
import Link from "next/link"
import { Button } from "./ui/button"
import { UserKey, UserLock } from "lucide-react"
import { Section } from "./ui/section"

export default function NavBar() {
  const { user } = useAuth()
  return (
    // <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
    // <nav aria-label="Primary navigation" className="bg-transparent">

    // </nav>
    // </header>

    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <Section
          asChild
          width="constrained"
          background="transparent"
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
                <Button>
                  <UserLock />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="flex items-center justify-center gap-2"
                >
                  <Link href="/auth/login">
                    Login <UserKey className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </Section>
      </header>
    </>
  )
}

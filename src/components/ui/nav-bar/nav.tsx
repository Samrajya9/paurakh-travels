"use client"

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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LogOut, User, Heart, Settings } from "lucide-react"
import { Section } from "../section"
import { CategoryFlyout } from "./category-flyout"
import { mockNavBarData } from "@/lib/mock-nav-data"
import ExpeditionContent from "./expeditions-content"
import SeasonCotenet from "./seasons-content"

/**
 * Here navBarData is array of and object.
 * if the object has no children property then render NavigationMenuLink or else render NavigationMenuContent
 * children is render as NavigationMenuContent
 */
const navBarData = [
  {
    title: "expeditions",
    children: (
      <>
        <ExpeditionContent />
      </>
    ),
  },
  {
    title: "regions",
    children: (
      <>
        <CategoryFlyout
          items={[
            "Everest Region",
            "Annapurna Region",
            "Langtang Region",
            "Manaslu Region",
            "Mustang Region",
            "Dolpo Region",
          ]}
          data={mockNavBarData.regions}
          leftLabel="Regions"
        />
      </>
    ),
  },
  {
    title: "seasons",
    children: (
      <>
        <SeasonCotenet />
      </>
    ),
  },
  {
    title: "about",
    children: null,
    url: "/about",
  },
]

const noHoverBg =
  "hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent"

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <>
      <header>
        <Section
          asChild
          width="constrained"
          className="flex items-center justify-between bg-transparent py-6"
        >
          <nav aria-label="Primary navigation">
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold text-primary">
              Paurakh Travels
            </Link>

            {/* Navigation Links */}
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                {navBarData.map((navItem) => {
                  return (
                    <NavigationMenuItem key={navItem.title}>
                      {!navItem.children ? (
                        <Button
                          asChild
                          variant={"link"}
                          className="text-foreground hover:text-primary"
                        >
                          <NavigationMenuLink
                            asChild
                            className={` ${navigationMenuTriggerStyle()} text-base uppercase ${noHoverBg} `}
                          >
                            <Link href={navItem.url ?? "#"}>
                              {navItem.title}
                            </Link>
                          </NavigationMenuLink>
                        </Button>
                      ) : (
                        <>
                          <Button
                            asChild
                            variant={"link"}
                            className="text-foreground hover:text-primary"
                          >
                            <NavigationMenuTrigger
                              className={`text-base uppercase ${noHoverBg}`}
                            >
                              {navItem.title}
                            </NavigationMenuTrigger>
                          </Button>
                          <NavigationMenuContent>
                            {navItem.children}
                          </NavigationMenuContent>
                        </>
                      )}
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>

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
          </nav>
        </Section>
      </header>
    </>
  )
}

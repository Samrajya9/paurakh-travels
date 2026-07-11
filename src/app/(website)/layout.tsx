import { Playfair_Display, Hanken_Grotesk } from "next/font/google"

import { Footer } from "@/components/footer"
import { LikedPackagesProvider } from "@/context/liked-packages.context"
import { getCurrentUser } from "@/lib/auth-server"
import { getAllLikedPackageIdsForUser } from "@/services/user-package-like.service"
import { cn } from "@/lib/utils"
import NewNavBar from "@/components/ui/nav-bar/new-nav-bar"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken-grotesk",
})

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  const initialLikedPackageIds = user
    ? await getAllLikedPackageIdsForUser(user.id)
    : []

  return (
    <LikedPackagesProvider initialLikedPackageIds={initialLikedPackageIds}>
      {/* <NavBar /> */}
      <NewNavBar />
      <main className={cn(playfairDisplay.variable, hankenGrotesk.variable)}>
        {children}
      </main>
      <Footer />
    </LikedPackagesProvider>
  )
}

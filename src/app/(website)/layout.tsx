import { Footer } from "@/components/footer"
import NavBar from "@/components/nav"
import { LikedPackagesProvider } from "@/context/liked-packages.context"
import { getCurrentUser } from "@/lib/auth-server"
import { getAllLikedPackageIdsForUser } from "@/services/user-package-like.service"

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
    <>
      <LikedPackagesProvider initialLikedPackageIds={initialLikedPackageIds}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </LikedPackagesProvider>
    </>
  )
}

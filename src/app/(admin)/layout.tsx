import { getCurrentUser } from "@/lib/auth-server"
import { UserType } from "@/types/users-type.enum"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  if (!user) redirect("/auth/login")

  if (user?.user_type !== UserType.ADMIN) redirect("/")

  return <>{children}</>
}

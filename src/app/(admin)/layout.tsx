export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  //   if (user.user_type.toLowerCase() !== "admin") {
  //     redirect("/")
  //   }

  return <>{children}</>
}

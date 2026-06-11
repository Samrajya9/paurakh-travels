import { Footer } from "@/components/footer"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}

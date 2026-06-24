import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/context/auth.context"
import { getCurrentUser } from "@/lib/auth-server"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        poppins.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <body cz-shortcut-listen="true">
        <ThemeProvider>
          <AuthProvider initialUser={user}>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

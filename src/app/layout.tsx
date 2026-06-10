import { Geist_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/context/auth.context"
import { getCurrentUser } from "@/lib/auth-server"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
        fontMono.variable,
        "font-sans",
        spaceGrotesk.variable
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

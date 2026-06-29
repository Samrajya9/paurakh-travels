import { Geist_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/context/auth.context"
import { getCurrentUser } from "@/lib/auth-server"
import { getCompanyProfile } from "@/services/company-profile.service"
import { CompanyProfileProvider } from "@/context/company-profile-context"
import { TooltipProvider } from "@/components/ui/tooltip"

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
  let profile
  try {
    profile = await getCompanyProfile()
  } catch (error) {
    profile = null
  }

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
          <CompanyProfileProvider initialData={profile ?? undefined}>
            <AuthProvider initialUser={user}>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </CompanyProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

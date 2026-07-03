import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/context/auth.context"
import { getCurrentUser } from "@/lib/auth-server"
import { getCompanyProfile } from "@/services/company-profile.service"
import { CompanyProfileProvider } from "@/context/company-profile-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { DialogProvider } from "@/providers/dailog-provider"

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
        poppins.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <body cz-shortcut-listen="true">
        <ThemeProvider>
          <DialogProvider>
            <CompanyProfileProvider initialData={profile ?? undefined}>
              <AuthProvider initialUser={user}>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster />
              </AuthProvider>
            </CompanyProfileProvider>
          </DialogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

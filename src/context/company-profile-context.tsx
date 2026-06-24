"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { type getCompanyProfile } from "@/services/company-profile.service"

export type CompanyProfile = Awaited<ReturnType<typeof getCompanyProfile>>

interface CompanyProfileContextType {
  profile: CompanyProfile | null
  isLoading: boolean
}

const CompanyProfileContext = createContext<CompanyProfileContextType | null>(
  null
)

interface CompanyProfileProviderProps {
  children: React.ReactNode
  initialData?: CompanyProfile
}

export function CompanyProfileProvider({
  children,
  initialData,
}: CompanyProfileProviderProps) {
  const [profile, setProfile] = useState<CompanyProfile | null>(
    initialData ?? null
  )
  const [isLoading, setIsLoading] = useState(!initialData)

  const fetchProfile = useCallback(async () => {
    const response = await fetch("/api/company-profile")

    if (!response.ok) {
      throw new Error("Failed to fetch company profile.")
    }

    const data: CompanyProfile = await response.json()
    setProfile(data)
  }, [])

  useEffect(() => {
    if (initialData) return

    fetchProfile()
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [initialData, fetchProfile])

  return (
    <CompanyProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </CompanyProfileContext.Provider>
  )
}

export function useCompanyProfile(): CompanyProfileContextType {
  const ctx = useContext(CompanyProfileContext)
  if (!ctx) {
    throw new Error(
      "useCompanyProfile must be used within CompanyProfileProvider"
    )
  }
  return ctx
}

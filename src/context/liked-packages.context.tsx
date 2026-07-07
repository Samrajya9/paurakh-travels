"use client"

import { createContext, useCallback, useContext, useState } from "react"

export interface LikedPackagesContextType {
  likedPackageIds: Set<string>
  isLiked: (packageId: string) => boolean
  markLiked: (packageId: string) => void
  markUnliked: (packageId: string) => void
}

const LikedPackagesContext = createContext<LikedPackagesContextType | null>(
  null
)

interface LikedPackagesProviderProps {
  children: React.ReactNode
  initialLikedPackageIds: string[]
}

export function LikedPackagesProvider({
  children,
  initialLikedPackageIds,
}: LikedPackagesProviderProps) {
  const [likedPackageIds, setLikedPackageIds] = useState<Set<string>>(
    () => new Set(initialLikedPackageIds)
  )

  const markLiked = useCallback((packageId: string) => {
    setLikedPackageIds((prev) => {
      if (prev.has(packageId)) return prev
      const next = new Set(prev)
      next.add(packageId)
      return next
    })
  }, [])

  const markUnliked = useCallback((packageId: string) => {
    setLikedPackageIds((prev) => {
      if (!prev.has(packageId)) return prev
      const next = new Set(prev)
      next.delete(packageId)
      return next
    })
  }, [])

  const isLiked = useCallback(
    (packageId: string) => likedPackageIds.has(packageId),
    [likedPackageIds]
  )

  return (
    <LikedPackagesContext.Provider
      value={{ likedPackageIds, isLiked, markLiked, markUnliked }}
    >
      {children}
    </LikedPackagesContext.Provider>
  )
}

export function useLikedPackages(): LikedPackagesContextType {
  const context = useContext(LikedPackagesContext)

  if (!context) {
    throw new Error(
      "useLikedPackages must be used within a LikedPackagesProvider"
    )
  }

  return context
}

"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import {
  emptyPackageFilters,
  packageFiltersToSearchParams,
  type PackageFilterState,
} from "@/lib/package-filters"
import type { Package } from "@/types/package.type"
import type { Region } from "@/types/region.type"
import type { Difficulty } from "@/types/difficulty.type"
import type { Activity } from "@/types/activity.type"
import type { Theme } from "@/types/theme.type"
import type { Season } from "@/types/season.type"
import type { Category } from "@/types/category.type"
import type { PackageListItem } from "@/types/package.type"

type SingleFilterKey = "difficultyId" | "categoryId" | "q" // regionId removed
type ArrayFilterKey = "regionIds" | "activityIds" | "themeIds" | "seasonIds" // regionIds added

export interface ActiveFilterChip {
  /** unique React key — "regionId" for singles, "activityIds:cle123" for array entries */
  key: string
  label: string
  onRemove: () => void
}

interface FilterOptions {
  regions: Region[]
  difficulties: Difficulty[]
  activities: Activity[]
  themes: Theme[]
  seasons: Season[]
  categories: Category[]
}

interface PackageFiltersContextValue extends FilterOptions {
  filters: PackageFilterState
  packages: PackageListItem[]
  total: number
  isLoading: boolean
  activeFilters: ActiveFilterChip[]
  setFilter: (key: SingleFilterKey, value: string | undefined) => void
  toggleArrayFilter: (key: ArrayFilterKey, id: string) => void
  clearFilter: (key: keyof PackageFilterState) => void
  clearAll: () => void
}

const PackageFiltersContext =
  React.createContext<PackageFiltersContextValue | null>(null)

export function usePackageFilters() {
  const ctx = React.useContext(PackageFiltersContext)
  if (!ctx) {
    throw new Error(
      "usePackageFilters must be used within PackageFiltersProvider"
    )
  }
  return ctx
}

interface PackageFiltersProviderProps extends FilterOptions {
  initialFilters: PackageFilterState
  initialPackages: PackageListItem[]
  initialTotal: number
  children: React.ReactNode
}

export function PackageFiltersProvider({
  initialFilters,
  initialPackages,
  initialTotal,
  regions,
  difficulties,
  activities,
  themes,
  seasons,
  categories,
  children,
}: PackageFiltersProviderProps) {
  const pathname = usePathname()

  const [filters, setFilters] = React.useState(initialFilters)
  const [packages, setPackages] = React.useState(initialPackages)
  const [total, setTotal] = React.useState(initialTotal)
  const [isLoading, setIsLoading] = React.useState(false)

  const isFirstRender = React.useRef(true)
  const debouncedQuery = useDebouncedValue(filters.q, 400)
  const effectiveFilters = React.useMemo(
    () => ({ ...filters, q: debouncedQuery }),
    [filters, debouncedQuery]
  )

  // ---- fetch + URL mirror whenever effective filters change -------------
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const params = packageFiltersToSearchParams(effectiveFilters)
    const controller = new AbortController()
    setIsLoading(true)

    fetch(`/api/packages?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.packages)
        setTotal(data.pagination.total)
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err)
      })
      .finally(() => setIsLoading(false))

    const query = params.toString()
    window.history.replaceState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname
    )

    return () => controller.abort()
  }, [effectiveFilters, pathname])

  // ---- mutators -----------------------------------------------------------
  const setFilter = React.useCallback(
    (key: SingleFilterKey, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const toggleArrayFilter = React.useCallback(
    (key: ArrayFilterKey, id: string) => {
      setFilters((prev) => {
        const current = prev[key]
        const next = current.includes(id)
          ? current.filter((v) => v !== id)
          : [...current, id]
        return { ...prev, [key]: next }
      })
    },
    []
  )

  const clearFilter = React.useCallback((key: keyof PackageFilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : undefined,
    }))
  }, [])

  const clearAll = React.useCallback(
    () => setFilters(emptyPackageFilters()),
    []
  )

  // ---- derived: active filter chips ---------------------------------------
  // Lives in the context (not in PackageActiveFilters) so any consumer can
  // read a ready-to-render chip list without re-deriving labels itself.
  const activeFilters = React.useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = []

    for (const regionId of filters.regionIds) {
      const region = regions.find((r) => r.id === regionId)
      if (region) {
        chips.push({
          key: `regionIds:${regionId}`,
          label: region.name,
          onRemove: () => toggleArrayFilter("regionIds", regionId),
        })
      }
    }

    if (filters.difficultyId) {
      const difficulty = difficulties.find((d) => d.id === filters.difficultyId)
      if (difficulty) {
        chips.push({
          key: "difficultyId",
          label: difficulty.name,
          onRemove: () => clearFilter("difficultyId"),
        })
      }
    }

    if (filters.categoryId) {
      const category = categories.find((c) => c.id === filters.categoryId)
      if (category) {
        chips.push({
          key: "categoryId",
          label: category.name,
          onRemove: () => clearFilter("categoryId"),
        })
      }
    }

    for (const activityId of filters.activityIds) {
      const activity = activities.find((a) => a.id === activityId)
      if (activity) {
        chips.push({
          key: `activityIds:${activityId}`,
          label: activity.name,
          onRemove: () => toggleArrayFilter("activityIds", activityId),
        })
      }
    }

    for (const themeId of filters.themeIds) {
      const theme = themes.find((t) => t.id === themeId)
      if (theme) {
        chips.push({
          key: `themeIds:${themeId}`,
          label: theme.name,
          onRemove: () => toggleArrayFilter("themeIds", themeId),
        })
      }
    }

    for (const seasonId of filters.seasonIds) {
      const season = seasons.find((s) => s.id === seasonId)
      if (season) {
        chips.push({
          key: `seasonIds:${seasonId}`,
          label: season.name,
          onRemove: () => toggleArrayFilter("seasonIds", seasonId),
        })
      }
    }

    return chips
  }, [
    filters,
    regions,
    difficulties,
    categories,
    activities,
    themes,
    seasons,
    clearFilter,
    toggleArrayFilter,
  ])

  return (
    <PackageFiltersContext.Provider
      value={{
        filters,
        packages,
        total,
        isLoading,
        activeFilters,
        regions,
        difficulties,
        activities,
        themes,
        seasons,
        categories,
        setFilter,
        toggleArrayFilter,
        clearFilter,
        clearAll,
      }}
    >
      {children}
    </PackageFiltersContext.Provider>
  )
}

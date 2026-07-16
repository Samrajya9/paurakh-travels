export interface PackageFilterState {
  difficultyId?: string
  categoryId?: string
  regionIds: string[] // ← was regionId?: string (single)
  activityIds: string[]
  themeIds: string[]
  seasonIds: string[]
  q?: string
}

const SINGLE_KEYS = ["difficultyId", "categoryId", "q"] as const
const ARRAY_KEYS = [
  "regionIds",
  "activityIds",
  "themeIds",
  "seasonIds",
] as const

export function emptyPackageFilters(): PackageFilterState {
  return { regionIds: [], activityIds: [], themeIds: [], seasonIds: [] }
}

export function toURLSearchParams(
  sp: Record<string, string | string[] | undefined>
): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(sp)) {
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v))
    else if (value) params.set(key, value)
  }

  return params
}

export function parsePackageFilters(
  searchParams: URLSearchParams
): PackageFilterState {
  return {
    difficultyId: searchParams.get("difficultyId") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    regionIds: searchParams.get("regionIds")?.split(",").filter(Boolean) ?? [],
    activityIds:
      searchParams.get("activityIds")?.split(",").filter(Boolean) ?? [],
    themeIds: searchParams.get("themeIds")?.split(",").filter(Boolean) ?? [],
    seasonIds: searchParams.get("seasonIds")?.split(",").filter(Boolean) ?? [],
    q: searchParams.get("q") ?? undefined,
  }
}

export function packageFiltersToSearchParams(
  filters: PackageFilterState
): URLSearchParams {
  const params = new URLSearchParams()

  for (const key of SINGLE_KEYS) {
    const value = filters[key]
    if (value) params.set(key, value)
  }
  for (const key of ARRAY_KEYS) {
    const value = filters[key]
    if (value.length > 0) params.set(key, value.join(","))
  }

  return params
}

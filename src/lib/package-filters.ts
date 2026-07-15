export interface PackageFilterState {
  q?: string
  regionId?: string
  difficultyId?: string
  categoryId?: string
  activityIds: string[]
  themeIds: string[]
  seasonIds: string[]
}

const SINGLE_KEYS = ["regionId", "difficultyId", "categoryId", "q"] as const
const ARRAY_KEYS = ["activityIds", "themeIds", "seasonIds"] as const

export function emptyPackageFilters(): PackageFilterState {
  return { activityIds: [], themeIds: [], seasonIds: [] }
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
    regionId: searchParams.get("regionId") ?? undefined,
    difficultyId: searchParams.get("difficultyId") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
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

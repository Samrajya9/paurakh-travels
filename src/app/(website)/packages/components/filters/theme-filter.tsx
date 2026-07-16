import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { usePackageFilters } from "@/context/package-filters.context"
import { MultiSelectFilter } from "./multi-select-filter"

export default function ThemeFilter() {
  const { themes, filters, toggleArrayFilter } = usePackageFilters()
  return (
    <MultiSelectFilter
      title="Theme"
      options={themes}
      values={filters.themeIds}
      onToggle={(id) => toggleArrayFilter("themeIds", id)}
    />
  )
}

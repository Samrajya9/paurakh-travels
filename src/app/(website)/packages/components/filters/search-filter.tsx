// filters/search-filter.tsx
"use client"

import { Search, X } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { usePackageFilters } from "@/context/package-filters.context"

export default function SearchFilter() {
  const { filters, setFilter } = usePackageFilters()

  return (
    <div className="py-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="size-4" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search expeditions by name..."
          value={filters.q ?? ""}
          onChange={(e) => setFilter("q", e.target.value || undefined)}
        />

        {filters.q && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear search"
              onClick={() => setFilter("q", undefined)}
            >
              <X className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  )
}

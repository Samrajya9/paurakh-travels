"use client"

import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { type FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroSearchProps = {
  className?: string
}

export function HeroSearch({ className }: HeroSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    const destination = trimmed
      ? `/packages?q=${encodeURIComponent(trimmed)}`
      : "/packages"
    router.push(destination)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch",
        className,
      )}
      role="search"
      aria-label="Search treks and destinations"
    >
      <label htmlFor="hero-search" className="sr-only">
        Search treks, regions, or destinations
      </label>
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id="hero-search"
          name="q"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search treks, regions, or destinations…"
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/95 pr-4 pl-12 text-base text-foreground shadow-[0_8px_32px_oklch(0_0_0_/_0.18)] outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-xl px-6 text-sm font-semibold shadow-[0_8px_24px_oklch(0.45_0.16_42_/_0.35)]"
      >
        Find treks
      </Button>
    </form>
  )
}

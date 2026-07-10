"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

import type { Place } from "@/services/place.service"

const PlaceTable = () => {
  const router = useRouter()

  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlaces()
  }, [])

  async function fetchPlaces() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/destinations")
      if (!res.ok) throw new Error("Failed to fetch places")

      const data: Place[] = await res.json()
      setPlaces(data)
    } catch {
      setError("Something went wrong while loading places.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const prev = places
    setPlaces((curr) => curr.filter((d) => d.id !== id))

    const res = await fetch(`/api/places/${id}`, { method: "DELETE" })
    if (!res.ok) setPlaces(prev)
  }

  if (loading) return <PlaceTableSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={fetchPlaces}>
          Retry
        </Button>
      </div>
    )
  }

  if (places.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No places found.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Elevation (m)</TableHead>
          <TableHead>Coordinates</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {places.map((place) => (
          <TableRow key={place.id}>
            <TableCell className="font-medium">{place.name}</TableCell>
            <TableCell>{place.region.name}</TableCell>
            <TableCell>{place.elevation.toLocaleString()}</TableCell>
            <TableCell className="text-muted-foreground">
              {place.latitude != null && place.longitude != null
                ? `${place.latitude}, ${place.longitude}`
                : "—"}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/places/edit/${place.id}`)
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(place.id)}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function PlaceTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}
export default PlaceTable

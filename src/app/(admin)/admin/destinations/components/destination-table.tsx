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
import type { Destination } from "@/services/destination.service"

export default function DestinationTable() {
  const router = useRouter()

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDestinations()
  }, [])

  async function fetchDestinations() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/destinations")
      if (!res.ok) throw new Error("Failed to fetch destinations")

      const data: Destination[] = await res.json()
      setDestinations(data)
    } catch {
      setError("Something went wrong while loading destinations.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const prev = destinations
    setDestinations((curr) => curr.filter((d) => d.id !== id))

    const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" })
    if (!res.ok) setDestinations(prev)
  }

  if (loading) return <DestinationTableSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={fetchDestinations}>
          Retry
        </Button>
      </div>
    )
  }

  if (destinations.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No destinations found.
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
        {destinations.map((destination) => (
          <TableRow key={destination.id}>
            <TableCell className="font-medium">{destination.name}</TableCell>
            <TableCell>{destination.region.name}</TableCell>
            <TableCell>{destination.elevation.toLocaleString()}</TableCell>
            <TableCell className="text-muted-foreground">
              {destination.latitude != null && destination.longitude != null
                ? `${destination.latitude}, ${destination.longitude}`
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
                      router.push(`/admin/destinations/edit/${destination.id}`)
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(destination.id)}
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

function DestinationTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}

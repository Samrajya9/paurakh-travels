"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

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
import type { Package } from "@/services/package.service"

export default function PackageTable() {
  const router = useRouter()

  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPackages()
  }, [])

  async function fetchPackages() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/packages")
      if (!res.ok) throw new Error("Failed to fetch packages")

      const data: Package[] = await res.json()
      setPackages(data)
    } catch {
      setError("Something went wrong while loading packages.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const prev = packages
    setPackages((curr) => curr.filter((p) => p.id !== id))

    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" })
    if (!res.ok) setPackages(prev)
  }

  if (loading) return <PackageTableSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={fetchPackages}>
          Retry
        </Button>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No packages found.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Itineraries</TableHead>
          <TableHead>FAQs</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map((pkg) => (
          <TableRow key={pkg.id}>
            <TableCell className="font-medium">{pkg.name}</TableCell>
            <TableCell className="text-muted-foreground">{pkg.slug}</TableCell>
            <TableCell>{pkg.itineraries.length}</TableCell>
            <TableCell>{pkg.faqs.length}</TableCell>
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
                      router.push(`/admin/packages/edit/${pkg.id}`)
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(pkg.id)}
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

function PackageTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}

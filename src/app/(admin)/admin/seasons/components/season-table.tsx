"use client"

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
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDialogContext } from "@/hooks/use-dailog"
import { MODAL_REGISTRY } from "@/constants/modal/modal-component-registry"
import EditSeasonForm from "./edit-season-form"
import type { Season } from "@/services/season.service"

type SeasonTableProps = {
  seasons: Season[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onUpdated: (season: Season) => void
  onDeleted: (id: string) => void
}

export default function SeasonTable({
  seasons,
  loading,
  error,
  onRetry,
  onUpdated,
  onDeleted,
}: SeasonTableProps) {
  const { openModal, closeModal } = useDialogContext()

  function handleEdit(season: Season) {
    openModal(
      MODAL_REGISTRY.EDIT_SEASON_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Season</DialogTitle>
        </DialogHeader>
        <EditSeasonForm
          season={season}
          onSuccess={(updated) => {
            onUpdated(updated)
            closeModal(MODAL_REGISTRY.EDIT_SEASON_MODAL_ID)
          }}
        />
      </DialogContent>
    )
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/seasons/${id}`, { method: "DELETE" })
    if (res.ok) onDeleted(id)
  }

  if (loading) return <SeasonTableSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </div>
    )
  }

  if (seasons.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No seasons found.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seasons.map((season) => (
          <TableRow key={season.id}>
            <TableCell className="font-medium">{season.name}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(season)}>
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(season.id)}
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

function SeasonTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}

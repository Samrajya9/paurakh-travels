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
import EditActivityForm from "./edit-activity-form"
import type { Activity } from "@/services/activity.service"

type ActivityTableProps = {
  activities: Activity[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onUpdated: (activity: Activity) => void
  onDeleted: (id: string) => void
}

export default function ActivityTable({
  activities,
  loading,
  error,
  onRetry,
  onUpdated,
  onDeleted,
}: ActivityTableProps) {
  const { openModal, closeModal } = useDialogContext()

  function handleEdit(activity: Activity) {
    openModal(
      MODAL_REGISTRY.EDIT_ACTIVITY_MODAL_ID,
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <EditActivityForm
          activity={activity}
          onSuccess={(updated) => {
            onUpdated(updated)
            closeModal(MODAL_REGISTRY.EDIT_ACTIVITY_MODAL_ID)
          }}
        />
      </DialogContent>
    )
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/activities/${id}`, { method: "DELETE" })
    if (res.ok) onDeleted(id)
  }

  if (loading) return <ActivityTableSkeleton />

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

  if (activities.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No activities found.
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
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.name}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(activity)}>
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(activity.id)}
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

function ActivityTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}

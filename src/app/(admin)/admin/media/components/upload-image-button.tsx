"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function UploadImageButton() {
  const router = useRouter()
  return (
    <>
      <Button onClick={() => router.push("/admin/media/upload")}>
        Upload image
      </Button>
    </>
  )
}

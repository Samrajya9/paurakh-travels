import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import UploadImageForm from "../components/upload-image-form"

export default function MedaiUploadPage() {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col justify-center gap-4">
      <Link
        href="/admin/media"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to library
      </Link>

      <UploadImageForm />
    </div>
  )
}

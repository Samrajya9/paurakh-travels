import MediaGrid from "./components/media-grid"
import UploadImageButton from "./components/upload-image-button"

export default function MediaPage() {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold">Media</h1>
            <p className="text-sm text-muted-foreground">
              Manage the media used across.
            </p>
          </div>
          <UploadImageButton />
        </div>
        <MediaGrid />
      </div>
    </>
  )
}

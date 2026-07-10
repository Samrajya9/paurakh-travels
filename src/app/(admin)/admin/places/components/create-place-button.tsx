"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CreatePlaceButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/admin/places/create")
  }

  return (
    <>
      <Button onClick={handleClick} size={"lg"}>
        Create Place
      </Button>
    </>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CreateDestinationButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/admin/destinations/create")
  }

  return (
    <>
      <Button onClick={handleClick}>Create Destination</Button>
    </>
  )
}

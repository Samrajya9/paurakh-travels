"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const CreatePackageButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/admin/packages/create")
  }
  return (
    <Button className="w-max" size={"lg"} onClick={handleClick}>
      Create Package
    </Button>
  )
}

export default CreatePackageButton

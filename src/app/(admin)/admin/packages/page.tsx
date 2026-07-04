import { redirect } from "next/navigation"

const page = () => {
  return redirect("/admin/packages/listings")
}

export default page

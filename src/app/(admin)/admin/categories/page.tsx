import { getAllCategories } from "@/services/category.service"
import CategoryClientPage from "./components/category-client-page"

export default async function Page() {
  const categories = await getAllCategories()

  return <CategoryClientPage initialCategories={categories} />
}

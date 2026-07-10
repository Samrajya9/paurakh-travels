"use client"

import { useState } from "react"
import AddCategoryButton from "./add-category-btn"
import CategoryTable from "./category-table"
import type { Category } from "@/services/category.service"

export default function CategoryClientPage({
  initialCategories,
}: {
  initialCategories: Category[]
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchCategories() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Failed to fetch categories")

      const data: Category[] = await res.json()
      setCategories(data)
    } catch {
      setError("Something went wrong while loading categories.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage the categories used across packages.
          </p>
        </div>
        <AddCategoryButton
          onCreated={(category) =>
            setCategories((curr) =>
              [...curr, category].sort((a, b) => a.name.localeCompare(b.name))
            )
          }
        />
      </div>

      <CategoryTable
        categories={categories}
        loading={loading}
        error={error}
        onRetry={fetchCategories}
        onUpdated={(category) =>
          setCategories((curr) =>
            curr.map((item) => (item.id === category.id ? category : item))
          )
        }
        onDeleted={(id) =>
          setCategories((curr) => curr.filter((item) => item.id !== id))
        }
      />
    </div>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Editor } from "@tiptap/react"
import { Bold, Italic } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const HeadingOptions: {
  value: string
  label: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}[] = [
  { value: "H1", label: "Heading 1", level: 1 },
  { value: "H2", label: "Heading 2", level: 2 },
  { value: "H3", label: "Heading 3", level: 3 },
  { value: "H4", label: "Heading 4", level: 4 },
  { value: "H5", label: "Heading 5", level: 5 },
  { value: "H6", label: "Heading 6", level: 6 },
]

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null
  return (
    <div className="flex items-center gap-1 border-b border-input px-2 py-1">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
        <SelectContent>
          {HeadingOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({
                    level: option.level,
                  })
                  .run()
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn("hover:bg-primary hover:text-primary-foreground", {
          "bg-primary text-primary-foreground": editor.isActive("bold"),
        })}
      >
        <Bold className="size-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn("hover:bg-primary hover:text-primary-foreground", {
          "bg-primary text-primary-foreground": editor.isActive("italic"),
        })}
      >
        <Italic className="size-4" />
      </Button>
    </div>
  )
}

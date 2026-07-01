"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react"

const headingButtons = [
  { level: 1 as const, icon: Heading1 },
  { level: 2 as const, icon: Heading2 },
  { level: 3 as const, icon: Heading3 },
  { level: 4 as const, icon: Heading4 },
  { level: 5 as const, icon: Heading5 },
  { level: 6 as const, icon: Heading6 },
]

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null
  return (
    <div className="flex items-center gap-1 border-b border-input px-2 py-1">
      {headingButtons.map(({ level, icon: Icon }) => (
        <Button
          key={level}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={cn("hover:bg-primary hover:text-primary-foreground", {
            "bg-primary text-primary-foreground": editor.isActive("heading", {
              level,
            }),
          })}
        >
          <Icon className="size-4" />
        </Button>
      ))}

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

"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { cn } from "@/lib/utils"
import ToolBar from "./tool-bar"
import Heading from "@tiptap/extension-heading"

const headingClasses: Record<number, string> = {
  1: "text-4xl font-bold text-red-600",
  2: "text-3xl font-bold text-blue-500",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base font-medium",
}

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        renderHTML(attributes) {
          return {
            class: headingClasses[attributes.level] ?? "",
          }
        },
      },
    }
  },
})

export default function RichTextEditor({
  value,
  onChange,
  className,
  "aria-invalid": ariaInvalid,
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  "aria-invalid"?: boolean
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
      }),
      CustomHeading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "outline-none h-full px-2 py-1.5 text-sm md:text-xs/relaxed",
      },
    },
  })

  if (!editor) return null

  return (
    <div
      aria-invalid={ariaInvalid}
      className={cn(
        "w-full min-w-0 rounded-md border border-input bg-input/20 transition-colors",
        "h-64",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
    >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className="h-full" />
    </div>
  )
}

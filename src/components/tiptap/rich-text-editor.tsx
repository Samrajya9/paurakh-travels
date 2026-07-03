"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { cn } from "@/lib/utils"
import ToolBar from "./tool-bar"
import Heading from "@tiptap/extension-heading"
import Underline from "@tiptap/extension-underline"

import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list"
import Blockquote from "@tiptap/extension-blockquote"

import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table"
import { headingVariants } from "../ui/heading"

const headingClasses: Record<number, string> = {
  1: headingVariants({ variant: "h1" }),
  2: headingVariants({ variant: "h2" }),
  3: headingVariants({ variant: "h3" }),
  4: headingVariants({ variant: "h4" }),
  5: headingVariants({ variant: "h5" }),
  6: headingVariants({ variant: "h6" }),
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
        underline: false,
        orderedList: false,
        bulletList: false,
        listItem: false,
        blockquote: false,
      }),
      CustomHeading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),

      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-6",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "my-0.5",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class:
            "border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse border border-border w-full my-2",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border bg-muted font-semibold p-2 text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border p-2 align-top",
        },
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
    <>
      <div
        aria-invalid={ariaInvalid}
        className={cn(
          "w-full min-w-0 rounded-md border border-input bg-input/20 transition-colors",
          "min-h-64",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
          "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
          "dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          "[&_.ProseMirror]:overflow-x-auto",
          className
        )}
      >
        <ToolBar editor={editor} />
        <EditorContent editor={editor} className="h-full" />
      </div>
    </>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Table as TableIcon,
  Rows3,
  Columns3,
  Trash2,
} from "lucide-react"

const headingButtons = [
  { level: 1 as const, icon: Heading1, label: "Heading 1" },
  { level: 2 as const, icon: Heading2, label: "Heading 2" },
  { level: 3 as const, icon: Heading3, label: "Heading 3" },
  { level: 4 as const, icon: Heading4, label: "Heading 4" },
  { level: 5 as const, icon: Heading5, label: "Heading 5" },
  { level: 6 as const, icon: Heading6, label: "Heading 6" },
]

function ToolBarButton({
  onClick,
  active,
  disabled,
  icon: Icon,
  label,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={onClick}
          aria-label={label}
          className={cn("hover:bg-primary hover:text-primary-foreground", {
            "bg-primary text-primary-foreground": active,
          })}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-wrap items-center gap-1 border-b border-input px-2 py-1">
        {headingButtons.map(({ level, icon: Icon, label }) => (
          <ToolBarButton
            key={level}
            icon={Icon}
            label={label}
            active={editor.isActive("heading", { level })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          />
        ))}

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolBarButton
          icon={Bold}
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolBarButton
          icon={Italic}
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolBarButton
          icon={Underline}
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolBarButton
          icon={Strikethrough}
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolBarButton
          icon={List}
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolBarButton
          icon={ListOrdered}
          label="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolBarButton
          icon={Quote}
          label="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolBarButton
          icon={Minus}
          label="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolBarButton
          icon={Undo}
          label="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolBarButton
          icon={Redo}
          label="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />
        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolBarButton
          icon={TableIcon}
          label="Insert table"
          active={editor.isActive("table")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 1, withHeaderRow: true })
              .run()
          }
        />

        {editor.isActive("table") && (
          <>
            <ToolBarButton
              icon={Rows3}
              label="Add row after"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            />
            <ToolBarButton
              icon={Columns3}
              label="Add column after"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            />
            <ToolBarButton
              icon={Trash2}
              label="Delete table"
              onClick={() => editor.chain().focus().deleteTable().run()}
            />
          </>
        )}
      </div>
    </TooltipProvider>
  )
}

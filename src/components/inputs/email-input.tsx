"use client"

import { Mail } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"

type EmailInputProps = Omit<React.ComponentProps<"input">, "type">

export function EmailInput({ className, ...props }: EmailInputProps) {
  return (
    <InputGroup className={className}>
      <InputGroupAddon align="inline-start">
        <InputGroupButton size="icon-sm">
          <Mail />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput type="email" autoComplete="email" {...props} />
    </InputGroup>
  )
}

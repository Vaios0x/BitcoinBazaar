import React from "react"
import { cn } from "@/lib/utils"

export interface InputProps {
  className?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  disabled?: boolean
  name?: string
}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

Input.displayName = "Input"

export { Input }
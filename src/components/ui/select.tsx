import React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps {
  className?: string
  children?: any
  value?: string
  onChange?: (e: any) => void
  name?: string
  disabled?: boolean
}

const Select = ({ className, children, ...props }: SelectProps) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-stacks-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

Select.displayName = "Select"

export { Select }
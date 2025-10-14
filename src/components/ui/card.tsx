import React from "react"
import { cn } from "@/lib/utils"

const Card = ({ className, children, ...props }: any) => (
  <div
    className={cn(
      "glass-card rounded-2xl border border-white/10 bg-white/5 text-white shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ className, children, ...props }: any) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    {children}
  </div>
)

const CardTitle = ({ className, children, ...props }: any) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
)

const CardDescription = ({ className, children, ...props }: any) => (
  <p
    className={cn("text-sm text-gray-400", className)}
    {...props}
  >
    {children}
  </p>
)

const CardContent = ({ className, children, ...props }: any) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ className, children, ...props }: any) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  >
    {children}
  </div>
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
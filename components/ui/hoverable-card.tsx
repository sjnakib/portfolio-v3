"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface HoverableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
  noHover?: boolean
}

/**
 * A reusable card component with hover animations and styling
 * that can be used across the application to maintain visual consistency
 */
export function HoverableCard({
  children,
  className,
  noPadding = false,
  noHover = false,
  ...props
}: HoverableCardProps) {
  return (
    <div
      className={cn(
        "border-2 border-primary/20 rounded-md bg-muted/5 shadow-sm",
        !noHover && "hover:border-primary/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1",
        !noPadding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Decorative corners for the HoverableCard
 */
export function CardCorners({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40 rounded-tl-sm", className)}></div>
      <div className={cn("absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/40 rounded-tr-sm", className)}></div>
      <div className={cn("absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/40 rounded-bl-sm", className)}></div>
      <div className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40 rounded-br-sm", className)}></div>
    </>
  )
}

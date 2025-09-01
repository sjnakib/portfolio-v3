"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TechIcon } from "@/components/ui/tech-icon"
import { cn } from "@/lib/utils"

export interface TechBadgeProps {
  name: string
  icon: string
  color: string
  description?: string
  url?: string
  className?: string
}

export function TechBadge({ name, icon, color, description, url, className }: TechBadgeProps) {
  const [isHovering, setIsHovering] = useState(false)

  // Convert hex color to RGB for subtle border effect
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }
  
  const rgb = hexToRgb(color)
  
  // Keep the hover effect very minimal
  const hoverStyle = isHovering ? {
    borderColor: color,
    color: color,
  } : {}
  
  // Simply show the tech name - no icons or fancy effects
  const badgeContent = (
    <span className="block text-center">{name}</span>
  )

  return (
    <div className="flex-shrink-0">
      <Badge
        variant="secondary"
        className={cn(
          "tech-badge text-base px-3 py-1.5 cursor-default border border-transparent transition-colors text-center",
          className
        )}
        style={hoverStyle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {badgeContent}
      </Badge>
    </div>
  )
}

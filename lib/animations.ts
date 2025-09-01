// Animation variants for hover effects, transitions, and interactivity

/**
 * Converts a hex color to RGB components
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

/**
 * Generate a glow style for tech badges
 */
export function generateGlowStyle(color: string, isHovering: boolean) {
  if (!isHovering) return {}
  
  const rgb = hexToRgb(color)
  return {
    boxShadow: `0 0 4px 1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
    borderColor: color,
    // Reduce or eliminate background change to prevent layout shifts
    color: color,
    transition: "color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
  }
}

/**
 * Technology Easter Egg Animations
 */
export const techAnimations = {
  react: "tech-icon-spin",
  git: "tech-icon-bounce"
}

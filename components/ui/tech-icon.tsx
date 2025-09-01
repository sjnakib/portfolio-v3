"use client"

import { 
  Cpu, 
  Code, 
  FileCode, 
  GitBranchPlus, 
  Monitor, 
  Layers, 
  PenTool,
  Palette,
  Terminal,
  TerminalSquare,
  LucideProps
} from "lucide-react"

// Define the TechIcon component props
export interface TechIconProps extends LucideProps {
  icon: string;
  color?: string;
}

export const techIconMap: Record<string, React.ComponentType<LucideProps>> = {
  // Core tech stack
  react: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 6.75c-3.17 0-6.75 1.407-6.75 4.5 0 3.094 3.58 4.5 6.75 4.5s6.75-1.406 6.75-4.5c0-3.093-3.58-4.5-6.75-4.5zm-8.25 4.5c0-4.142 4.464-6 8.25-6s8.25 1.858 8.25 6-4.464 6-8.25 6-8.25-1.858-8.25-6z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.358 3.96c-.174-.058-.353.04-.412.215l-.007.021c-.896 2.798-2.374 5.476-4.359 8.024-1.985 2.546-4.244 4.895-6.7 6.564a.375.375 0 00.401.633c2.614-1.77 4.957-4.24 7.003-6.866 2.047-2.627 3.57-5.403 4.504-8.323l.007-.02a.375.375 0 00-.215-.412l-.222-.07z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.642 3.96c.174-.058.353.04.412.215l.007.021c.896 2.798 2.374 5.476 4.359 8.024 1.985 2.546 4.244 4.895 6.7 6.564a.375.375 0 01-.401.633c-2.614-1.77-4.957-4.24-7.003-6.866-2.047-2.627-3.57-5.403-4.504-8.323l-.007-.02a.375.375 0 01.215-.412l.222-.07z" fill="currentColor" />
    </svg>
  ),
  nextjs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path 
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-.78-1.963-1.698l-1.92-1.671-2.404-2.226-2.381-2.203-.04-.035a.947.947 0 0 0-.305-.21c-.078-.028-.09-.045-.09-.211 0-.19-.012-.291-.091-.416a.732.732 0 0 0-.457-.241c-.102-.012-.134-.026-.157-.083a6.411 6.411 0 0 1-.033-.433L8.751 8.47V4.227c0-2.688-.008-4.287-.018-4.33a.613.613 0 0 0-.198-.32c-.14-.112-.265-.143-.754-.143h-.421l.613 8.687c-.004 3.667-.004 7.553-.004 10.46 0 .267-.03.326-.18.326-.08 0-.131-.02-.18-.066l-.41.352c-.779.78-1.584 1.605-2.388 2.427l-1.513 1.556-.273.279-.136.142.135.157a11.7 11.7 0 0 0 3.35 2.324 12.414 12.414 0 0 0 5.942 1.052c6.843-.307 12.207-6.13 12.07-13.036-.136-6.85-5.895-12.803-12.683-12.837-.194-.003-.387-.003-.578-.003z" 
        fill="currentColor"
      />
    </svg>
  ),
  nodejs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 1.817L2.25 7.5v9l9.75 5.683 9.75-5.683v-9L12 1.817zM5.893 11.293l-.466.267v-2.57l.466-.267 5.107-2.939V3.35L12.107 3l1.107.35v2.434l5.107 2.939.466.267v2.57l-.466.267-5.107 2.939v4.868L12.107 21l-1.107-.35v-4.868l-5.107-2.939z" fill="currentColor" />
    </svg>
  ),
  typescript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 3h18v18H3V3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M13.5 12.6v4.8c.4.2.8.3 1.2.4.5.1 1 .2 1.5.2.5 0 1-.1 1.4-.2.4-.1.8-.3 1.1-.6.3-.3.5-.6.7-.9.1-.4.2-.8.2-1.3 0-.4-.1-.7-.2-1-.1-.3-.3-.5-.5-.7-.2-.2-.5-.4-.8-.5-.3-.2-.7-.4-1.1-.6-.3-.1-.6-.3-.8-.4-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.2-.3-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3.1-.1.1-.2.2-.2.1-.1.2-.1.4-.2.1 0 .3-.1.5-.1.2 0 .5 0 .7.1.2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.2.5.3v-2.3c-.4-.1-.7-.2-1.1-.3-.4 0-.8-.1-1.3-.1-.5 0-.9.1-1.4.2-.4.1-.8.3-1.1.6-.3.3-.6.6-.8.9-.2.4-.3.8-.3 1.3 0 .7.1 1.2.4 1.6.3.4.7.8 1.2 1.1.5.3 1.1.6 1.8.9.3.1.5.2.8.3.2.1.4.2.6.3.2.1.3.2.4.3.1.1.1.2.1.4 0 .1 0 .2-.1.3 0 .1-.1.2-.2.3-.1.1-.2.1-.4.2-.2 0-.4.1-.6.1-.3 0-.5 0-.8-.1-.3 0-.5-.1-.7-.2-.2-.1-.4-.2-.6-.3-.2-.1-.4-.2-.6-.3zM12 8H8.4v8h-2V8H3V6h9v2z" fill="currentColor" />
    </svg>
  ),
  figma: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8.5 2h3.5v6h-3.5a3 3 0 0 1 0-6z" fill="currentColor" />
      <path d="M12 2h3.5a3 3 0 1 1 0 6h-3.5v-6z" fill="currentColor" />
      <path d="M12 14v-6h3.5a3 3 0 1 1 0 6h-3.5z" fill="currentColor" />
      <path d="M8.5 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" />
      <path d="M8.5 14a3 3 0 1 0 3 3v-3h-3z" fill="currentColor" />
    </svg>
  ),
  git: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M22 12l-9.13-9.14A1.53 1.53 0 0011.6 2.5a1.53 1.53 0 00-1.41.47L8.65 4.5h0L2.5 10.65a1.55 1.55 0 000 2.19L11.86 22a1.55 1.55 0 002.19 0l.87-.87L21.4 14l.6-.6a1.55 1.55 0 000-2.19v0" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="12" r="1.5" stroke="currentColor" fill="currentColor" />
      <circle cx="12" cy="17" r="1.5" stroke="currentColor" fill="currentColor" />
      <circle cx="17" cy="12" r="1.5" stroke="currentColor" fill="currentColor" />
    </svg>
  ),
  linux: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 6.5c-2.5 0-4.5 2-4.5 4.5 0 1.5.76 2.8 1.9 3.6.5.3 1.3.7 1.1 1.3-.2.5-.6.7-1.2 1-.5.2-1 .6-1 1.3V19c0 .6.4 1 1 1h5.5c.6 0 1-.4 1-1v-.8c0-.7-.5-1.1-1-1.3-.6-.3-1-.5-1.2-1-.2-.6.6-1 1.1-1.3 1.2-.8 1.9-2.1 1.9-3.6 0-2.5-2-4.5-4.5-4.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4c-3.9 0-7 3.1-7 7v2.5c0 .8-.7 1.5-1.5 1.5v0c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5v-1c0-.3-.2-.5-.5-.5v0c-.8 0-1.5-.7-1.5-1.5V11c0-3.9-3.1-7-7-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Defaults for other tech
  default: Code
}

export function TechIcon({ icon, color, ...props }: TechIconProps) {
  const IconComponent = techIconMap[icon.toLowerCase()] || techIconMap.default
  
  return (
    <div className="tech-icon" style={{ color: color || 'currentColor' }}>
      <IconComponent {...props} />
    </div>
  )
}

import Link from "next/link"
import { Github, Linkedin, Mail, X } from "lucide-react"

export function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left section */}
          <div className="space-y-4">
            <p className="text-sm font-mono text-primary/80">// Design, Code, Innovate</p>
            <p className="text-muted-foreground text-pretty">
              Frontend & UI/UX Developer passionate about creating innovative solutions with modern technologies.
              Building digital experiences that make an impact.
            </p>
          </div>
          
          {/* Center section - Social Links */}
          <div className="flex justify-center space-x-5">
            <Link
              href="https://github.com/username"
              className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/username"
              className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/username"
              className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
          
          {/* Right section - Contact */}
          <div className="flex flex-col items-start md:items-end">
            <Link
              href="mailto:shafaat@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              shafaat@example.com
            </Link>
            <p className="text-sm text-muted-foreground/70 mt-4">
              &copy; {currentYear} Shafaat Jamil Nakib. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shafaat Jamil Nakib. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

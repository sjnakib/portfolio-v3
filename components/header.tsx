"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Download } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  // Detect scroll for enhanced header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Check if a link is active
  const isActive = (path: string) => pathname === path

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 ${
      isScrolled ? "bg-background/80 shadow-sm" : "bg-background/60"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo/Name */}
          <Link 
            href="/" 
            className="text-xl font-bold text-foreground hover:scale-105 transition-all duration-300"
          >
            Shafaat Jamil Nakib
          </Link>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex space-x-1">
              {[
                { name: "Home", path: "/" },
                { name: "My Projects", path: "/projects" },
                { name: "Academic", path: "/academic" },
                { name: "About Me", path: "/about" }
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 mx-1 text-sm font-medium transition-colors duration-300
                    ${isActive(link.path) 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-primary transform -translate-x-1/2" />
                  )}
                </Link>
              ))}
            </div>
          </nav>
          
          {/* Right Section - Contact/Resume/Theme */}
          <div className="flex items-center space-x-4">
            <Button className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="hidden md:flex">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
                <Download className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/academic"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Academic
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button variant="outline" size="sm" className="w-fit bg-transparent" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

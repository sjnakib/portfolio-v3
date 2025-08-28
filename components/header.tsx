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
    <header className={`sticky top-0 z-50 w-full backdrop-blur-[10px] transition-all duration-300 ${
      isScrolled ? "bg-[rgba(20,20,20,0.8)] shadow-sm" : "bg-[rgba(20,20,20,0.8)]"
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
                { name: "Projects", path: "/projects" },
                { name: "Academics", path: "/academic" },
                { name: "About Me", path: "/about" }
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 mx-1 text-base font-medium transition-all duration-300
                    ${isActive(link.path) 
                      ? "text-white" 
                      : "text-gray-300 hover:text-white"
                    } group`}
                >
                  <span>{link.name}</span>
                  <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`} />
                </Link>
              ))}
            </div>
          </nav>
          
          {/* Right Section - Contact/Resume/Theme */}
          <div className="flex items-center space-x-4">
            <Button className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300" asChild>
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="hidden md:flex hover:bg-primary/10 transition-all duration-300">
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
          <div className="md:hidden fixed inset-0 bg-[rgba(20,20,20,0.95)] backdrop-blur-md z-50 flex flex-col justify-center">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col items-center space-y-6 px-4 py-6 text-center">
              <Link
                href="/"
                className="text-xl font-medium text-white hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-xl font-medium text-white hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/academic"
                className="text-xl font-medium text-white hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Academics
              </Link>
              <Link
                href="/about"
                className="text-xl font-medium text-white hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                href="/contact"
                className="text-xl font-medium text-white hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button variant="outline" size="lg" className="mt-4 w-fit bg-transparent border-white text-white hover:bg-white/10" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
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

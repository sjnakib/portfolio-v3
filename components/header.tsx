"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

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
    <header className={`fixed top-0 z-50 w-full backdrop-blur transition-all duration-300 ${
      isScrolled ? "bg-background/80 shadow-sm border-b border-primary/30" : "bg-background/30 border-b border-primary/20"
    }`}>
      <div className="w-full px-3 sm:container sm:mx-auto sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo/Name (visible on all devices) */}
          <Link 
            href="/" 
            className="relative px-4 py-[0.4rem] border border-primary/80 rounded-[50px] group hover:scale-105 transition-all duration-300"
          >
            <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full mr-1.5 group-hover:scale-110 transition-transform duration-300 translate-y-[0.5px]"></span>
              <span className="inline-block">sjnakib</span>
            </span>
          </Link>

          {/* Center Section - Navigation (desktop only) */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex space-x-1">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
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
          
          {/* Right Section - Theme/Contact (desktop) or Hamburger (mobile) */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
            {/* Contact Me button - only visible on desktop */}
            <div className="hidden md:block">
              <Button className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/contact">
                  Contact Me
                </Link>
              </Button>
            </div>
            {/* Mobile Menu Button - Moved to rightmost with proper spacing */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="mr-1 h-10 w-10 flex items-center justify-center relative">
                <div className="transform scale-[1.8] flex items-center justify-center">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
                { name: "Academic", path: "/academic" },
                { name: "About Me", path: "/about" }
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
                    ${isActive(link.path)
                      ? "text-foreground font-bold bg-primary/10 border-l-4 border-primary pl-2" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Contact Me button added to mobile menu */}
              <div className="pt-4 mt-2 border-t">
                <Button className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Contact Me
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

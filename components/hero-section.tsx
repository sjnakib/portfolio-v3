"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowRight, MessageSquare } from "lucide-react"
import { useViewportHeight } from "@/hooks/use-viewport-height"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Hello! I'm Shafaat."
  const typeSpeed = 100
  const skills = ["React", "Next.js", "Node.js", "TypeScript", "MySQL", "PostgreSQL", "Mongo", "Python", "Figma", "Linux", "Git"]
  
  // Use the viewport height hook
  useViewportHeight()
  
  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, typeSpeed)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="h-screen min-h-[calc(var(--vh,1vh)*100)] px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary animate-pulse-slow hidden md:block">
                <Image 
                  src="/placeholder-user.jpg" 
                  alt="Avatar" 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
              </div>
              <p className="text-lg text-muted-foreground font-light">
                {typedText}<span className="animate-pulse">|</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground transition-all hover:scale-[1.05] duration-300">FULL-STACK &</span>
                <span className="block text-orange-400 transition-all hover:scale-[1.05] duration-300">UI/UX</span>
                <span className="block text-cyan-500 transition-all hover:scale-[1.05] duration-300">DEVELOPER</span>
              </h1>
              
              <p className="text-base text-muted-foreground flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Dhaka, Bangladesh
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="group bg-primary text-primary-foreground" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Connect
                </Link>
              </Button>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-base font-medium text-muted-foreground uppercase tracking-wide">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Profile Image (hidden on mobile) */}
          <div className="hidden md:flex justify-center lg:justify-end">
            <div className="w-80 h-80 rounded-full bg-muted flex items-center justify-center border-4 border-border">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79 4 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Profile Photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

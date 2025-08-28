"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowRight, MessageSquare } from "lucide-react"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Hello, I'm Shafaat Jamil Nakib"
  const typeSpeed = 100
  const skills = ["React", "Next.js", "Node.js", "TypeScript", "MySQL", "Python", "Figma", "ROS"]
  
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary animate-pulse-slow">
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
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-foreground transition-all hover:scale-[1.01] duration-300">FULL-STACK &</span>
                <span className="block text-primary transition-all hover:scale-[1.01] duration-300">ROBOTICS</span>
                <span className="block text-cyan-500 transition-all hover:scale-[1.01] duration-300">ENGINEER</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                I create digital experiences that border on <span className="text-primary">efficiency</span>, 
                <span className="text-cyan-500"> aesthetics</span> and 
                <span className="text-emerald-500"> functionality</span>.
              </p>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-mono">// Based in Dhaka, Bangladesh</p>
              <p className="font-mono">// UI/UX Designer</p>
              <p className="font-mono">// Full Stack Developer</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-primary text-primary-foreground" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Let's Connect
                </Link>
              </Button>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 rounded-full bg-muted flex items-center justify-center border-4 border-border">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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

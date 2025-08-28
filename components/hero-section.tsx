"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowRight, MessageSquare } from "lucide-react"
import {
  fadeIn,
  fadeInUp,
  heroAvatar,
  heroTitle,
  heroButton,
  heroTag,
  staggerContainer
} from "@/lib/animations"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const fullText = "Hello, I'm Shafaat Jamil Nakib"
  const skills = ["React", "Next.js", "Node.js", "TypeScript", "MySQL", "Python", "Figma"]
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Mouse movement tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      
      const centerX = width / 2
      const centerY = height / 2
      
      setMousePosition({
        x: (x - centerX) / 25,
        y: (y - centerY) / 25
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  
  // Typewriter effect with variable typing rhythm
  useEffect(() => {
    if (!isLoaded) return
    
    let currentIndex = 0
    const getRandomTypeSpeed = (index: number, total: number) => {
      // Faster in the middle, slower at beginning and end
      const progress = index / total
      if (progress < 0.2 || progress > 0.8) {
        return Math.random() * 50 + 100 // 100-150ms
      } else {
        return Math.random() * 30 + 50 // 50-80ms
      }
    }
    
    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
        
        const speed = getRandomTypeSpeed(currentIndex, fullText.length)
        setTimeout(typeNextChar, speed)
      }
    }
    
    setTimeout(typeNextChar, 500) // Initial delay
    
    return () => {
      currentIndex = fullText.length + 1 // Stop typing if component unmounts
    }
  }, [isLoaded])

  return (
    <motion.section 
      ref={containerRef}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F172A] relative overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        {/* Abstract shapes */}
        <motion.div 
          className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/5"
          animate={{ 
            x: mousePosition.x * -0.5, 
            y: mousePosition.y * -0.5,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-gradient-to-l from-cyan-500/10 to-primary/5"
          animate={{ 
            x: mousePosition.x * 0.3, 
            y: mousePosition.y * 0.3,
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        
        {/* Particle effect would be added with a dedicated library for production */}
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-10">
            {/* Avatar & Greeting */}
            <div className="flex items-center space-x-4">
              <motion.div 
                variants={heroAvatar}
                className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary"
                style={{
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                }}
              >
                <Image 
                  src="/placeholder-user.jpg" 
                  alt="Avatar" 
                  fill 
                  className="object-cover"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"
                  animate={{ 
                    opacity: [0.5, 0.7, 0.5] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              <p className="text-xl text-white/90 font-light">
                {typedText}<span className="animate-pulse">|</span>
              </p>
            </div>
            
            {/* Main title/profession */}
            <div className="space-y-4">
              <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-[#4361EE] to-[#9D4EDD] pb-2"
                  variants={heroTitle}
                  custom={0}
                  style={{
                    textShadow: "0 0 40px rgba(99, 102, 241, 0.2)",
                    transform: `rotate(${mousePosition.x * 0.01}deg)`
                  }}
                >
                  FULL-STACK
                </motion.span>
                
                <motion.span 
                  className="block text-[#FFD700] mx-auto lg:mx-0 pb-2"
                  variants={heroTitle}
                  custom={1}
                  style={{
                    transform: `rotate(${mousePosition.x * 0.01}deg)`
                  }}
                >
                  &
                </motion.span>
                
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-[#FF4E50] to-[#F9D423] pb-2"
                  variants={heroTitle}
                  custom={2}
                  style={{
                    textShadow: "0 0 40px rgba(52, 232, 158, 0.2)",
                    transform: `rotate(${mousePosition.x * 0.01}deg)`
                  }}
                >
                  UI/UX
                </motion.span>
                
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-[#0F3443] to-[#34E89E] pb-2"
                  variants={heroTitle}
                  custom={3}
                  style={{
                    textShadow: "0 0 40px rgba(52, 232, 158, 0.2)",
                    transform: `rotate(${mousePosition.x * 0.01}deg)`
                  }}
                >
                  DEVELOPER
                </motion.span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/80 max-w-xl"
              >
                I create digital experiences that border on 
                <span className="text-primary relative hover:scale-105 transition-transform duration-300"> efficiency</span>, 
                <span className="text-[#FF4E50] relative hover:scale-105 transition-transform duration-300"> aesthetics</span> and 
                <span className="text-emerald-500 relative hover:scale-105 transition-transform duration-300"> functionality</span>.
              </motion.p>
            </div>
            
            {/* Supporting Information */}
            <motion.div
              variants={staggerContainer}
              className="space-y-1 text-sm text-white/70"
            >
              {["// Based in Dhaka, Bangladesh", "// UI/UX Designer", "// Full-Stack Developer"].map((tag, i) => (
                <motion.p 
                  key={tag}
                  variants={heroTag}
                  custom={i}
                  className="font-mono relative pl-1 border-l-2 border-primary/50 hover:border-primary transition-colors duration-300 hover:bg-primary/5 rounded-sm"
                >
                  {tag}
                </motion.p>
              ))}
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div variants={heroButton} custom={0}>
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg hover:shadow-primary/40 transition-all duration-300" 
                  asChild
                >
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={heroButton} custom={1}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 hover:bg-white/5 text-white hover:border-white transition-all duration-300" 
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
              
              <motion.div variants={heroButton} custom={2}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300" 
                  asChild
                >
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Let's Connect
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Skills */}
            <motion.div 
              variants={fadeInUp}
              className="space-y-4"
            >
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wide">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="text-sm px-3 py-1 text-white/80 border-white/20 hover:bg-white/5 transition-all duration-300 hover:border-primary/50"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Profile Image */}
          <motion.div 
            variants={fadeIn}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border-4 border-white/10 relative overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="w-full h-full absolute"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-cyan-500/30 opacity-70" />
              </motion.div>
              
              <div className="text-center text-white/80 relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Profile Photo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

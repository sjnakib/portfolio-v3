"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Dribbble, MessageSquare, ArrowRight } from "lucide-react"

export function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    // Mouse movement tracking for subtle effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      
      setMousePosition({
        x: x / width,
        y: y / height
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  
  // Animation variants
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }
  
  return (
    <motion.footer 
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-cyan-500/5"
          style={{
            transform: `translateX(${(mousePosition.x - 0.5) * 10}px) translateY(${(mousePosition.y - 0.5) * 10}px)`
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16"
        >
          {/* Branding/Tagline Section (Column 1) */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold">Where aesthetics & functionality <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4DD0E1] to-[#6366F1]">meet</span></h3>
            <p className="text-gray-300 text-pretty">
              Full-stack & UI/UX Developer passionate about creating innovative digital experiences that combine technical excellence with exceptional user experience.
            </p>
          </motion.div>
          
          {/* "Explore" Navigation (Column 2) */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9D00] to-[#FFD180]">
              Explore
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
                { name: "Academics", path: "/academic" },
                { name: "About Me", path: "/about" }
              ].map((link, i) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-gray-300 hover:text-white transition-all duration-300 group relative w-fit"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF9D00] to-[#FFD180] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>
          
          {/* "Follow Me" Social Links (Column 3) */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#A793FF] to-[#6200EA]">
              Follow Me
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/username", color: "#0077B5" },
                { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com/username", color: "#333333" },
                { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/username", color: "#1DA1F2" },
                { name: "Dribbble", icon: <Dribbble className="h-5 w-5" />, href: "https://dribbble.com/username", color: "#EA4C89" },
                { name: "Discord", icon: <MessageSquare className="h-5 w-5" />, href: "https://discord.com/users/username", color: "#5865F2" }
              ].map((social, i) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="p-1 rounded-full bg-gray-800/50 group-hover:bg-gray-700/70 transition-all duration-300" 
                    style={{ 
                      boxShadow: `0 0 0 rgba(${social.color}, 0)`,
                      transition: "box-shadow 0.3s ease-in-out" 
                    }}
                  >
                    {social.icon}
                  </span>
                  <span>{social.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
          
          {/* "Contact Me" Call to Actions (Column 4) */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#00E5FF]">
              Contact
            </h3>
            <div className="flex flex-col space-y-4">
              <Link
                href="/contact"
                className="group flex justify-between items-center p-3 bg-gray-800/30 hover:bg-gray-700/40 rounded-md transition-all duration-300"
              >
                <div>
                  <p className="font-medium">Contact Me</p>
                  <p className="text-sm text-gray-400">Say Hello!</p>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="group flex justify-between items-center p-3 bg-gray-800/30 hover:bg-gray-700/40 rounded-md transition-all duration-300"
              >
                <div>
                  <p className="font-medium">My Projects</p>
                  <p className="text-sm text-gray-400">Explore Projects</p>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Large Branding Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center my-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter"
            style={{
              textShadow: "0 5px 20px rgba(0,0,0,0.5)"
            }}
          >
            SHAFAAT JAMIL NAKIB
          </h2>
        </motion.div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800/70 mt-10 pt-8 flex flex-col md:flex-row justify-between text-gray-400">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Shafaat Jamil Nakib. All rights reserved.
            </p>
            <Link 
              href="/privacy"
              className="text-sm hover:text-white hover:underline transition-all duration-300"
            >
              Privacy Policy
            </Link>
          </div>
          
          <div className="flex items-center">
            <p className="text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

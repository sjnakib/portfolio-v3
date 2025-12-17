"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, ArrowRight, Layout, Briefcase } from "lucide-react";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useTypewriter } from "@/hooks/use-typewriter";
import { TechBadge } from "@/components/ui/tech-badge";
import techData from "@/data/technologies.json";
import siteSettings from "@/data/siteSettings.json";

export function HeroSection() {
  // Use technologies from our data file
  const technologies = techData.technologies;

  // Use the viewport height hook
  useViewportHeight();

  // Typewriter effect that looks like writing code
  const { displayText, isTyping } = useTypewriter({
    text: "hello! it's shafaat (sha-fa-aat).",
    speed: 32,
    codeLike: true,
  });

  // Function to scroll down to the tabbed section smoothly
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

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
              <div className="text-lg text-muted-foreground font-light font-mono">
                <span className="text-green-400">// </span>
                <span>{displayText}</span>
                <span
                  className={`${isTyping ? "animate-pulse" : "animate-pulse"}`}
                >
                  |
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">
                  <span className="text-foreground transition-all hover:scale-[1.05] duration-300 inline-block">
                    FRONTEND
                  </span>
                  <span className="text-muted-foreground/60"> &</span>
                </span>
                <span className="block text-orange-400 transition-all hover:scale-[1.05] duration-300">
                  UI/UX
                </span>
                <span className="block text-cyan-500 transition-all hover:scale-[1.05] duration-300">
                  DEVELOPER
                </span>
              </h1>

              <p className="text-base text-muted-foreground flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Dhaka, Bangladesh
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground"
                asChild
              >
                <Link href="/projects">
                  <Layout className="mr-2 h-4 w-4" />
                  View Projects
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="px-4 min-w-0"
                asChild
              >
                <Link href="/experiences">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Experiences
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="text-base font-medium text-muted-foreground uppercase tracking-wide">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {technologies.map((tech) => (
                  <TechBadge
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                    color={tech.color}
                    description={tech.description}
                    url={tech.url}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Profile Image (hidden on mobile) */}
          <div className="hidden md:flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-border shadow-2xl">
              <Image
                src={siteSettings.owner.avatar}
                alt={siteSettings.owner.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Mouse Animation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Scroll down to content"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1 relative">
            <div className="w-1.5 h-3 bg-current rounded-full animate-mouse-scroll" />
            <span className="sr-only">Scroll Down</span>
          </div>
        </button>
      </div>
    </section>
  );
}

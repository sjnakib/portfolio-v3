"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X } from "lucide-react"
import { HoverableCard, CardCorners } from "@/components/ui/hoverable-card"
import projectsData from "@/data/projects.json"
import type { Project } from "@/types/project"

// Type for category filter
type CategoryType = "all" | "client-website" | "personal-project" | "ui-mockup";

// Type assertion for the projects data
const typedProjects = projectsData.projects as Project[]

export function ProjectGallery() {
  // Extract all unique technologies from projects
  const allTechnologies = [...new Set(
    typedProjects.flatMap(project => project.technologies)
  )].sort();
  
  // Create category map with human-readable labels
  const categories: { value: CategoryType; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "client-website", label: "Professional Work" },
    { value: "personal-project", label: "Personal Projects" },
    { value: "ui-mockup", label: "Design Work" }
  ];
  
  type CategoryType = "all" | "client-website" | "personal-project" | "ui-mockup";
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);
  
  // Filter projects based on selected category and technologies
  const filteredProjects = typedProjects.filter(project => {
    // Apply category filter
    const categoryMatch = activeCategory === "all" || project.type === activeCategory;
    
    // Apply technology filter if any are selected
    const techMatch = activeTechs.length === 0 || 
      activeTechs.some(tech => project.technologies.includes(tech));
    
    return categoryMatch && techMatch;
  });

  // Handle category selection
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  // Handle technology selection
  const handleTechToggle = (tech: string) => {
    setActiveTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) 
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveCategory("all");
    setActiveTechs([]);
  };

  // Get top technologies to feature (limit to important/popular ones for compact display)
  const featuredTechs = ["React", "Next.js", "TypeScript", "Node.js", "UI/UX", "Figma"];
  
  return (
    <div>
      <div className="mb-6">
        {/* Compact filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5 mr-2">
              {categories.map((category) => (
                <Button 
                  key={category.value}
                  variant={activeCategory === category.value ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className={`rounded-full text-sm h-8 px-3 ${activeCategory === category.value ? "" : "bg-transparent border-muted-foreground/30"}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            
            <div className="h-4 border-r border-border hidden sm:block"></div>
            
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-sm text-muted-foreground hidden sm:inline">Tech:</span>
              {featuredTechs.map((tech) => (
                <Badge 
                  key={tech}
                  variant={activeTechs.includes(tech) ? "default" : "outline"} 
                  className={`cursor-pointer text-sm py-1 ${activeTechs.includes(tech) ? "bg-primary" : "bg-transparent border-muted-foreground/30"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTechToggle(tech);
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Reset filter button - only shown when filters are active */}
          {(activeCategory !== "all" || activeTechs.length > 0) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters} 
              className="text-sm h-8 ml-auto"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      
      {/* Project Grid */}
      <ProjectGrid projects={filteredProjects} />
    </div>
  )
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="py-10 text-center bg-muted/20 rounded-lg border border-border/30">
          <p className="text-muted-foreground">No projects match the selected filters</p>
          <Button variant="link" size="sm" className="mt-2" onClick={() => window.scrollTo(0, 0)}>
            Adjust filters
          </Button>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <HoverableCard className="group overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 sm:gap-6">
        {/* Left side - Project image */}
        <div className="relative bg-muted overflow-hidden h-full min-h-[200px] md:min-h-0">
          {/* Decorative corners for added visual interest */}
          <CardCorners className="z-10" />
          
          <img
            src={project.images[0]?.src || "/placeholder.svg"}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="p-2 sm:p-4 flex flex-col">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-pretty text-sm sm:text-base text-muted-foreground mb-4">{project.shortDescription}</p>
            
            {/* Key features with bullet points */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Key Features:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-pretty">{feature}</li>
                ))}
              </ul>
            </div>
          
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 6).map((tech) => (
                <span 
                  key={tech} 
                  className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded-full shadow-sm">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>
            
            <div className="flex gap-1 sm:gap-2 mt-4">
              <Button size="sm" variant="default" className="flex-1" asChild>
                <Link href={`/projects/${project.slug}`}>
                  View Details
                </Link>
              </Button>
              {project.liveUrl && (
                <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} demo`}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.sourceUrl && (
                <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HoverableCard>
  )
}

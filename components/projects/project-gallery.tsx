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
      {projects.map((project, index) => (
        <div key={project.id} className="h-full">
          <ProjectCard 
            project={project} 
            imageOnRight={index % 2 !== 0} // Alternating layout: even indexes (0, 2, 4) have image on left, odd (1, 3, 5) on right
          />
        </div>
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

function ProjectCard({ project, imageOnRight = false }: { project: Project; imageOnRight?: boolean }) {
  // Get project completion year and time spent
  const getProjectYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };
  
  // Calculate time spent (estimation based on features complexity)
  const getTimeSpent = (project: Project) => {
    const complexity = project.features?.length || 2;
    return `${complexity * 2} months`;
  };

  return (
    <HoverableCard className="group overflow-hidden h-full">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ${imageOnRight ? 'md:grid-flow-dense' : ''} h-full max-h-[400px]`}>
        {/* Project image - Order changes based on imageOnRight prop */}
        <div className={`relative bg-muted overflow-hidden h-full md:h-[400px] min-h-[180px] ${imageOnRight ? 'md:col-start-2' : ''}`}>
          {/* Decorative corners for added visual interest */}
          <CardCorners className="z-10" />
          
          <img
            src={project.images[0]?.src || "/placeholder.svg"}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content section */}
        <div className={`p-3 sm:p-5 flex flex-col ${imageOnRight ? 'md:col-start-1' : ''} h-full overflow-y-auto`}>
          <div className="h-full flex flex-col">
            {/* Project title with visual emphasis */}
            <h3 className="text-lg sm:text-xl font-bold mb-1.5 text-foreground border-b border-primary/10 pb-1.5">
              {project.title}
            </h3>
            
            {/* Project Type and Time Period */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <span className="font-medium text-sm capitalize bg-muted/50 px-2 py-0.5 rounded-sm inline-block">
                {project.type?.replace(/-/g, ' ') || "Personal Project"}
              </span>
              <div className="text-xs sm:text-sm text-primary font-medium mt-1 sm:mt-0">
                {getProjectYear(project.date)} • {getTimeSpent(project)}
              </div>
            </div>
            
            <p className="text-pretty text-xs sm:text-sm text-muted-foreground mb-3">{project.shortDescription}</p>
            
            {/* Key features with bullet points - more compact */}
            <div className="mb-3">
              <h4 className="text-xs sm:text-sm font-medium mb-1 text-foreground/90 flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                Key Features:
              </h4>
              <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1 text-muted-foreground">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-pretty">{feature}</li>
                ))}
              </ul>
            </div>
          
            <div className="flex flex-wrap gap-1.5 mb-3">
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
            
            <div className="flex items-center gap-1.5 sm:gap-2 mt-auto">
              <Button size="sm" variant="default" className="h-8 text-xs sm:text-sm px-2 sm:px-3" asChild>
                <Link href={`/projects/${project.slug}`}>
                  View Details
                </Link>
              </Button>
              {project.liveUrl && (
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} demo`}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {project.sourceUrl && (
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
                    <Github className="h-3.5 w-3.5" />
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

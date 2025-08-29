"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X } from "lucide-react"
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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="col-span-full py-10 text-center bg-muted/20 rounded-lg border border-border/30">
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img
          src={project.images[0]?.src || "/placeholder.svg"}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
        <CardDescription className="text-pretty text-sm sm:text-base">{project.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs sm:text-sm">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs sm:text-sm">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button size="sm" className="flex-1 text-xs sm:text-sm py-1 h-8 sm:h-9" asChild>
            <Link href={`/projects/${project.slug}`}>
              View Details
            </Link>
          </Button>
          {project.liveUrl && (
            <Button variant="outline" size="sm" className="h-8 sm:h-9 w-8 sm:w-9 p-0" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} demo`}>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button variant="outline" size="sm" className="h-8 sm:h-9 w-8 sm:w-9 p-0" asChild>
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

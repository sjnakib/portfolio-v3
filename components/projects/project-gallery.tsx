"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ExternalLink, Github } from "lucide-react"
import projectsData from "@/data/projects.json"

export function ProjectGallery() {
  const [filter, setFilter] = useState("all")
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.type === filter)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <TabsList className="flex-wrap justify-center sm:flex-nowrap">
            <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">All Projects</TabsTrigger>
            <TabsTrigger value="client-website" className="text-xs sm:text-sm whitespace-nowrap">Client Websites</TabsTrigger>
            <TabsTrigger value="personal-project" className="text-xs sm:text-sm whitespace-nowrap">Personal Projects</TabsTrigger>
            <TabsTrigger value="ui-mockup" className="text-xs sm:text-sm whitespace-nowrap">UI/UX Designs</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <ProjectGrid projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="client-website" className="mt-0">
          <ProjectGrid projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="personal-project" className="mt-0">
          <ProjectGrid projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="ui-mockup" className="mt-0">
          <ProjectGrid projects={filteredProjects} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
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

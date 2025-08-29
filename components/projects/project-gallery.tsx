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
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="client-website">Client Websites</TabsTrigger>
            <TabsTrigger value="personal-project">Personal Projects</TabsTrigger>
            <TabsTrigger value="ui-mockup">UI/UX Designs</TabsTrigger>
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="col-span-3 py-12 text-center">
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
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="text-pretty">{project.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-base">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-base">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/projects/${project.slug}`}>
              View Details
            </Link>
          </Button>
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} demo`}>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
                <Github className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

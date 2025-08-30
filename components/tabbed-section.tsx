"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsSection } from "@/components/projects-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap, Code, ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import experienceData from "@/data/experience.json"
import projectsData from "@/data/projects.json"
import academicData from "@/data/academic.json"

// Experience section component with compact tiles
function ExperienceSection() {
  const { experiences } = experienceData;
  
  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">Professional Experience</h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          My professional journey and career highlights
        </p>
      </div>
      
      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="group hover:bg-muted/50 px-4 py-3 rounded-md transition-colors border border-border/40 hover:border-border"
          >
            {/* Company Name */}
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-base">{exp.company}</h4>
              <div className="text-xs text-muted-foreground">
                {new Date(exp.startDate).getFullYear()} - 
                {exp.endDate === "Present" ? " Present" : new Date(exp.endDate).getFullYear()}
              </div>
            </div>
            
            {/* Role and Location */}
            <div className="flex justify-between items-center text-sm mb-1.5">
              <span className="font-medium">{exp.position}</span>
              <div className="text-xs text-muted-foreground flex items-center">
                <span className="ml-1">{exp.location}</span>
              </div>
            </div>
            
            {/* Responsibilities */}
            <div className="space-y-1 mb-2">
              <p className="text-sm text-muted-foreground">
                {exp.responsibilities[0]}
              </p>
              {exp.responsibilities.length > 1 && (
                <p className="text-sm text-muted-foreground">
                  {exp.responsibilities[1]}
                </p>
              )}
            </div>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Modified ProjectsSection wrapper to use compact resume-style tiles
function ProjectsWrapper() {
  // Get data from projects.json
  const { projects } = projectsData;
  
  // Get project completion year and time spent
  const getProjectYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };
  
  // Calculate time spent (this is an estimation since we only have one date)
  // In a real app, you might have startDate and endDate
  const getTimeSpent = (project: any) => {
    // For demo purposes, we'll derive this from project complexity (features length)
    const complexity = project.features?.length || 2;
    return `${complexity * 2} months`;
  };
  
  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">Featured Projects</h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work in full-stack development and robotics engineering
        </p>
      </div>
      <div className="space-y-3">
        {projects.slice(0, 3).map((project, index) => (
          <div 
            key={project.id} 
            className="group hover:bg-muted/50 px-4 py-3 rounded-md transition-colors border border-border/40 hover:border-border"
          >
            {/* Project Title Row */}
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-base">{project.title}</h4>
              <div className="text-xs text-muted-foreground">
                {getProjectYear(project.date)} • <span className="text-primary/80">{getTimeSpent(project)}</span>
              </div>
            </div>
            
            {/* Content Row with Description */}
            <div className="flex gap-3 my-2">
              {/* Small image thumbnail */}
              <div className="w-16 h-10 flex-shrink-0">
                <div className="h-full w-full rounded-md overflow-hidden bg-muted shadow-sm">
                  <img
                    src={project.images[0]?.src || "/placeholder.svg"}
                    alt={project.images[0]?.alt || `${project.title} screenshot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground flex-1">{project.shortDescription}</p>
            </div>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <a 
                href={`/projects/${project.slug}`}
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 hover:underline"
              >
                View Details
              </a>
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl} 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 hover:underline"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Modified AcademicSection wrapper with compact tiles
function AcademicWrapper() {
  // Using academic data from the imported json file
  
  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">Academic Highlights</h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          My educational background, research work, and publications
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Education Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-primary/15 rounded-full flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <h4 className="text-base font-semibold">Education</h4>
          </div>
          
          <div className="space-y-3">
            {academicData.education.map((edu, index) => (
              <div 
                key={index}
                className="group hover:bg-muted/50 px-4 py-3 rounded-md transition-colors border border-border/40 hover:border-border"
              >
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-base">{edu.degree}</h4>
                  <div className="text-primary font-medium text-sm">CGPA: {edu.gpa}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{edu.institution}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-sm text-muted-foreground">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Publications Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-primary/15 rounded-full flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <h4 className="text-base font-semibold">Research & Publications</h4>
          </div>
          
          <div className="space-y-3">
            {academicData.publications.map((pub, index) => (
              <div 
                key={index}
                className="group hover:bg-muted/50 px-4 py-3 rounded-md transition-colors border border-border/40 hover:border-border"
              >
                <h4 className="font-bold text-base mb-1">{pub.title}</h4>
                <div className="text-sm mb-1">{pub.authors.join(", ")}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{pub.journal}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(pub.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                {pub.link && (
                  <div className="mt-1.5">
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Publication
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main tabbed section component
export function TabbedSection() {
  const [activeTab, setActiveTab] = useState("projects")
  
  // Hydration fix for server/client rendering mismatch with defaultValue
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  
  if (!isMounted) {
    // Return placeholder with same height during SSR to prevent layout shift
    return <div className="min-h-[50vh]"></div>
  }
  
  return (
    <section id="tabbed-content" className="py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center border-b py-3 px-4">
              <TabsList className="bg-muted/50 p-1 rounded-md">
                <TabsTrigger value="projects" className="px-5 py-2 text-sm font-medium">
                  <Code className="h-4 w-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="experience" className="px-5 py-2 text-sm font-medium">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="px-5 py-2 text-sm font-medium">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 sm:p-6">
              <TabsContent value="projects" className="mt-0 animate-in fade-in-50 duration-500">
                <ProjectsWrapper />
              </TabsContent>
              
              <TabsContent value="experience" className="mt-0 animate-in fade-in-50 duration-500">
                <ExperienceSection />
              </TabsContent>
              
              <TabsContent value="education" className="mt-0 animate-in fade-in-50 duration-500">
                <AcademicWrapper />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

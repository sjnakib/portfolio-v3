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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Professional Experience</h3>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          My professional journey and career highlights
        </p>
      </div>
      
      <div className="space-y-5">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="group rounded-md transition-colors"
          >
            {/* Company/Institution Header */}
            <div className="flex items-center gap-3 border border-border/60 rounded-md p-3 bg-muted/5 mb-2">
              {/* Logo */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border/40">
                <img 
                  src="/placeholder-logo.svg" 
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Company Name */}
              <h4 className="font-bold text-xl">{exp.company}</h4>
            </div>
            
            {/* Time Period and Role */}
            <div className="mb-3 px-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <span className="font-medium text-base">{exp.position}</span>
                <div className="text-base text-primary font-medium mt-1 sm:mt-0">
                  {new Date(exp.startDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})} - 
                  {exp.endDate === "Present" 
                    ? " Present" 
                    : ` ${new Date(exp.endDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}`
                  }
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {exp.location}
              </div>
            </div>
            
            {/* Bullet Points */}
            <div className="px-3 mb-3">
              <ul className="space-y-2 list-disc list-outside pl-5">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-base text-muted-foreground">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tags/Links */}
            <div className="flex flex-wrap gap-1.5 px-3">
              {exp.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-primary/10 text-primary px-2.5 py-1 text-sm font-medium rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
              
              {/* Add NFTVue-like tag/link for appropriate entries */}
              {exp.company === "Singapore Institute of Technology" && (
                <a 
                  href="#" 
                  className="bg-accent/15 text-accent px-2.5 py-1 text-sm font-medium rounded-full shadow-sm flex items-center gap-1 hover:bg-accent/25 transition-colors"
                >
                  <span>NFTVue</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Featured Projects</h3>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work in full-stack development and robotics engineering
        </p>
      </div>
      <div className="space-y-5">
        {projects.slice(0, 3).map((project, index) => (
          <div 
            key={project.id} 
            className="group rounded-md transition-colors"
          >
            {/* Project Header */}
            <div className="flex items-center gap-3 border border-border/60 rounded-md p-3 bg-muted/5 mb-2">
              {/* Project Image/Logo */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border/40">
                <img
                  src={project.images[0]?.src || "/placeholder-logo.svg"}
                  alt={project.images[0]?.alt || `${project.title} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Project Name */}
              <h4 className="font-bold text-xl">{project.title}</h4>
            </div>
            
            {/* Time Period and Type */}
            <div className="mb-3 px-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <span className="font-medium text-base capitalize">
                  {project.type?.replace(/-/g, ' ') || "Personal Project"}
                </span>
                <div className="text-base text-primary font-medium mt-1 sm:mt-0">
                  {getProjectYear(project.date)} • {getTimeSpent(project)}
                </div>
              </div>
              <div className="text-base text-muted-foreground">
                {project.shortDescription}
              </div>
            </div>
            
            {/* Features as Bullet Points */}
            {project.features && project.features.length > 0 && (
              <div className="px-3 mb-3">
                <ul className="list-disc list-outside pl-5 space-y-1 text-base text-muted-foreground">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-3 px-3">
              {project.technologies.slice(0, 4).map((tech) => (
                <span 
                  key={tech} 
                  className="bg-primary/10 text-primary px-2.5 py-1 text-sm font-medium rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 px-3">
              <a 
                href={`/projects/${project.slug}`}
                className="text-base font-medium text-primary hover:text-primary/80 flex items-center gap-1 hover:underline"
              >
                View Details
              </a>
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 hover:underline"
                >
                  <Github className="h-4 w-4" />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Academic Highlights</h3>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          My educational background, research work, and publications
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-xl font-semibold">Education</h4>
          </div>
          
          <div className="space-y-5">
            {academicData.education.map((edu, index) => (
              <div 
                key={index}
                className="group rounded-md transition-colors"
              >
                {/* Institution Header */}
                <div className="flex items-center gap-3 border border-border/60 rounded-md p-3 bg-muted/5 mb-2">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border/40">
                    <img 
                      src="/placeholder-logo.svg" 
                      alt={`${edu.institution} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Institution Name */}
                  <h4 className="font-bold text-xl">{edu.institution}</h4>
                </div>
                
                {/* Time Period and Degree */}
                <div className="mb-3 px-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <span className="font-medium text-base">{edu.degree}</span>
                    <div className="text-base text-primary font-medium mt-1 sm:mt-0">
                      {new Date(edu.startDate).toLocaleDateString('en-US', {year: 'numeric'})} - 
                      {new Date(edu.endDate).toLocaleDateString('en-US', {year: 'numeric'})}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:justify-between">
                    <span>{edu.location}</span>
                    <span className="mt-1 sm:mt-0">CGPA: {edu.gpa}</span>
                  </div>
                </div>
                
                {/* Highlights as Bullet Points */}
                <div className="px-3">
                  <ul className="list-disc list-outside pl-5 space-y-2 text-base text-muted-foreground">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Publications Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-xl font-semibold">Research & Publications</h4>
          </div>
          
          <div className="space-y-5">
            {academicData.publications.map((pub, index) => (
              <div 
                key={index}
                className="group rounded-md transition-colors"
              >
                {/* Journal Header */}
                <div className="flex items-center gap-3 border border-border/60 rounded-md p-3 bg-muted/5 mb-2">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border/40">
                    <img 
                      src="/placeholder-logo.svg" 
                      alt={`${pub.journal} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Journal Name */}
                  <h4 className="font-bold text-xl">{pub.journal}</h4>
                </div>
                
                {/* Publication Title and Date */}
                <div className="mb-3 px-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h5 className="font-medium text-lg">{pub.title}</h5>
                    <div className="text-base text-primary font-medium sm:ml-2 whitespace-nowrap mt-1 sm:mt-0">
                      {new Date(pub.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {pub.authors.join(", ")}
                  </div>
                </div>
                
                {/* Link to Publication */}
                {pub.link && (
                  <div className="px-3">
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base font-medium text-primary hover:text-primary/80 flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
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
            <div className="flex justify-center border-b overflow-x-auto scrollbar-hide">
              <TabsList className="w-full max-w-xl mx-auto p-0 rounded-none bg-transparent flex justify-center min-w-full sm:min-w-0">
                <TabsTrigger 
                  value="projects" 
                  className="flex-1 px-2 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-none relative transition-colors hover:bg-muted/20
                  data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:after:absolute 
                  data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 
                  data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary min-w-[80px]"
                >
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Projects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experience" 
                  className="flex-1 px-2 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-none relative transition-colors hover:bg-muted/20
                  data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:after:absolute 
                  data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 
                  data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary min-w-[80px]"
                >
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Experience</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  className="flex-1 px-2 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-none relative transition-colors hover:bg-muted/20
                  data-[state=active]:bg-muted/30 data-[state=active]:text-primary data-[state=active]:after:absolute 
                  data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 
                  data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary min-w-[80px]"
                >
                  <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Education</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-3 sm:p-6">
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

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsSection } from "@/components/projects-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap, Code, ExternalLink, Github, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverableCard, CardCorners } from "@/components/ui/hoverable-card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import experienceData from "@/data/experience.json"
import projectsData from "@/data/projects.json"
import academicData from "@/data/academic.json"

// Experience section component with LinkedIn-like interface
function ExperienceSection() {
  const { companies } = experienceData;
  
  // Define interfaces for TypeScript
  interface Role {
    title: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    technologies: string[];
  }
  
  // Format date in "MMM YYYY" format
  const formatDate = (dateString: string): string => {
    if (dateString === "Present") return "Present";
    return new Date(dateString).toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
  };

  // Calculate duration between two dates
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else if (months === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  // Calculate total duration at company across all roles
  const calculateCompanyDuration = (roles: Role[]): string => {
    if (!roles || roles.length === 0) return "";
    
    // Find earliest start date and latest end date
    const startDates = roles.map(role => new Date(role.startDate));
    const endDates = roles.map(role => role.endDate === "Present" ? new Date() : new Date(role.endDate));
    
    const earliestStart = new Date(Math.min(...startDates.map(date => date.getTime())));
    const latestEnd = new Date(Math.max(...endDates.map(date => date.getTime())));
    
    const startFormatted = earliestStart.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
    const endFormatted = latestEnd.getTime() === new Date().getTime() 
      ? "Present" 
      : latestEnd.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
    
    return `${startFormatted} - ${endFormatted}`;
  };
  
  return (
    <div>
      <div className="space-y-10">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="group rounded-md transition-colors"
          >
            {/* Company Header */}
            <HoverableCard className="flex items-center gap-4 mb-4">
              {/* Logo */}
              <div className="w-14 h-14 rounded-md bg-background flex items-center justify-center overflow-hidden border border-primary/20 shadow-sm">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              
              {/* Company Name and Duration */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <h4 className="font-bold text-xl">{company.name}</h4>
                  {company.url && (
                    <a 
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div className="flex flex-col text-sm text-muted-foreground">
                  <span>{company.location}</span>
                  <span>{calculateCompanyDuration(company.roles)}</span>
                </div>
              </div>
            </HoverableCard>
            
            {/* Roles Section - LinkedIn style with vertical timeline */}
            <div className="pl-7 relative">
              {company.roles.map((role, roleIndex) => (
                <div 
                  key={roleIndex} 
                  className={`relative mb-6 pl-10 ${roleIndex < company.roles.length - 1 ? 'pb-1' : ''}`}
                >
                  {/* Timeline connector */}
                  {roleIndex < company.roles.length - 1 && (
                    <div className="absolute left-1.5 top-3 bottom-0 w-0.5 bg-primary/30"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background"></div>
                  
                  {/* Role details */}
                  <div className="mb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <h5 className="font-semibold text-lg">{role.title}</h5>
                      <div className="text-sm text-primary font-medium mt-0.5 sm:mt-0.5 flex items-center gap-1">
                        <span>{formatDate(role.startDate)} - {formatDate(role.endDate)}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{calculateDuration(role.startDate, role.endDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Responsibilities */}
                  <div className="mb-3">
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {role.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies/Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {role.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
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
      <div className="space-y-5">
        {projects.slice(0, 3).map((project, index) => (
          <div 
            key={project.id} 
            className="group rounded-md transition-colors"
          >
            {/* Two column layout with screenshot on left, details on right */}
            <HoverableCard className="flex flex-col sm:flex-row">
              {/* Left column - Screenshot only */}
              {project.images && project.images.length > 0 && (
                <div className="sm:w-2/5 min-w-[240px] max-w-[280px] flex-shrink-0 mr-0 sm:mr-5 mb-4 sm:mb-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer relative overflow-hidden rounded-md border-2 border-primary/20 shadow-md hover:border-primary/40 hover:shadow-lg transition-all duration-300 w-full">
                        {/* Decorative corners for added visual interest */}
                        <CardCorners />
                        
                        <AspectRatio ratio={16/9} className="bg-muted/30">
                          <Image
                            src={project.images[0].src}
                            alt={project.images[0].alt || `${project.title} screenshot`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <span className="bg-background/90 text-foreground px-2 py-1 rounded-md text-xs font-medium">View Larger</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-1 overflow-hidden border-2 border-primary/20 shadow-xl">
                      <div className="relative h-full w-full">
                        {/* Decorative corners for the dialog too */}
                        <CardCorners className="w-4 h-4 z-10" />
                        
                        <AspectRatio ratio={16/9} className="bg-black">
                          <Image 
                            src={project.images[0].src}
                            alt={project.images[0].alt || `${project.title} screenshot`}
                            fill
                            className="object-contain"
                            quality={95}
                          />
                        </AspectRatio>
                        {project.images[0].caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-sm text-center backdrop-blur-sm">
                            {project.images[0].caption}
                          </div>
                        )}
                        <DialogClose className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background z-20">
                          <X className="h-5 w-5" />
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              {/* Right column - Main content */}
              <div className="flex-1 flex flex-col space-y-3">
                {/* Project title */}
                <h4 className="font-bold text-xl leading-tight">{project.title}</h4>
                
                {/* Time Period and Type */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="font-medium text-base capitalize">
                      {project.type?.replace(/-/g, ' ') || "Personal Project"}
                    </span>
                    <div className="text-sm text-primary font-medium mt-1 sm:mt-0">
                      {getProjectYear(project.date)} • {getTimeSpent(project)}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {project.shortDescription}
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded-full shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons in the main content column */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {/* View Details button */}
                  <Button size="sm" variant="default" asChild className="mr-1">
                    <a href={`/projects/${project.slug}`}>
                      View Details
                    </a>
                  </Button>
                  
                  {/* Source button - icon only with tooltip and disabled if no URL */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        disabled={!project.sourceUrl} 
                        asChild={!!project.sourceUrl}
                      >
                        {project.sourceUrl ? (
                          <a 
                            href={project.sourceUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source code"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span>
                            <Github className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.sourceUrl ? "View Source Code" : "Source code not available"}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Live Site button - icon only with tooltip and disabled if no URL */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        disabled={!project.liveUrl} 
                        asChild={!!project.liveUrl}
                      >
                        {project.liveUrl ? (
                          <a 
                            href={project.liveUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.liveUrl ? "Visit Live Site" : "Live site not available"}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </HoverableCard>
          </div>
        ))}
      </div>
    </div>
  )
}

// Modified AcademicSection wrapper with compact tiles
function AcademicWrapper() {
  // Using academic data from the imported json file
  
  // Format date in "YYYY" format for education
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {year: 'numeric'});
  };

  // Calculate duration between two dates for education
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    
    // For education, we typically just care about years
    const years = end.getFullYear() - start.getFullYear();
    
    if (years === 0) {
      return "Less than 1 year";
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
  };
  
  return (
    <div>
      <div className="space-y-8">
        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-xl font-semibold">Education</h4>
          </div>
          
          <div className="space-y-10">
            {academicData.institutions.map((institution, index) => (
              <div 
                key={index}
                className="group rounded-md transition-colors"
              >
                {/* Institution Header */}
                <HoverableCard className="flex items-center gap-4 mb-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-md bg-background flex items-center justify-center overflow-hidden border border-primary/20 shadow-sm">
                    <img 
                      src={institution.logo} 
                      alt={`${institution.name} logo`}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  
                  {/* Institution Name and Location */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-xl">{institution.name}</h4>
                      {institution.url && (
                        <a 
                          href={institution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>{institution.location}</span>
                    </div>
                  </div>
                </HoverableCard>
                
                {/* Degrees Section - LinkedIn style with vertical timeline */}
                <div className="pl-7 relative">
                  {institution.degrees.map((degree, degreeIndex) => (
                    <div 
                      key={degreeIndex} 
                      className={`relative mb-6 pl-10 ${degreeIndex < institution.degrees.length - 1 ? 'pb-1' : ''}`}
                    >
                      {/* Timeline connector */}
                      {degreeIndex < institution.degrees.length - 1 && (
                        <div className="absolute left-1.5 top-3 bottom-0 w-0.5 bg-primary/30"></div>
                      )}
                      
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background"></div>
                      
                      {/* Degree details */}
                      <div className="mb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <h5 className="font-semibold text-lg">{degree.name}</h5>
                          <div className="text-sm text-primary font-medium mt-1 sm:mt-0 whitespace-nowrap sm:ml-3">
                            {formatDate(degree.startDate)} - {formatDate(degree.endDate)}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground mt-1">
                          <span className="font-medium">CGPA: {degree.gpa}</span>
                          <span className="mt-0.5 sm:mt-0">{calculateDuration(degree.startDate, degree.endDate)}</span>
                        </div>
                      </div>
                      
                      {/* Highlights */}
                      <div className="mb-2">
                        <ul className="list-disc list-outside pl-5 space-y-1.5">
                          {degree.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
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
                <HoverableCard className="flex items-center gap-3 mb-2">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/30">
                    <img 
                      src="/placeholder-logo.svg" 
                      alt={`${pub.journal} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Journal Name */}
                  <h4 className="font-bold text-xl">{pub.journal}</h4>
                </HoverableCard>
                
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

        <div className="rounded-lg border-2 border-primary/30 bg-card text-card-foreground shadow-md">
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center border-b border-b-primary/20 overflow-x-auto scrollbar-hide">
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

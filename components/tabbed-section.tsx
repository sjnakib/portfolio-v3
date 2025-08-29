"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsSection } from "@/components/projects-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import experienceData from "@/data/experience.json"

// Experience section component with compact tiles
function ExperienceSection() {
  const { experiences } = experienceData;
  
  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-4">Professional Experience</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My professional journey and career highlights
        </p>
      </div>
      
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="group hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors border border-border/40 hover:border-border"
          >
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-bold text-lg">{exp.position}</h4>
              <div className="text-sm text-muted-foreground">
                {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).replace(',', '')} - 
                {exp.endDate === "Present" ? " Present" : 
                  new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).replace(',', '')}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-medium">{exp.company}</span>
              <span className="text-sm text-muted-foreground ml-2">• {exp.location}</span>
            </div>
            <div className="pl-4 mb-2">
              <ul className="space-y-1 list-disc list-outside text-sm text-muted-foreground">
                {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                  <li key={idx} className="text-pretty">{resp}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-1">
              {exp.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="bg-primary/10 text-primary px-1.5 py-0.5 text-xs rounded">
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

// Modified ProjectsSection wrapper to use compact tiles
function ProjectsWrapper() {
  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-4">Featured Projects</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work in full-stack development and robotics engineering
        </p>
      </div>
      <div className="space-y-4">
        {/* We'll access the projects directly in a compact format */}
        {[
          {
            title: "USIS 2.0",
            description:
              "A comprehensive university student information system with real-time data processing.",
            image: "/university-student-information-system-dashboard.png",
            technologies: ["React", "Next.js", "TypeScript", "MySQL"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "Accounting Dashboard",
            description:
              "Financial management dashboard with advanced analytics and data visualization.",
            image: "/financial-accounting-dashboard-with-charts.png",
            technologies: ["Node.js", "React", "Python", "MySQL"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "Robotics Control System",
            description:
              "Advanced robotics control interface using ROS for autonomous navigation.",
            image: "/robotics-control-system-interface.png",
            technologies: ["Python", "ROS", "TypeScript", "React"],
            liveUrl: "#",
            githubUrl: "#",
          },
        ].map((project, index) => (
          <div 
            key={index} 
            className="group hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors border border-border/40 hover:border-border"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/5 flex-shrink-0">
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-primary/10 text-primary px-1.5 py-0.5 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Modified AcademicSection wrapper with compact tiles
function AcademicWrapper() {
  // Using academic data from the json file
  const academicData = {
    education: [
      {
        institution: "BRAC University",
        degree: "BSc in Computer Science and Engineering",
        gpa: "3.97/4.0",
        location: "Dhaka, Bangladesh",
        startDate: "2016-01",
        endDate: "2020-12",
        highlights: [
          "Top of class in algorithm design",
          "Research assistant in robotics lab"
        ]
      }
    ],
    publications: [
      {
        title: "Machine Learning Applications in Autonomous Systems",
        authors: ["Shafaat Jamil Nakib", "Dr. Jane Smith"],
        journal: "IEEE Robotics Conference",
        date: "2022-05",
        link: "https://doi.org/...",
        abstract: "This paper explores the application of advanced machine learning techniques in autonomous robotic systems."
      }
    ]
  };
  
  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-4">Academic Highlights</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My educational background, research work, and publications
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <h4 className="text-xl font-semibold">Education</h4>
          </div>
          
          <div className="space-y-4">
            {academicData.education.map((edu, index) => (
              <div 
                key={index}
                className="group hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors border border-border/40 hover:border-border"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-lg">{edu.degree}</h4>
                  <div className="text-primary font-medium text-sm">CGPA: {edu.gpa}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{edu.institution}</span>
                  <span className="text-sm text-muted-foreground">
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <h4 className="text-xl font-semibold">Research & Publications</h4>
          </div>
          
          <div className="space-y-4">
            {academicData.publications.map((pub, index) => (
              <div 
                key={index}
                className="group hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors border border-border/40 hover:border-border"
              >
                <h4 className="font-bold text-lg mb-1">{pub.title}</h4>
                <div className="text-sm mb-1">{pub.authors.join(", ")}</div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{pub.journal}</span>
                  <span className="text-muted-foreground">
                    {new Date(pub.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
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
    <section id="tabbed-content" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center border-b p-4">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="projects" className="px-6 py-2">
                  <Code className="h-4 w-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="experience" className="px-6 py-2">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="px-6 py-2">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
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

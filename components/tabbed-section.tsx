"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsSection } from "@/components/projects-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import experienceData from "@/data/experience.json"

// Experience section component
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
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="bg-muted/50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <CardTitle className="text-xl">{exp.position}</CardTitle>
                <div className="text-sm font-medium text-muted-foreground">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                  {exp.endDate === "Present" ? " Present" : 
                    new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 items-center mt-1">
                <span className="font-medium">{exp.company}</span>
                <span className="text-sm text-muted-foreground">• {exp.location}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-pretty">{resp}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Modified ProjectsSection wrapper to remove section padding
function ProjectsWrapper() {
  return (
    <div>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-4">Featured Projects</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work in full-stack development and robotics engineering
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* We'll access the projects directly to avoid the section padding from ProjectsSection */}
        {[
          {
            title: "USIS 2.0",
            description:
              "A comprehensive university student information system built with modern web technologies, featuring real-time data processing and intuitive user interfaces.",
            image: "/university-student-information-system-dashboard.png",
            technologies: ["React", "Next.js", "TypeScript", "MySQL"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "Accounting Dashboard",
            description:
              "Professional financial management dashboard with advanced analytics, reporting features, and real-time data visualization for business insights.",
            image: "/financial-accounting-dashboard-with-charts.png",
            technologies: ["Node.js", "React", "Python", "MySQL"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "Robotics Control System",
            description:
              "Advanced robotics control interface using ROS for autonomous navigation and real-time sensor data processing in industrial environments.",
            image: "/robotics-control-system-interface.png",
            technologies: ["Python", "ROS", "TypeScript", "React"],
            liveUrl: "#",
            githubUrl: "#",
          },
        ].map((project, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="text-pretty">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Modified AcademicSection wrapper to remove section padding
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
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Education */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">Education</h3>
          </div>
          
          {academicData.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{edu.degree}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-primary font-medium">CGPA: {edu.gpa}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    {edu.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Publications */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">Research & Publications</h3>
          </div>
          
          {academicData.publications.slice(0, 1).map((pub, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{pub.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{pub.authors.join(", ")}</p>
                  <p className="text-sm font-medium">{pub.journal}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(pub.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
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

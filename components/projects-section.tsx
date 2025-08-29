import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
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
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my recent work in full-stack development and robotics engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
                    <Badge key={tech} variant="outline" className="text-base">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Details
                    </Link>
                  </Button>
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

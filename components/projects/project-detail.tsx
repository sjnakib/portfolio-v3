import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, Calendar, User, Tag, CheckCircle, XCircle, TrendingUp } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-16 bg-muted h-[40vh] md:h-[50vh]">
        <img
          src={project.images[0]?.src || "/placeholder.svg"}
          alt={`${project.title} project screenshot`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end">
          <div className="p-8 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance mb-4">{project.title}</h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-pretty mb-6">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} className="bg-white/20 text-white hover:bg-white/30">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid lg:grid-cols-3 gap-16">
        {/* Left Column - Description */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none text-pretty">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Challenges & Solutions</h2>
            <ul className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <h3 className="font-medium">Challenge {index + 1}</h3>
                  </div>
                  <p className="text-muted-foreground ml-7">{challenge}</p>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Outcomes & Results</h2>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <li key={index} className="flex gap-3">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column - Project Info */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-muted-foreground">
                      {project.roles.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-muted-foreground">
                      {project.type === "client-website" && "Client Website"}
                      {project.type === "personal-project" && "Personal Project"}
                      {project.type === "ui-mockup" && "UI/UX Design"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {project.liveUrl && (
                  <Button className="w-full" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </a>
                  </Button>
                )}
                
                {project.sourceUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Me</h3>
            <p className="text-muted-foreground">
              Interested in a similar project? Let's discuss how I can help bring your ideas to life.
            </p>
            <Button className="w-full" asChild>
              <Link href="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Projects - Would be implemented with actual related project logic */}
    </div>
  )
}

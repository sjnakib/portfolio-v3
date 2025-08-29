import { ProjectGallery } from "@/components/projects/project-gallery"

export const metadata = {
  title: "Projects | Shafaat Jamil Nakib",
  description: "Browse through my portfolio of web development and robotics projects.",
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">My Projects</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Curated showcase of my most significant projects.
        </p>
      </div>
      <ProjectGallery />
    </main>
  )
}

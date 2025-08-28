import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectGallery } from "@/components/projects/project-gallery"

export const metadata = {
  title: "Projects | Shafaat Jamil Nakib",
  description: "Browse through my portfolio of web development and robotics projects.",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my work in full-stack development, UI/UX design, and robotics engineering
          </p>
        </div>
        <ProjectGallery />
      </main>
      <Footer />
    </div>
  )
}

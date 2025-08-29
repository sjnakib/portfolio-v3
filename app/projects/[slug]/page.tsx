import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/projects/project-detail"
import projectsData from "@/data/projects.json"

export const dynamicParams = false

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectsData.projects.find((p) => p.slug === params.slug)
  
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Projects | Shafaat Jamil Nakib`,
    description: project.shortDescription,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main>
      <ProjectDetail project={project} />
    </main>
  )
}

import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div>
        <ProjectsSection />
        <AcademicHighlightsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  )
}

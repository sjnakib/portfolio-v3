import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { AcademicHighlightsSection } from "@/components/academic-highlights-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <HeroSection />
        <div>
          <ProjectsSection />
          <AcademicHighlightsSection />
          <AboutSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

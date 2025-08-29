import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { TabbedSection } from "@/components/tabbed-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div>
        <TabbedSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  )
}

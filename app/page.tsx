import { HeroSection } from "@/components/hero-section"
import { TabbedSection } from "@/components/tabbed-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div>
        <TabbedSection />
      </div>
    </main>
  )
}
  
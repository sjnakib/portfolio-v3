import { AboutDetail } from "@/components/about/about-detail"

export const metadata = {
  title: "About Me | Shafaat Jamil Nakib",
  description: "Join me on a journey through my personal adventures, hobbies, and passions - from anime to open-source software.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">The Adventure Begins</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the story beyond the code - my personal journey through technology and life
        </p>
      </div>
      <AboutDetail />
    </main>
  )
}

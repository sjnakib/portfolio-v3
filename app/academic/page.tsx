import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AcademicSection } from "@/components/academic/academic-section"

export const metadata = {
  title: "Academic Background | Shafaat Jamil Nakib",
  description: "Academic achievements, research publications, and educational background of Shafaat Jamil Nakib.",
}

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Academic Background</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My educational journey, research work, and academic achievements
          </p>
        </div>
        <AcademicSection />
      </main>
      <Footer />
    </div>
  )
}

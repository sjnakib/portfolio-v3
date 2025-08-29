import { AboutDetail } from "@/components/about/about-detail"

export const metadata = {
  title: "About Me | Shafaat Jamil Nakib",
  description: "Learn more about Shafaat Jamil Nakib, a full-stack developer and robotics engineer.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About Me</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My journey, skills, and passion for technology and innovation
        </p>
      </div>
      <AboutDetail />
    </main>
  )
}

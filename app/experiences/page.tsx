import { ExperiencesSection } from "@/components/experiences/experiences-section";

export const metadata = {
  title: "Professional Experience | Shafaat Jamil Nakib",
  description:
    "Professional work experience, roles, and achievements of Shafaat Jamil Nakib.",
};

export default function ExperiencesPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Professional Experience
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My professional journey, roles, and accomplishments.
        </p>
      </div>
      <ExperiencesSection />
    </main>
  );
}

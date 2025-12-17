import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Film,
  Globe,
  Cat,
  Code,
  Milestone,
  Scroll,
} from "lucide-react";
import experienceData from "@/data/experience.json";
import personalData from "@/data/personal.json";
import Image from "next/image";

export function AboutDetail() {
  const { skills } = experienceData;
  const {
    introduction,
    personalJourney,
    philosophies,
    milestones,
    currentQuest,
  } = personalData;

  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Film":
        return <Film className="h-5 w-5 text-primary" />;
      case "Globe":
        return <Globe className="h-5 w-5 text-primary" />;
      case "Cat":
        return <Cat className="h-5 w-5 text-primary" />;
      case "Code":
        return <Code className="h-5 w-5 text-primary" />;
      default:
        return <Code className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-16">
      {/* Adventure Introduction */}
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted p-8">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Image
            src="/grid.svg"
            alt="Adventure background"
            fill
            className="opacity-10"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              {introduction.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {introduction.paragraphs.map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-4">
              <Button size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-80 h-96 rounded-lg overflow-hidden border transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src={introduction.photo || "/placeholder-user.jpg"}
                alt="Shafaat Jamil Nakib"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Personal Journey Cards */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <Scroll className="mr-2 h-6 w-6 text-primary" />
          Personal Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalJourney.map((journey: any) => (
            <Card
              key={journey.title}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {getIconComponent(journey.icon)}
                  </div>
                  {journey.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">{journey.description}</p>

                {journey.favorites && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Favorites:</h4>
                    <div className="flex flex-wrap gap-2">
                      {journey.favorites.map((fav: string) => (
                        <Badge
                          key={fav}
                          variant="secondary"
                          className="hover:scale-105 transition-transform"
                        >
                          {fav}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {journey.memorable && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Memorable Moments:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {journey.memorable.map((mem: string) => (
                        <Badge
                          key={mem}
                          variant="secondary"
                          className="hover:scale-105 transition-transform"
                        >
                          {mem}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {journey.traits && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Cat Traits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {journey.traits.map((trait: string) => (
                        <Badge
                          key={trait}
                          variant="secondary"
                          className="hover:scale-105 transition-transform"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {journey.favorite_finds && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Favorite Finds:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {journey.favorite_finds.map((find: string) => (
                        <Badge
                          key={find}
                          variant="secondary"
                          className="hover:scale-105 transition-transform"
                        >
                          {find}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Adventure Timeline */}
      <section>
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <Milestone className="mr-2 h-6 w-6 text-primary" />
          Milestone Adventures
        </h2>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-16 w-0.5 bg-border"></div>

          {milestones.map((milestone: any) => (
            <div key={milestone.year} className="relative pl-24 pb-12">
              <div className="absolute left-12 w-9 h-9 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>

              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader className="bg-muted/30 pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <span className="text-2xl font-bold text-primary mr-3">
                      {milestone.year}
                    </span>
                    {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Expertise - kept from the original with a new design */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Professional Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card
              key={category}
              className="h-full hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="bg-muted/30 pb-3">
                <CardTitle className="text-lg capitalize">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {(skillList as string[]).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:scale-105 transition-transform"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal Philosophies */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold mb-8">Guiding Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophies.map((philosophy: string, index: number) => (
            <div
              key={index}
              className="bg-muted/30 rounded-lg p-8 border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-3xl -z-10"></div>
              <p className="text-lg italic">"{philosophy}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Quest */}
      <section>
        <div className="relative rounded-xl overflow-hidden border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background/0 -z-10"></div>
          <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              Current Quest: {currentQuest.title}
            </h2>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              {currentQuest.description}
            </p>
            <div className="flex justify-center pt-6">
              <Button size="lg" asChild>
                <a href="/contact">Join My Adventure</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

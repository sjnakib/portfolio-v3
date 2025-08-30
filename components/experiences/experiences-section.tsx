import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import experienceData from "@/data/experience.json"

export function ExperiencesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
        <div className="grid gap-6">
          {experienceData.experiences.map((experience, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex flex-wrap justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold">{experience.company}</h3>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="font-medium">{experience.position}</p>
                  <p className="text-sm text-muted-foreground">{experience.location}</p>
                </div>

                <ul className="list-disc pl-5 space-y-1 mb-4">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      {responsibility}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-muted/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string) {
  if (dateString === "Present") return dateString;
  
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  return `${month} ${date.getFullYear()}`;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ResearchProject {
  title: string;
  description: string;
  technologies: string[];
  outcomes: string[];
}

interface ResearchItemProps {
  project: ResearchProject;
}

export function ResearchItem({ project }: ResearchItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{project.description}</p>
        
        <div>
          <p className="font-medium mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-base">{tech}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <p className="font-medium mb-2">Outcomes</p>
          <ul className="list-disc list-inside space-y-1">
            {project.outcomes.map((outcome, index) => (
              <li key={index} className="text-muted-foreground">{outcome}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

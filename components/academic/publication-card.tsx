import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  date: string;
  link: string;
  abstract: string;
}

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-lg">{publication.title}</CardTitle>
            <CardDescription className="mt-1">{publication.journal}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {new Date(publication.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Authors</p>
          <p className="text-sm text-muted-foreground">{publication.authors.join(", ")}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Abstract</p>
          <p className="text-sm text-muted-foreground">{publication.abstract}</p>
        </div>
        
        {publication.link && (
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
              <a href={publication.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                View Publication
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

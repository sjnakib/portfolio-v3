import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, FileText, ArrowRight, Lightbulb } from "lucide-react"
import academicData from "@/data/academic.json"
import type { AcademicData } from "@/types/academic"

export function AcademicHighlightsSection() {
  const { education, publications } = academicData as AcademicData
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Academic Highlights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My educational background, research work, and publications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-primary font-medium">CGPA: {edu.gpa}</p>
                    </div>
                    <p className="text-base text-muted-foreground">
                      {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground mt-2">
                      {edu.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Publications */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Research & Publications</h3>
            </div>
            
            {publications.length > 0 ? (
              publications.slice(0, 1).map((pub, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{pub.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-base text-muted-foreground">{pub.authors.join(", ")}</p>
                      <p className="text-base font-medium">{pub.journal}</p>
                      <p className="text-base text-muted-foreground">
                        {new Date(pub.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Publications coming soon as I continue my academic journey.
                  </p>
                </CardContent>
              </Card>
            )}
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Research Focus Areas</h3>
                <p className="text-muted-foreground mt-1">Web Development, UI/UX Design, Robotics</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/academic">
              Learn More About My Academic Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

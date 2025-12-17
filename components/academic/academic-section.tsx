import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PublicationCard } from "@/components/academic/publication-card";
import { ResearchItem } from "@/components/academic/research-item";
import academicData from "@/data/academic.json";

export function AcademicSection() {
  const { education, publications, researchProjects } = academicData;

  return (
    <div className="space-y-16">
      {/* Education Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </p>
                    <p className="text-primary font-medium mt-1">
                      CGPA: {edu.gpa}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Academic Highlights</h3>
                <ul className="list-disc list-inside space-y-1">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Publications and Research Tabs */}
      <Tabs defaultValue="publications">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="research">Research Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="publications" className="space-y-6">
          {publications.map((publication, index) => (
            <PublicationCard key={index} publication={publication} />
          ))}
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          {researchProjects.map((project, index) => (
            <ResearchItem key={index} project={project} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Academic & Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory
            title="Programming & Analysis"
            skills={[
              "Data Structures & Algorithms",
              "Statistical Analysis",
              "Machine Learning",
              "NLP",
              "Computer Vision",
            ]}
          />
          <SkillCategory
            title="Research & Development"
            skills={[
              "Experimental Design",
              "Literature Review",
              "Technical Writing",
              "Peer Review",
              "Prototyping",
            ]}
          />
          <SkillCategory
            title="Tools & Frameworks"
            skills={["TensorFlow", "PyTorch", "MATLAB", "ROS", "LaTeX"]}
          />
        </div>
      </section>
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-base">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

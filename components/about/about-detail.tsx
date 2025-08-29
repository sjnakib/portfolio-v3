import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, GraduationCap, Award } from "lucide-react"
import experienceData from "@/data/experience.json"
import academicData from "@/data/academic.json"

export function AboutDetail() {
  const { experiences, skills, certifications } = experienceData
  
  return (
    <div className="space-y-16">
      {/* Personal Introduction */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Professional Background</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a full-stack developer and robotics engineer with a passion for building innovative solutions that
              bridge the gap between software and hardware. With expertise in modern web technologies and robotics
              systems, I create applications that are both user-friendly and technically robust.
            </p>
            <p>
              My academic background in Computer Science from BRAC University, where I graduated with a 3.97 GPA,
              provided me with a strong foundation in algorithms, data structures, and system design. As a research
              assistant in the university's robotics lab, I developed a keen interest in autonomous systems and
              computer vision.
            </p>
            <p>
              Throughout my professional career, I've worked on a diverse range of projects, from enterprise-level web
              applications to autonomous robotic systems. I take pride in writing clean, maintainable code and
              designing intuitive user experiences that solve real-world problems.
            </p>
          </div>
          <div>
            <Button size="lg" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-80 h-96 rounded-lg bg-muted flex items-center justify-center border">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Professional Photo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold capitalize mb-4">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Professional Experience</h2>
        <div className="relative space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                {index < experiences.length - 1 && <div className="w-0.5 grow bg-border mt-2"></div>}
              </div>
              <div className="space-y-3 pb-8">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company}, {exp.location}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <ul className="space-y-2 list-disc list-inside">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-muted-foreground">{resp}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                  {exp.technologies.length > 5 && (
                    <Badge variant="outline">+{exp.technologies.length - 5} more</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Issued: {formatDate(cert.date)}
                    {cert.expires && <span> · Expires: {formatDate(cert.expires)}</span>}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal Interests */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Personal Interests</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Beyond my professional work, I'm an avid tech enthusiast who enjoys exploring emerging technologies
                and contributing to open-source projects. I'm particularly interested in the intersection of robotics
                and artificial intelligence, and how they can be applied to solve real-world problems.
              </p>
              <p>
                In my free time, I enjoy participating in hackathons, attending tech conferences, and mentoring
                aspiring developers. I also have a passion for photography and hiking, which helps me maintain a
                healthy work-life balance.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}

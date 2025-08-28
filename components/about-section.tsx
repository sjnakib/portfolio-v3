import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Passionate about creating innovative solutions through code and robotics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              I'm a full-stack developer and robotics engineer with a passion for building innovative solutions that
              bridge the gap between software and hardware. With expertise in modern web technologies and robotics
              systems, I create applications that are both user-friendly and technically robust.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              My experience spans from developing scalable web applications using React and Next.js to designing
              autonomous robotics systems with ROS. I believe in writing clean, maintainable code and creating solutions
              that make a real impact.
            </p>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground text-pretty">
                  "Shafaat consistently delivers high-quality solutions and demonstrates exceptional problem-solving
                  skills in both software development and robotics engineering."
                </blockquote>
                <footer className="mt-4 text-sm text-muted-foreground">— Previous Team Lead</footer>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-96 bg-muted rounded-lg flex items-center justify-center border">
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
        </div>
      </div>
    </section>
  )
}

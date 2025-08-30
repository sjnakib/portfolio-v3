import Link from "next/link"
import { Github, Linkedin, Mail, X } from "lucide-react"
import siteSettings from "@/data/siteSettings.json"

export function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  const { owner, social, navigation } = siteSettings
  
  return (
    <footer className="border-t bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Left section - Brand */}
          <div className="space-y-4">
            <p className="text-sm font-mono text-primary/80">{owner.motto}</p>
            <p className="text-muted-foreground text-pretty">
              {owner.bio}
            </p>
          </div>
          
          {/* Site Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Site Navigation</h3>
            <nav>
              <ul className="space-y-2">
                {navigation.headerLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      href={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {social.slice(0, 5).map((item) => (
                <Link
                  key={item.platform}
                  href={item.url}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={item.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon === "Github" && <Github className="h-5 w-5" />}
                  {item.icon === "Linkedin" && <Linkedin className="h-5 w-5" />}
                  {item.icon === "X" && <X className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-semibold">Contact</h3>
            <Link
              href={`mailto:${owner.email}`}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <Mail className="h-4 w-4 mr-2 group-hover:text-primary" />
              {owner.email}
            </Link>
            {owner.phone && (
              <p className="text-muted-foreground">
                {owner.phone}
              </p>
            )}
            {owner.location && (
              <p className="text-muted-foreground text-sm">
                {owner.location}
              </p>
            )}
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {owner.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

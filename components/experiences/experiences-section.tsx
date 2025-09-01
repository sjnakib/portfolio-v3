import { ExternalLink } from "lucide-react"
import experienceData from "@/data/experience.json"

export function ExperiencesSection() {
  // Define interfaces for TypeScript
  interface Role {
    title: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    technologies: string[];
  }

  interface Company {
    name: string;
    logo: string;
    location: string;
    url?: string;
    roles: Role[];
  }

  // Format date in "MMM YYYY" format
  const formatDate = (dateString: string): string => {
    if (dateString === "Present") return "Present";
    return new Date(dateString).toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
  };

  // Calculate duration between two dates
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else if (months === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  // Calculate total duration at company across all roles
  const calculateCompanyDuration = (roles: Role[]): string => {
    if (!roles || roles.length === 0) return "";
    
    // Find earliest start date and latest end date
    const startDates = roles.map(role => new Date(role.startDate));
    const endDates = roles.map(role => role.endDate === "Present" ? new Date() : new Date(role.endDate));
    
    const earliestStart = new Date(Math.min(...startDates.map(date => date.getTime())));
    const latestEnd = new Date(Math.max(...endDates.map(date => date.getTime())));
    
    const startFormatted = earliestStart.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
    const endFormatted = latestEnd.getTime() === new Date().getTime() 
      ? "Present" 
      : latestEnd.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
    
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Professional Experience</h2>
        <div className="grid gap-10">
          {experienceData.companies.map((company: Company, index: number) => (
            <div 
              key={index} 
              className="group border-2 border-primary/20 rounded-md p-6 bg-muted/5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 relative"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40 rounded-tl-sm"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/40 rounded-tr-sm"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/40 rounded-bl-sm"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40 rounded-br-sm"></div>
              
              {/* Company Header */}
              <div className="flex items-center gap-4 mb-6">
                {/* Logo */}
                <div className="w-14 h-14 rounded-md bg-background flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-sm">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                
                {/* Company Name and Duration */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold">{company.name}</h3>
                    {company.url && (
                      <a 
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col text-base text-muted-foreground">
                    <span>{company.location}</span>
                    <span>{calculateCompanyDuration(company.roles)}</span>
                  </div>
                </div>
              </div>
                
              {/* Roles Section - LinkedIn style with vertical timeline */}
              <div className="pl-7 relative">
                {company.roles.map((role, roleIndex) => (
                  <div 
                    key={roleIndex} 
                    className={`relative mb-8 pl-10 ${roleIndex < company.roles.length - 1 ? 'pb-2' : ''}`}
                  >
                    {/* Timeline connector */}
                    {roleIndex < company.roles.length - 1 && (
                      <div className="absolute left-1.5 top-3 bottom-0 w-0.5 bg-primary/30"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background"></div>
                    
                    {/* Role details */}
                    <div className="mb-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                        <h4 className="font-semibold text-lg">{role.title}</h4>
                        <div className="text-base text-primary font-medium mt-1 sm:mt-0 flex items-center gap-1 sm:ml-3">
                          <span>{formatDate(role.startDate)} - {formatDate(role.endDate)}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{calculateDuration(role.startDate, role.endDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Responsibilities */}
                    <div className="mb-4">
                      <ul className="space-y-2 list-disc list-outside pl-5">
                        {role.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Technologies/Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {role.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-primary/10 text-primary px-2 py-0.5 text-sm font-medium rounded-full shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

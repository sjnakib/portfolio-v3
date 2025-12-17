export interface Education {
  institution: string;
  degree: string;
  logo: string;
  location: string;
  url: string;
  gpa: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  endDate: string | null;
  description: string;
}

export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  date: string;
  link: string;
  abstract: string;
}

export interface ResearchProject {
  title: string;
  description: string;
  technologies: string[];
  outcomes: string[];
}

export interface AcademicData {
  education: Education[];
  achievements: Achievement[];
  publications: Publication[];
  researchProjects: ResearchProject[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  type: 'client-website' | 'personal-project' | 'ui-mockup';
  startDate: string;
  endDate: string;
  technologies: string[];
  roles: string[];
  features: string[];
  challenges: string[];
  outcomes: string[];
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  liveUrl?: string;
  sourceUrl?: string;
  date: string;
}

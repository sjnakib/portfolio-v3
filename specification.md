# Portfolio Website — Technical Specification (Next.js, production-ready)

## Overview and Goals

This document provides a comprehensive technical specification for building a stunning, beautiful, and simple portfolio website with world-class UX and UI design using Next.js. The primary goal is to create a fast, accessible, modern portfolio that gives a hiring manager an immediate — within 10–20 seconds — clear sense of your academic background, technical skill level, the types of work you do, and provides an easy path to your resume and contact information.

The portfolio should:
1. Showcase both academic achievements and practical work (websites for clients and UI/UX mockups)
2. Present information in a clear, concise manner optimized for the 10-20 second scanning behavior of recruiters
3. Feature excellent aesthetics with responsive design and exceptional UX
4. Balance creativity with usability, avoiding overwhelming or overly complicated features
5. Be structured following best industry standards, with modular and maintainable code
6. Create a sense of awe through its visual design and technical implementation

This specification is designed to be implemented deterministically, with no room for ambiguity.

## Tech Stack (explicit)

### Core Technologies
- **Framework**: Next.js 14+ (App Router) - Latest stable Next.js implementing React Server Components + Client Components pattern
- **Language**: TypeScript (strict mode) - For type safety and developer experience
- **Styling**: 
  - Tailwind CSS with shadcn/ui components for consistent design language
  - CSS variables for tokens and theme customization
  - Support for both light and dark modes with smooth transitions (dark mode as default)

### UI/UX Components
- **Animations**: CSS animations for polished, performant transitions and micro-interactions
- **Icons**: Lucide React icons (comprehensive, minimal set) - Use only where functionally necessary
- **Image handling**: next/image with proper optimization, placeholders, and blur-up technique
  - All images use appropriate sizing strategies (fill/responsive) with blurDataURL placeholders
  - Placeholder images clearly labeled for easy replacement

### Backend & Integration
- **Forms/serverless**: Next.js API routes (Server Actions) for handling form submissions
  - Resend for transactional emails (modern, developer-friendly alternative to SendGrid)
  - Fallback to privacy-first form service (Formspree) if preferred

### Code Quality & Development
- **Linting/formatting**: 
  - ESLint with Next.js plugin and strict TypeScript rules
  - Prettier for consistent code formatting
  - Import sorting with @ianvs/prettier-plugin-sort-imports
- **Testing**: 
  - Vitest + React Testing Library for component testing
  - Playwright for critical end-to-end user flows
- **Accessibility testing**: 
  - axe-core (vitest-axe) for automated checks
  - Manual keyboard navigation and screen reader testing

### Deployment & Monitoring
- **CI/CD**: GitHub Actions workflow (Build → Lint → Tests → Deploy)
- **Hosting**: Vercel for optimal Next.js performance and analytics
  - Environment variables for secure credential management
- **Analytics**: Vercel Analytics (privacy-focused, zero-config) or Google Analytics

### Content Management
- **Data Storage**: JSON files in /data directory
  - projects.json for all project information
  - academic.json for educational achievements and publications
  - experience.json for work experience
- **Resume**: PDF with machine-readable JSON version for ATS compatibility

## Project Architecture & File Structure

```
/app
  /layout.tsx                -> Global layout with header/footer, theme provider
  /page.tsx                  -> Home page with hero section and key sections
  /projects/
    /page.tsx                -> Project gallery with filter options
    /[slug]/page.tsx         -> Detailed project view
  /academic/
    /page.tsx                -> Academic achievements, research, publications
  /about/
    /page.tsx                -> Personal background, skills, education
  /contact/
    /page.tsx                -> Contact form and information
  /api/
    /contact/
      /route.ts              -> POST endpoint for contact form
    /resume/
      /route.ts              -> Serve machine-readable resume data
/components
  /ui/                       -> All shadcn/ui components (button, card, etc.)
  /sections/
    /hero-section.tsx        -> Above-the-fold introduction
    /about-section.tsx       -> Brief about section for homepage
    /projects-section.tsx    -> Featured projects showcase
    /academic-section.tsx    -> Academic highlights
    /contact-section.tsx     -> Quick contact form or links
  /layout/
    /header.tsx              -> Site header with navigation
    /footer.tsx              -> Site footer with links
  /projects/
    /project-card.tsx        -> Individual project card
    /project-detail.tsx      -> Project details component
    /project-gallery.tsx     -> Project grid layout
  /academic/
    /publication-card.tsx    -> Publication listing
    /research-item.tsx       -> Research project item
  /theme/
    /theme-provider.tsx      -> Context provider for theme
    /theme-toggle.tsx        -> Light/dark mode toggle
/lib
  /utils.ts                  -> Utility functions
  /constants.ts              -> Site constants
  /animations.ts             -> Animation variants for Framer Motion
  /hooks/
    /use-intersection.ts     -> Custom hooks for viewport animations
    /use-theme.ts            -> Theme hook
/styles
  /globals.css               -> Global styles
  /themes.css                -> Theme variables and tokens
/data
  /projects.json             -> Project data
  /academic.json             -> Academic achievements data
  /experience.json           -> Work experience data
  /siteSettings.json         -> Global site configuration and content
/public
  /placeholders/             -> Placeholder images
  /resume.pdf                -> Downloadable resume
  /fonts/                    -> Local font files if applicable
  /favicon.ico               -> Site favicon
```

## Content Model Schemas

### Site Settings Schema
```json
{
  "owner": {
    "name": "Shafaat Jamil Nakib",
    "title": "Frontend & UI/UX Developer",
    "location": "Dhaka, Bangladesh",
    "email": "sjnakib@gmail.com",
    "avatar": "/profile-photo.jpg",
    "bio": "Brief biography for metadata and SEO purposes",
    "motto": "// Design, Code, Innovate"
  },
  "social": [
    {
      "platform": "GitHub",
      "url": "https://github.com/sjnakib",
      "icon": "Github"
    },
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/sjnakib",
      "icon": "Linkedin"
    },
    {
      "platform": "X",
      "url": "https://x.com/username",
      "icon": "X"
    }
  ],
  "navigation": {
    "headerLinks": [
      { "name": "Home", "path": "/" },
      { "name": "Projects", "path": "/projects" },
      { "name": "Academic", "path": "/academic" },
      { "name": "About Me", "path": "/about" }
    ]
  },
  "hero": {
    "greeting": "Hi!, I'm",
    "mainTitle": "FRONTEND & UI/UX DEVELOPER",
    "location": "Dhaka, Bangladesh",
  }
}
```

### Project Schema
```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "slug": "project-title",
      "shortDescription": "Brief one-line description of the project",
      "fullDescription": "Detailed multi-paragraph description of the project",
      "type": "client-website | personal-project | ui-mockup", // Display as "Professional Work", "Personal Projects", "Design Work"
      "technologies": ["Next.js", "React", "TailwindCSS", "etc"],
      "roles": ["Full-stack Developer", "UI Designer", "etc"],
      "features": [
        "Key feature 1 with active verb",
        "Key feature 2 with active verb"
      ],
      "challenges": [
        "Challenge faced and how it was overcome"
      ],
      "outcomes": [
        "Measurable outcome or impact if available"
      ],
      "images": [
        {
          "src": "/placeholders/project-1.png",
          "alt": "Descriptive alt text",
          "caption": "Optional caption"
        }
      ],
      "liveUrl": "https://example.com",
      "sourceUrl": "https://github.com/username/repo",
      "date": "2023-08"
    }
  ]
}
```

### Academic Schema
```json
{
  "education": [
    {
      "institution": "BRAC University",
      "degree": "BSc in Computer Science and Engineering",
      "gpa": "3.97/4.0",
      "location": "Dhaka, Bangladesh",
      "startDate": "2016-01",
      "endDate": "2020-12",
      "highlights": [
        "Top of class in algorithm design",
        "Research assistant in robotics lab"
      ]
    }
  ],
  "publications": [
    {
      "title": "Publication Title",
      "authors": ["Shafaat Jamil Nakib", "Co-author Name"],
      "journal": "Journal or Conference Name",
      "date": "2022-05",
      "link": "https://doi.org/...",
      "abstract": "Brief abstract of the publication"
    }
  ],
  "researchProjects": [
    {
      "title": "Research Project Title",
      "description": "Brief description of the research project",
      "technologies": ["Python", "ROS", "etc"],
      "outcomes": ["Research outcome or impact"]
    }
  ]
}
```

## Page-by-Page Design & Requirements

### 1. Home Page (/)

#### Header
- **Structure & Layout**:
  - **Position**: Sticky navigation bar fixed at the top of the viewport
  - **Left Section**: 
    - Site domain name "sjnakib" in a slim stadium-shaped border as logo
    - Text uses font-medium weight (500) instead of bold for a refined, modern appearance
    - Border is thin (1px) with semi-transparent primary color (80% opacity) for elegant appearance
    - Small solid circle in primary color preceding the text for visual interest
    - Circle perfectly aligned with the text baseline for visual harmony
    - Hover animation with subtle scale-up (transform: scale(1.05)) and color shift matching the site theme
    - Stadium shape uses border-radius with elongated sides for distinctive appearance
    - Links to homepage (/)
  - **Center Section**:
    - Navigation links ("Home", "Projects", "Academic", "About Me")
    - Each link with unique hover effect (underline expanding from center)
    - Active page visually differentiated
    - Uses display: flex with justify-content: center for even spacing
  - **Right Section**:
    - Theme toggle for switching between light and dark modes
    - Theme toggle features visually enlarged icons using CSS transform scale (1.8x) for dramatic size increase
    - Icons wrapped in scaled container div to overcome SVG rendering limitations
    - Base icon size of 20px (h-5 w-5) scaled to appear approximately 36px
    - Multi-level flexbox centering to ensure perfect icon alignment and position
    - Precise positioning of the sun/moon icons within their container using absolute positioning
    - Prominent "Contact Me" button as rightmost element with contrasting background
    - Rounded corners and dynamic hover effect (background color change, shadow)
    - Links to contact page (/contact)
  - **Mobile**:
    - Site logo "sjnakib" with decorative circle positioned at leftmost side of header with appropriate padding
    - Hamburger menu uses the same CSS transform scaling (1.8x) for visual consistency
    - Icon scaling approach ensures cross-browser compatibility and proper rendering
    - Theme toggle and hamburger menu icons visually enlarged to the same degree for perfect balance
    - Both buttons maintain reasonable 40px × 40px footprints while containing visually enlarged icons
    - Additional wrapper divs with flex centering to ensure proper alignment in the header
    - CSS transform technique provides cleaner scaling than manipulating SVG dimensions directly
    - Icons centered precisely within multiple nested flex containers for perfect alignment
    - Hamburger menu positioned at rightmost side of header with enough margin to be fully visible (min 12px from edge)
    - "Contact Me" button moved inside the hamburger menu
    - Collapsible hamburger menu with smooth animation
    - Menu automatically closes when user clicks outside of it (improved UX with click-outside detection)
    - Uses React refs to track both menu container and toggle button for accurate click detection
    - Full-width overlay navigation when expanded
    - Navigation link names are consistent with desktop view ("Home", "Projects", "Academic", "About Me")
    - Menu items have distinctive hover effect (color change, slight scaling)
    - Current/active page visually differentiated (bold font, accent color, or subtle indicator)
    - Header should adapt to smallest screens (320px width) without UI elements being cut off
- **Styling**:
  - Background: Dark, semi-transparent (rgba(20, 20, 20, 0.8)) with backdrop-filter: blur(10px)
  - Border: Thin border at the bottom using primary theme color (border-primary/20 for normal state, border-primary/30 for scrolled state) for subtle visual separation
  - Typography: "Inter" font, navigation links at font-size: 1rem, font-weight: 500
  - Transitions: Smooth transitions (0.3s ease-in-out) for all hover/active states
  - Accessible: All interactive elements keyboard-navigable with ARIA labels

#### Hero Section
- **Position**: Full viewport height (100vh), ensuring all content is visible without scrolling on any device
- **Structure & Layout**:
  - **Central Content Block**:
    - **Avatar & Greeting** (Avatar hidden on mobile):
      - Small rounded avatar/image with subtle pulsing animation (hidden on mobile)
      - "Hello, I'm Shafaat Jamil Nakib" text with typewriter effect on load
    - **Main Title/Profession**:
      - Large, bold typography displaying professional identity
      - "FRONTEND & UI/UX DEVELOPER" broken into multiple lines
      - Keywords in different vibrant colors (FRONTEND, UI/UX in orange, DEVELOPER in cyan)
      - The "&" character is greyed out (low profile, muted color) and has no hover animation
      - Interactive text effect on hover for main keywords (subtle scale shifts)
    - **CTAs**:
      - Primary "View Projects" button
      - Secondary "Download Resume" button with download icon
      - "Let's Connect" button positioned near main title
    - **Supporting Information**:
      - Contextual tags: "// Based in Dhaka, Bangladesh"
      - Small product tags with colored backgrounds
      - Role tags: "// UI/UX Designer", "Full Stack Developer"
    - **Location Information**:
      - Display with location pin icon
      - Shows "Dhaka, Bangladesh" to indicate location
  - **Background**:
    - Subtle, non-distracting animation (particles, geometric shapes, or gradient)
- **Styling**:
  - Background: Deep, dark color (#121212 or similar dark purple/black)
  - Typography:
    - "Inter" font family throughout
    - Greeting: font-size: 1.2rem, font-weight: 400, lighter color, monospace font (code-like) with comment syntax (//) styling
    - Typewriter effect that mimics code writing with blinking cursor
    - Main Title: font-size: clamp(2.5rem, 8vw, 6rem), font-weight: 800, vibrant colors
    - Location: font-size: 1rem (standard body text size), font-weight: 400, light grey, with location pin icon
    - Tags: font-size: 1rem (standard body text size), subtle colors, rounded backgrounds
  - Spacing: Ample vertical and horizontal spacing for clean, uncrowded feel
  - Responsive: Font sizes scale fluidly with viewport width using clamp() or media queries
- **Functionality**:
  - Dynamic text animations on load
  - Smooth scrolling to anchor links
  - Distinct hover and active states for buttons

#### Skills Section
- Horizontal scrollable row of skill badges (visible on all devices)
- Focused list of key technologies: React, Next.js, Node.js, TypeScript, Figma, Git, Linux
- Each badge has minimal, consistent styling with optional micro-icon
- Text size maintains standard body font size (1rem) for better readability

#### Featured Projects Section
- Grid of 3-4 featured projects (your best work)
- Each card includes:
  - Project image placeholder (16:9 ratio)
  - Project title
  - Short description (1-2 lines max)
  - Technologies used (as small badges)
  - "View Details" link/button
- Filter tabs above grid: All, Web Development, UI/UX, Academic
- Subtle hover effects on cards with elevation change

#### Academic Highlights Section
- Visual timeline of key academic achievements
- BRAC University degree with GPA highlight
- Any significant research or publications summarized (1-2 max)
- "Learn More" link to academic page

#### Brief About Section
- 2-3 sentence personal introduction
- Emphasis on combined academic and practical expertise
- Link to full About page

#### Contact CTA
- Simple, prominent call to action
- Short form (email + message) or direct "Contact Me" button
- Professional social links (LinkedIn, GitHub)

### 2. Projects Page (/projects)

#### Header
- Page title with brief description
- Appropriate text sizing that scales with viewport (smaller on mobile, larger on desktop)
- Adequate vertical spacing (reduced on mobile)
- Consistent horizontal padding that prevents content from touching screen edges

#### Filter System
- Streamlined and intuitive filtering experience:
  - Compact, single-row design that minimizes vertical space
  - Two-level filtering system combining categories and technologies
  - Category buttons with clear, meaningful labels (not technical jargon):
    - "All Projects" for complete portfolio
    - "Professional Work" instead of generic "client-website"
    - "Personal Projects" for self-initiated work
    - "Design Work" instead of technical "UI/UX mockups"
  - Technology filtering with prominent, relevant tech badges:
    - Focus on recruiters' most sought-after skills (6-8 key technologies)
    - Visual highlighting of active filters through button/badge styling
    - No redundant active filters display – selected state is clear from highlighting
  - Single "Reset" button that appears only when filters are active:
    - Positioned at the right end of the filter bar
    - Provides quick way to clear all selections at once
  - Consistent text size matching the rest of the site
  - Responsive design across all devices:
    - Standard text size (16px) for better readability
    - Touch-friendly tap targets (min 44×44px)
    - Flexible wrapping on smaller screens
    - Divider between category and technology sections

#### Content Strategy for Recruiters
- Optimize for quick evaluation (10-20 second scan):
  - Present technology skills prominently for immediate identification
  - Use meaningful labels that resonate with non-technical reviewers
  - Prioritize clear categorization over technical accuracy
  - Enable efficient filtering based on job requirements
  - Provide visual feedback through clear highlighting of selected options
  - Minimize cognitive load by removing redundant information
  - Focus attention on the projects themselves rather than the filtering UI
  
#### Project Grid
- Fully responsive grid layout:
  - 1 column on mobile (<640px)
  - 1-2 columns on tablet (640px-1024px)
  - 3 columns on desktop (>1024px)
- Appropriate gap spacing that scales with screen size (smaller on mobile)
- Even margins around grid to prevent edge collision

#### Individual Project Cards
- Mobile-optimized design:
  - Reduced padding on mobile (16px) vs desktop (24px)
  - Smaller font sizes on mobile with proper scaling
  - Limited number of technology badges on mobile (3 max)
  - Properly sized buttons for touch interaction
  - Square icon buttons with adequate touch targets
- Clean, minimalist design
- Clear hierarchy of information
- Subtle hover animations (where appropriate for device)
- Consistent image sizing and treatment

### 3. Project Detail Page (/projects/[slug])

#### Hero Section
- Full-width project featured image with overlay text
- Project title and one-line description
- Key technologies used as badges

#### Project Overview
- Two-column layout:
  - Left: Detailed description of project
  - Right: Key information panel
    - Role/contribution
    - Project duration
    - Client (if applicable)
    - Technologies used (detailed list)

#### Project Content
- Clear sections with headings:
  - Challenge/Problem Statement
  - Approach/Solution
  - Key Features Implemented
  - Technical Details
  - Outcomes/Results

#### Visual Gallery
- High-quality images of the project
  - Use placeholders with clear labeling
  - Support for multiple image formats
  - Optional lightbox for enlarged viewing

#### Call to Action
- Live site link (if applicable)
- GitHub repository link (if applicable)
- Contact CTA for similar projects

#### Related Projects
- 2-3 related project cards at bottom of page

### 4. Academic Page (/academic)

#### Education Section
- Visually appealing representation of educational background
- BRAC University with degree details
- GPA and academic achievements
- Relevant coursework highlights

#### Publications Section
- Academic paper citations in standard format
- Brief abstracts with "Read More" expansion
- Links to papers where available
- Co-authors and publication details

#### Research Projects
- Research focus areas
- Technologies and methodologies used
- Visual representation of results or findings
- Impact of research (if applicable)

#### Skills & Certifications
- Academic and technical skills organized by category
- Any relevant certifications or specialized training
- Proficiency indicators for key skills

### 5. About Page (/about)

#### Personal Introduction
- Professional headshot placeholder
- Extended but concise personal bio (3-4 paragraphs)
- Career objectives and professional philosophy
- Balance between academic background and practical skills

#### Skills & Expertise
- Visual representation of skill categories:
  - Programming & Development
  - Academic & Research
  - Tools & Technologies
  - Soft Skills
- Proficiency indicators for each skill

#### Experience Timeline
- Visual timeline of professional and academic milestones
- Brief descriptions of key roles and achievements
- Interactive elements on hover/tap

#### Personal Interests
- Brief section on relevant interests and hobbies
- Connection to professional work where applicable

#### Resume Download
- Prominent button for downloading full PDF resume
- Option for viewing resume online

### 6. Contact Page (/contact)

#### Contact Form
- Clean, accessible form design with fields for:
  - Name
  - Email
  - Subject
  - Message
- Proper validation with helpful error messages
- Success/confirmation message after submission
- Privacy notice about data handling

#### Contact Information
- Professional email address
- LinkedIn profile link
- GitHub profile link
- Any other professional platforms

#### Availability Information
- Expected response time
- Preferred contact method
- Current availability for new opportunities

## UI & Design System

### Colors
- **Primary**: #0f172a (deep navy) - For key elements and emphasis
- **Secondary**: #6366f1 (indigo) - For accents and interactive elements
- **Neutral**: 
  - Light mode: #f8fafc (near white) to #64748b (slate)
  - Dark mode: #0f172a (deep navy) to #cbd5e1 (light slate)
- **Accent**: #06b6d4 (cyan) - For highlights and call-to-action elements
- **Success**: #10b981 (emerald) - For success states
- **Warning**: #f59e0b (amber) - For warnings
- **Error**: #ef4444 (red) - For errors

### Typography
- **Primary Font**: Inter (modern, clean sans-serif)
  - Headings: 700 weight
  - Body: 400 weight
  - Emphasis: 500 or 600 weight
- **Secondary Font**: (Optional) JetBrains Mono for code snippets
- **Font Sizes**:
  - Heading 1: 3rem/48px (desktop), 2.25rem/36px (mobile)
  - Heading 2: 2.25rem/36px (desktop), 1.875rem/30px (mobile)
  - Heading 3: 1.5rem/24px (desktop), 1.25rem/20px (mobile)
  - Body: 1rem/16px
  - Small: 0.875rem/14px
- **Line Heights**:
  - Headings: 1.2
  - Body: 1.5
  - Tight: 1.25 (for certain UI elements)

### Spacing
- **Scale**: 0.25rem (4px) increments
- **Key spaces**: 
  - 0.25rem/4px (xs)
  - 0.5rem/8px (sm)
  - 1rem/16px (md)
  - 1.5rem/24px (lg)
  - 2rem/32px (xl)
  - 3rem/48px (2xl)
  - 4rem/64px (3xl)

### Shadows
- **Subtle**: 0 1px 2px rgba(0,0,0,0.05)
- **Medium**: 0 4px 6px -1px rgba(0,0,0,0.1)
- **Large**: 0 10px 15px -3px rgba(0,0,0,0.1)

### Border Radius
- **Small**: 0.25rem/4px
- **Medium**: 0.5rem/8px
- **Large**: 1rem/16px
- **Full**: 9999px (for circular elements)

### Animations
- **Transitions**: 
  - Fast: 150ms
  - Medium: 300ms
  - Slow: 500ms
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1) (nice smooth feel)
- **Hover Effects**:
  - Scale: transform: scale(1.02)
  - Elevation: increased shadow
  - Color shift: subtle brightness increase
- **Page Transitions**: Subtle fade between pages
- **Loading States**: Skeleton screens instead of spinners
- **Typewriter Effects**:
  - Code-like typing effect for greeting with syntax highlighting
  - Customized cursor blink animation
  - Random pauses to mimic human typing pattern

## Interaction Patterns

### Navigation
- Sticky header that minimizes on scroll
- Active page indication
- Smooth scroll to sections on home page
- Mobile: hamburger menu with elegant animation

### Footer
- **Structure & Layout**:
  - **Left Section**: 
    - Brief motto/statement (e.g., "// Design, Code, Engage")
    - Portfolio owner's brief summary
  - **Center Section**:
    - Social media links with scalable SVG icons (GitHub, LinkedIn, X, etc.)
    - Icons with subtle hover effects (color change, slight scale)
    - Even spacing between icons
  - **Right Section**:
    - Contact email address with clickable mailto: link
    - Subtle hover effect on email link
- **Styling**:
  - Background: Dark, consistent with the header/hero section
  - Typography: "Inter" font, font-size: 0.9rem, light grey color
  - Spacing: Generous padding to separate from main content
  - Border-top: subtle divider between content and footer
- **Functionality**:
  - All links should be fully accessible with keyboard navigation
  - Social icons should have appropriate aria-labels
  - Copyright information with current year (dynamically updated)

### Project Browsing
- Filter options that update dynamically without page reload
- Infinite scroll or pagination for many projects
- Hover state on cards shows brief additional info

### Image Handling
- Lazy loading for all images
- Blur-up technique for image loading
- Optional lightbox for project images
- Responsive images that maintain aspect ratio

### Forms
- Inline validation with helpful error messages
- Submit button shows loading state
- Success/error messages as toast notifications
- Autofocus on first field when form appears

### Accessibility Features
- Skip to content link
- ARIA labels for all interactive elements
- Focus indicators that are visible and attractive
- Color contrast that meets WCAG AA standards
- Keyboard navigation support throughout
- Screen reader friendly markup

## Performance Targets

- **Initial Load**: < 2s (First Contentful Paint)
- **Total Page Size**: < 1MB initial load
- **Lighthouse Scores**:
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - Best Practices: ≥ 95
  - SEO: ≥ 95
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

## Implementation Requirements

### SEO Optimization
- Next.js metadata for all pages
- Proper heading hierarchy (h1, h2, etc.)
- Structured data for personal information
- Sitemap.xml and robots.txt
- Open Graph and X card meta tags
- Canonical URLs

### Responsive Design
- Mobile-first approach (design for smallest screen first, then enhance for larger screens)
- Comprehensive breakpoints:
  - Small mobile: 320px - 480px (must test on iPhone SE/5)
  - Mobile: 481px - 639px
  - Tablet: 640px - 1024px
  - Desktop: 1025px - 1280px
  - Large desktop: > 1280px

#### Mobile Optimization
- Set viewport correctly: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">`
- Proper touch targets:
  - Minimum size: 44px × 44px for all interactive elements
  - Adequate spacing between touch targets (min 8px)
  - Prioritize larger targets for important actions
- UI Element Visibility:
  - No UI elements cut off at screen edges (min 12px safe zone)
  - All interactive elements fully accessible without horizontal scrolling
  - Avoid fixed width containers on mobile
  - Use relative width units (%, vw) over fixed widths
  - Use container queries where needed for component-specific responsive behavior
  
#### Content Adaptations
- Typography scaling:
  - Use fluid typography with clamp() for key text elements
  - Small mobile: base text 14-16px
  - Desktop: base text 16-18px
  - Headings scale proportionally (use relative em units)
- Content prioritization:
  - Hide less important content on mobile
  - Reorder content for mobile priority
  - Use progressive disclosure for complex information
- Component adaptations:
  - Filter systems: vertical stack or scrollable on mobile
  - Multi-column grids: single column on mobile
  - Navigation: hamburger menu with adequate tap targets
  - Forms: stacked inputs with full width on mobile

#### Layout & Spacing
- Use consistent padding that scales appropriately:
  - Small mobile: 12px margins/padding
  - Mobile: 16px margins/padding
  - Tablet: 24px margins/padding  
  - Desktop: 32px+ margins/padding
- Flexible grid systems:
  - Use smaller gaps on mobile (16px) vs desktop (24-32px)
  - Adjust number of columns based on screen width
  - Test content overflow for all screen sizes
- Test extreme cases:
  - Verify layout on 320px width devices
  - Test with enlarged text (200%)
  - Ensure keyboard navigation doesn't cause overflow

### Analytics & Monitoring
- Page views and user flow tracking
- Event tracking for key interactions
- Performance monitoring
- Error logging
- Privacy-compliant analytics

### Security Considerations
- Form validation and sanitization
- Rate limiting for contact form
- XSS protection
- CSRF protection
- Secure headers

### Testing & Quality Assurance
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing
- Accessibility testing
- Performance testing
- End-to-end user flows

## Implementation Plan

1. **Setup & Infrastructure**
   - Initialize Next.js 14+ project with TypeScript
   - Configure Tailwind CSS and shadcn/ui
   - Set up linting and formatting tools
   - Create folder structure and component architecture

2. **Core Components Development**
   - Create layout components (header, footer)
   - Build UI component library using shadcn/ui
   - Implement theme switching functionality
   - Create page templates

3. **Content & Data Structure**
   - Define JSON schemas for projects, academic info
   - Create placeholder content
   - Build data fetching utilities

4. **Page Development**
   - Home page with all sections
   - Projects listing page with filtering
   - Project detail page template
   - Academic and About pages
   - Contact page with form functionality

5. **Enhancements & Polish**
   - Animations and transitions
   - Performance optimization
   - Accessibility improvements
   - SEO optimization
   - Cross-browser and device testing

6. **Deployment & Post-launch**
   - Vercel deployment setup
   - Analytics integration
   - Final quality assurance
   - Documentation

## Future Enhancement Possibilities

- **Blog Section**: For sharing technical articles or academic insights
- **Interactive Resume**: Enhanced visual version of resume
- **Dark/Light Mode Refinements**: Advanced theme customization
- **Internationalization**: Multiple language support
- **Microinteractions**: Additional polish for delightful user experience

This specification provides a comprehensive blueprint for creating a stunning portfolio website that effectively communicates both academic achievements and practical development skills. The resulting site will create immediate impact with recruiters while maintaining excellent performance and accessibility.

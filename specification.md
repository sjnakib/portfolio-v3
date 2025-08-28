# Portfolio Website — Technical Specification (Next.js, production-ready)

## Overview and Goals

This document provides a comprehensive technical specification for building a stunning, beautiful, and simple portfolio website with world-class UX and UI design using Next.js. The primary goal is to create a fast, accessible, modern portfolio that gives a hiring manager an immediate — within 10–20 seconds — clear sense of your professional background, technical skill level, the types of work you do, and provides an easy path to your resume and contact information.

The portfolio should:
1. Showcase professional work (websites for clients and UI/UX designs)
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
  - Support for both light and dark modes with smooth transitions

### UI/UX Components
- **Animations**: Framer Motion for polished, performant transitions and micro-interactions
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
  - education.json for educational background
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
  /designs/
    /page.tsx                -> UI/UX design portfolio and case studies
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
    /designs-section.tsx     -> UI/UX design highlights
    /contact-section.tsx     -> Quick contact form or links
  /layout/
    /header.tsx              -> Site header with navigation
    /footer/
      /footer.tsx            -> Main footer component
      /footer-column.tsx     -> Reusable footer column component
      /footer-nav.tsx        -> Footer navigation links
      /footer-social.tsx     -> Social media links section
      /footer-cta.tsx        -> Call-to-action buttons section
      /footer-branding.tsx   -> Large branding statement component
  /projects/
    /project-card.tsx        -> Individual project card
    /project-detail.tsx      -> Project details component
    /project-gallery.tsx     -> Project grid layout
  /designs/
    /design-card.tsx         -> Design project card
    /case-study-item.tsx     -> Case study component
  /theme/
    /theme-provider.tsx      -> Context provider for theme
    /theme-toggle.tsx        -> Light/dark mode toggle
/lib
  /utils.ts                  -> Utility functions
  /constants.ts              -> Site constants
  /animations/
    /index.ts                -> Main animation exports
    /fade.ts                 -> Fade animation variants
    /slide.ts                -> Slide animation variants
    /scale.ts                -> Scale animation variants
    /stagger.ts              -> Stagger helpers for sequenced animations
    /scroll.ts               -> Scroll-triggered animation utilities
    /hero.ts                 -> Hero section specific animations
  /hooks/
    /use-intersection.ts     -> Custom hooks for viewport animations
    /use-animation-sequence.ts -> Hook for sequencing multiple animations
    /use-parallax.ts         -> Hook for parallax effects on scroll
    /use-theme.ts            -> Theme hook
    /use-reduced-motion.ts   -> Hook for respecting reduced motion preferences
/styles
  /globals.css               -> Global styles
  /themes.css                -> Theme variables and tokens
/data
  /projects.json             -> Project data
  /education.json            -> Educational background data
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
    "title": "Full-Stack & UI/UX Developer",
    "location": "Dhaka, Bangladesh",
    "email": "shafaat@example.com",
    "phone": "+1 (555) 123-4567",
    "avatar": "/profile-photo.jpg",
    "bio": "Brief biography for metadata and SEO purposes",
    "motto": "// Design, Code, Innovate",
    "tagline": "Where aesthetics & functionality meet",
    "brandDisplay": "Shafaat Jamil Nakib"
  },
  "social": [
    {
      "platform": "GitHub",
      "url": "https://github.com/username",
      "icon": "Github"
    },
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/username",
      "icon": "Linkedin"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com/username",
      "icon": "Twitter"
    },
    {
      "platform": "Behance",
      "url": "https://behance.net/username",
      "icon": "Behance"
    },
    {
      "platform": "Dribbble",
      "url": "https://dribbble.com/username",
      "icon": "Dribbble"
    },
    {
      "platform": "Discord",
      "url": "https://discord.com/users/username",
      "icon": "MessageSquare"
    }
  ],
  "navigation": {
    "headerLinks": [
      { "name": "Home", "path": "/" },
      { "name": "Projects", "path": "/projects" },
      { "name": "Academics", "path": "/academic" },
      { "name": "About Me", "path": "/about" }
    ]
  },
  "hero": {
    "greeting": "Hello, I'm",
    "mainTitle": "FULL-STACK & UI/UX DEVELOPER",
    "tagline": "I create digital experiences that border on efficiency, aesthetics and functionality.",
    "contextualTags": [
      "// Based in Dhaka, Bangladesh",
      "// UI/UX Designer",
      "// Full-Stack Developer"
    ]
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
      "type": "client-website | personal-project | ui-mockup",
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

### Education Schema
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
        "Web development specialization",
        "UI/UX design projects"
      ]
    }
  ],
  "courses": [
    {
      "title": "Advanced UI/UX Design",
      "provider": "Course Provider",
      "date": "2022-05",
      "credential": "https://credential-link...",
      "description": "Brief description of the course"
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      "category": "Design",
      "items": ["Figma", "User Research", "Wireframing", "Prototyping"]
    },
    {
      "category": "Backend",
      "items": ["Node.js", "Express", "MongoDB", "PostgreSQL"]
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
    - Portfolio owner's name or custom logo in SVG format
    - Hover animation with subtle scale-up (transform: scale(1.05)) or color shift
    - Links to homepage (/)
  - **Center Section**:
    - Navigation links ("Home", "Projects", "Academics", "About Me")
    - Each link with unique hover effect (underline expanding from center)
    - Active page visually differentiated
    - Uses display: flex with justify-content: center for even spacing
  - **Right Section**:
    - Prominent "Contact Me" button with contrasting background
    - Rounded corners and dynamic hover effect (background color change, shadow)
    - Links to contact page (/contact)
    - Resume download button and theme toggle
  - **Mobile**:
    - Collapsible hamburger menu with smooth animation
    - Full-width overlay navigation when expanded
- **Styling**:
  - Background: Dark, semi-transparent (rgba(20, 20, 20, 0.8)) with backdrop-filter: blur(10px)
  - Typography: "Inter" font, navigation links at font-size: 1rem, font-weight: 500
  - Transitions: Smooth transitions (0.3s ease-in-out) for all hover/active states
  - Accessible: All interactive elements keyboard-navigable with ARIA labels

#### Hero Section
- **Position**: Commanding above-the-fold presence with depth layers creating an immersive digital landscape
- **Structure & Layout**:
  - **Central Content Block**:
    - **Avatar & Greeting**:
      - Dynamic avatar with breathing animation effect and subtle 3D rotation that follows cursor movement
      - Pulsating energy aura radiating from avatar in primary brand colors with variable intensity
      - "Hello, I'm Shafaat Jamil Nakib" text revealed through high-fidelity typewriter effect with:
        - Variable typing rhythm (faster in middle, slower at beginning/end) for natural feel
        - Optional subtle keyboard sound effects on character appearance
        - Cursor that blinks with realistic timing (750ms cycle)
      - Avatar enters with cinematic reveal combining scale transformation, rotation and shadow effects (0.8s with elastic easing)
    - **Main Title/Profession**:
      - Dramatic typographic statement with exaggerated scale and weight contrasts
      - "FULL-STACK & UI/UX DEVELOPER" presented as layered 3D text with depth perception:
        - "FULL-STACK" in electric blue-to-purple gradient (#4361EE to #9D4EDD) with metallic sheen
        - "&" in accent gold with reflective texture effect (#FFD700 with subtle highlight)
        - "UI/UX" in vibrant sunset gradient (#FF4E50 to #F9D423) that shifts with scroll
        - "DEVELOPER" in deep teal-to-green gradient (#0F3443 to #34E89E) with subtle glow
      - Each word magnetically responds to cursor proximity:
        - Letters subtly rotate to track cursor position (max 3° rotation)
        - Highlight effect that follows cursor across text surface
        - Subtle distortion field that pulls nearby elements
      - Theatrical entrance sequence with each line dramatically revealing:
        - First line slides in from left with slight rotation and settles with bounce
        - Second line reveals from invisible to visible with glitch transition
        - Final line rises from bottom with momentum overshoot
    - **CTAs**:
      - Primary "View Projects" button with:
        - Dynamic gradient background that animates on hover (shifts hue and saturation)
        - Energetic floating animation combining y-axis movement with subtle rotation
        - Arrow icon that extends and pulses when hovered (elastic animation)
        - Tactile click effect with ripple animation and momentary color flash
      - Secondary "Download Resume" button with:
        - Animated border that circulates around the button perimeter (3s cycle)
        - Download icon that transforms from cloud to downward arrow on hover
        - Scale transformation and elevation change creating physical presence
        - Progress animation on click showing download initiation
      - "Let's Connect" button with:
        - Hypnotic glow effect with breathing animation (4s cycle)
        - Micro-particle burst effect on hover emanating from center
        - Message icon with subtle notification ping animation
        - Interactive shadow that extends in direction of hover
      - Choreographed entrance for all buttons with:
        - Staggered timing creating visual rhythm (0.2s between each)
        - Different entrance directions for visual interest
        - Momentum physics with slight bounce at end of animation
    - **Supporting Information**:
      - Contextual tags with dynamic entrance effects:
        - Background expands from central point with content fade-in
        - Periodic shimmer effect that sweeps across tags (30s cycle)
        - Border glow that intensifies on hover or focus
      - Role tags with interactive features:
        - Tags expand on hover revealing additional context/skills
        - Custom tooltip with relevant skill icons on extended hover
        - Subtle color shift animation cycling through brand palette
      - Tags orchestrated to appear in sequence:
        - Wave-like motion pattern creating visual rhythm
        - Progressive delay pattern (0.1s, 0.2s, 0.4s, etc.)
        - Brief attention-drawing pulse as each completes its entrance
    - **Tagline/Value Proposition**:
      - Dynamic statement with theatrical text reveal:
        - Words appear with dramatic mask effect (wipe from bottom)
        - Key terms highlighted with animated underline that draws itself
        - Color accents that pulse subtly after appearing
        - Words magnify when cursor approaches (scale: 1.05)
        - Custom hover effects for each highlighted term relating to meaning:
          - "efficiency" with speed lines animation
          - "aesthetics" with color bloom effect
          - "functionality" with mechanical micro-animation

  - **Background**:
    - Multi-dimensional digital environment:
      - Base gradient with subtle animated flow (very slow movement, 60s cycle)
      - Advanced particle system with physics behavior:
        - Particles gravitate toward cursor with realistic momentum
        - Density increases near interactive elements
        - Color shifts based on section focus and cursor position
      - Abstract geometric shapes that:
        - Float with simulated physics (subtle rotation and drift)
        - React to scroll and mouse movement with parallax effect
        - Occasionally pulse or glow creating visual rhythm
      - Subtle grid system or topographic lines:
        - Distorts slightly based on cursor position (warping effect)
        - Fades in/out based on scroll position
        - Creates perception of infinite space and depth
- **Styling**:
  - Background: Rich, dimensional dark environment (#0F172A with multi-layered overlay elements)
    - Gradient undertones that shift imperceptibly (60s full cycle)
    - Atmospheric fog/haze effect creating depth perception
    - Occasional light flares or particle bursts at key interactions
  - Typography:
    - "Inter" font family with dramatic weight variations (200 to 900)
    - Custom letter-spacing and kerning for perfect visual rhythm
    - Greeting: font-size: 1.2rem, font-weight: 400, with subtle gradient and text-shadow
    - Main Title: font-size: clamp(3rem, 10vw, 7rem), ultra-bold (900), with layered text effects:
      - Inner text with gradient fill
      - Subtle outline (0.5px) in complementary color
      - Drop shadow with variable blur based on theme
    - Tagline: font-size: clamp(1.2rem, 4vw, 1.8rem), light (300), with animated highlights
    - Tags: font-size: 0.85rem, with custom padding and animated borders
  - Lighting Effects:
    - Simulated directional lighting that influences shadows and highlights
    - Ambient glow around key interactive elements (variable intensity based on importance)
    - Dynamic shadows that respond to scroll position (light source appears to move)
    - Occasional light ray effects that sweep across sections
  - Spacing: Deliberate use of negative space creating dramatic composition:
    - Golden ratio relationships between elements
    - Asymmetric balance creating visual interest
    - Dynamic spacing that adjusts with viewport size
  - Material Design Elements:
    - Subtle texture overlays creating material feel (paper, metal, glass)
    - Depth layers with appropriate shadow effects
    - Micro-interactions that respect physical world behaviors
    - Reflective surfaces on key elements (subtle specular highlights)
- **Animation System**:
  - Advanced orchestration framework:
    - Narrative-driven sequence telling visual story
    - Perfect timing relationships between elements (golden ratio timing)
    - Animation paths that complement the visual composition
    - Energy transfer between elements (one element's exit energy feeds into next element's entrance)
  - High-fidelity motion design:
    - Custom easing curves tailored for each animation type:
      - Text reveals: cubic-bezier(0.25, 1, 0.5, 1) for smooth, controlled motion
      - Button entrances: cubic-bezier(0.18, 1.25, 0.4, 1) with slight overshoot
      - Background elements: cubic-bezier(0.1, 0.7, 0.6, 0.9) for organic flow
    - Variable speed profiles with acceleration/deceleration
    - Micro-delays creating sense of physical weight and momentum
    - Animation state persistence between visits (remembers exploration state)
  - Physics-based interaction system:
    - Elements respond to cursor with realistic physics
    - Spring animations for natural movement and bounciness
    - Inertia effects when elements start or stop moving
    - Gravity and magnetic attraction between cursor and interactive elements
  - Visual harmony techniques:
    - Coordinated color transitions across multiple elements
    - Rhythmic animation patterns creating visual music
    - Balanced motion across the composition (no visual imbalance)
    - Breathing animation cycles (subtle scale/opacity changes)
  - Optimization and accessibility:
    - Hardware-accelerated animations using compositor-only properties
    - Animation batching preventing layout thrashing
    - Dynamically adjusted complexity based on device performance
    - Elegant fallbacks for reduced-motion preferences
    - Frame rate monitoring with complexity throttling
- **Functionality**:
  - Intelligent interactive system:
    - Context-aware elements that respond differently based on user behavior
    - Progressive disclosure revealing deeper information as user engages
    - Visual feedback synchronized perfectly with interaction
    - State transitions that feel natural and expected
  - Sophisticated hover interaction model:
    - Proximity effects that activate before direct hover
    - Multi-stage hover states that evolve over time
    - Coordinated hover effects between related elements
    - Custom cursor styles that change based on interactive context
  - Multi-sensory feedback (all optional and preference-based):
    - Subtle audio cues enhancing key interactions
    - Haptic feedback for mobile devices on important actions
    - Visual feedback tightly synchronized with other channels
  - Advanced navigation behaviors:
    - Predictive preloading of likely next pages
    - Smooth routing animations preserving context
    - Elements that transform rather than disappear when navigating
    - History-aware animations (different when navigating forward vs. backward)
  - Attention guidance system:
    - Subtle visual cues directing attention to key content
    - Animation timing that guides eye movement naturally
    - Focus management ensuring keyboard users experience designed sequence
    - Intelligent delay system preventing animation overload

#### Skills Section
- Horizontal scrollable row of skill badges (visible on all devices)
- Categories: Programming Languages, Frameworks, Design Tools, Development Technologies
- Visual distinction between categories
- Each badge has minimal, consistent styling with optional micro-icon

#### Featured Projects Section
- Grid of 3-4 featured projects (your best work)
- Each card includes:
  - Project image placeholder (16:9 ratio)
  - Project title
  - Short description (1-2 lines max)
  - Technologies used (as small badges)
  - "View Details" link/button
- Filter tabs above grid: All, Web Development, UI/UX Designs, Mobile Apps
- Subtle hover effects on cards with elevation change

#### Design Highlights Section
- Visual gallery of key UI/UX design projects
- Featured case studies with thumbnails
- Design process highlights and key outcomes
- "View All Designs" link to designs page

#### Brief About Section
- 2-3 sentence personal introduction
- Emphasis on professional development and design expertise
- Link to full About page

#### Contact CTA
- Simple, prominent call to action
- Short form (email + message) or direct "Contact Me" button
- Professional social links (LinkedIn, GitHub)

### 2. Projects Page (/projects)

#### Header
- Page title with brief description
- Filter system (tabs or dropdown):
  - All Projects
  - Client Websites
  - Personal Projects
  - UI/UX Designs
  
#### Project Grid
- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Consistent card design with:
  - Large project image (16:9)
  - Title and short description
  - Technologies used as badges
  - Project type indicator
  - "View Details" action

#### Individual Project Cards
- Clean, minimalist design
- Clear hierarchy of information
- Subtle hover animations
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

### 4. UI/UX Designs Page (/designs)

#### Design Philosophy Section
- Visual representation of your design approach and principles
- Highlights of your design process and methodology
- Key design tools and technologies used

#### Case Studies Section
- In-depth analysis of select design projects
- Problem statements, research methods, and solutions
- User flow diagrams and wireframes
- Before/after comparisons where applicable

#### Design Gallery
- Grid layout of UI/UX design projects
- Filter options by category (Web, Mobile, Dashboard, etc.)
- Hover states showing brief descriptions
- Thumbnails with consistent aspect ratio

#### Skills & Design Tools
- Visual representation of UI/UX skills
- Software and design tools proficiency
- Design certifications and courses
- Design principles and methodologies

### 5. About Page (/about)

#### Personal Introduction
- Professional headshot placeholder
- Extended but concise personal bio (3-4 paragraphs)
- Career objectives and professional philosophy
- Balance between technical development and design skills

#### Skills & Expertise
- Visual representation of skill categories:
  - Frontend Development
  - UI/UX Design
  - Backend Development
  - Soft Skills
- Proficiency indicators for each skill

#### Experience Timeline
- Visual timeline of professional development milestones
- Brief descriptions of key roles and projects
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
  - Extra Fast: 100ms (micro-interactions)
  - Fast: 150ms (hover effects)
  - Medium: 300ms (element transitions)
  - Slow: 500ms (emphasis transitions)
  - Extra Slow: 800ms+ (hero animations, page transitions)
- **Easing Functions**:
  - Default: cubic-bezier(0.16, 1, 0.3, 1) (nice smooth feel)
  - Entrance: cubic-bezier(0.0, 0.0, 0.2, 1.0) (ease-out, quick start, smooth end)
  - Exit: cubic-bezier(0.4, 0.0, 1, 1) (ease-in, smooth start, quick end)
  - Emphasis: cubic-bezier(0.18, 1.25, 0.4, 1) (slight overshoot for bounce)
- **Hover Effects**:
  - Scale: transform: scale(1.02)
  - Elevation: increased shadow + subtle y-axis translation
  - Color shift: subtle brightness increase or hue rotation
  - Glow: box-shadow with matching element color
  - Float: gentle continuous up/down movement (button hover state)
- **Hero Section Specific**:
  - Staggered entrance: Elements appear in sequence
  - Typewriter effect: Text appears character by character
  - Parallax: Elements move at different speeds on scroll
  - Cursor-following: Elements subtly follow mouse position
- **Page Transitions**: 
  - Subtle fade between pages
  - Optional slide transitions for related content
  - Exit/enter animations for key elements
- **Loading States**: 
  - Skeleton screens instead of spinners
  - Pulsating animation on placeholders (subtle wave effect)
- **Scroll-Triggered Animations**:
  - Fade-in-up for content as it enters viewport
  - Reveal animations for images (mask transitions)
  - Progressive disclosure of complex information
- **Accessibility**:
  - respects prefers-reduced-motion media query
  - Critical information never relies solely on animation
  - No rapidly flashing content (safe for photosensitive users)

## Interaction Patterns

### Navigation
- Sticky header that minimizes on scroll
- Active page indication
- Smooth scroll to sections on home page
- Mobile: hamburger menu with elegant animation

### Footer
- **Structure & Layout**:
  - **Multi-columnar layout** that's responsive across all device sizes with dynamic transitions between breakpoints
  - **Top-Level Content Sections**:
    - **Branding/Tagline Section (Column 1)**:
      - Prominent tagline: "Where aesthetics & functionality meet"
      - The word "meet" styled with vibrant gradient accent color (#4DD0E1 to #6366F1) for emphasis
      - Left-aligned content with subtle left-to-right text reveal animation on page load
      - Background elements with subtle parallax effect on scroll
    - **"Explore" Navigation (Column 2)**:
      - Heading: "Explore" in radiant sunset gradient (#FF9D00 to #FFD180)
      - Vertical list of site links with staggered fade-in animations (0.3s delay between each)
      - Hover effects that transform links with scale (1.02) and color shift to match heading gradient
      - Custom animated underline that expands from left to right on hover (0.3s duration)
    - **"Follow Me" Social Links (Column 3)**:
      - Heading: "Follow Me" in cosmic purple gradient (#A793FF to #6200EA)
      - Vertical list with animated icons for social platforms
      - Links include: LinkedIn, Behance, Dribbble, Discord, GitHub with platform-specific brand colors
      - Icons with float animation on hover (gentle up-down movement, 2s cycle)
      - Glow effect on hover that matches the platform's brand color (box-shadow with 10px blur)
    - **"Contact Me" Call to Actions (Column 4)**:
      - "Contact Me" with animated right-pointing arrow and "Say Hello!" subtext in teal (#00BFA5)
      - "My Projects" with animated right-pointing arrow and "Explore Projects" subtext in amber (#FFC400)
      - Right-aligned content within column with fade-in-left entrance animation
      - Interactive hover effects including arrow animation that extends by 5px with bounce effect
      - Background that subtly shifts gradient on hover (0.5s transition)
  - **Large Branding Statement**:
    - Oversized display of portfolio owner's name or brand with 3D text effect
    - Centered horizontally in footer with dramatic entrance animation (scale + fade)
    - Text with subtle shimmer effect that responds to cursor movement
    - Optional: Letter-by-letter color cycling animation on hover (rainbow gradient)
  - **Bottom Bar**:
    - Left content: Copyright notice with year and Privacy Policy link with glowing underline on hover
    - Right content: Location information with subtle map icon animation
    - Separator with animated gradient line that shifts colors every 10s
- **Styling**:
  - **Background**: Rich dark background with subtle texture and color gradient overlay (#0A0A0A base with #1A1A2E influence)
    - Optional: Very subtle particle system that responds to cursor movement (particles drift toward cursor)
    - Gradient overlay that subtly shifts over time (30s full cycle)
  - **Typography**: 
    - Primary text: Light gray with subtle color variations (#E0E0E0 base)
    - "Inter" font family (consistent with rest of site)
    - Text with subtle shadow effects for depth (text-shadow: 0 1px 3px rgba(0,0,0,0.2))
    - Varied font sizes for hierarchy:
      - Section headings: 1.1em, bold, with custom letter-spacing
      - Links and normal text: 1em with subtle hover transformations
      - Subtext: 0.9em with slightly increased line height for readability
      - Branding statement: Extremely large (8em or larger, responsive) with dramatic weight contrast
      - Bottom bar: 0.8em with subtle transparency (0.8 opacity)
  - **Color accents**:
    - Vibrant gradients rather than flat colors, creating depth and visual interest
    - "Explore" heading: Sunset gradient (#FF9D00 to #FFD180)
    - "Follow Me" heading: Cosmic purple gradient (#A793FF to #6200EA)
    - "Contact" heading: Ocean gradient (#0088FF to #00E5FF)
    - "meet" in tagline: Electric blue-cyan gradient (#4DD0E1 to #00B0FF)
    - Social icons: Platform-specific brand colors with glow effects
  - **Spacing**: 
    - Dynamic spacing that scales proportionally with viewport size
    - Generous vertical padding (4rem+) to separate from main content
    - Elegant negative space to create visual rhythm and balance
    - Significant spacing around large branding statement with responsive adjustments
  - **Decorative Elements**:
    - Subtle animated dot grid background (ultra-low opacity, 0.05)
    - Thin accent lines with gradient colors separating major sections
    - Abstract geometric shapes in background with parallax scrolling effect
- **Responsiveness**:
  - **Mobile**: Columns collapse into single vertical stack with full width sections and specialized animations
  - **Tablet**: Maintains 2 columns with reorganized content and adjusted spacing
  - **Desktop**: Full multi-column layout with maximum visual impact and hover effects
  - Seamless transitions between layouts with elements that reposition rather than simply stack
- **Animation System**:
  - **Entrance Animations**:
    - Staggered fade-in-up for each column (0.2s delay between columns)
    - Text elements animate in with slight delay after their containers
    - Social icons appear with pop effect (quick scale from 0 to 1 with slight overshoot)
  - **Hover Animations**:
    - Links: Custom underline animation + subtle scale + color shift
    - Buttons: Scale (1.02) + elevation change + brightness increase
    - Social icons: Float animation + glow effect + slight rotation
  - **Micro-interactions**:
    - Arrow icons extend on hover with bounce effect
    - Text links have color transition that sweeps from left to right
    - Custom cursor style changes on interactive elements
  - **Performance Optimizations**:
    - GPU-accelerated animations using transform and opacity
    - Reduced motion settings for users with vestibular disorders
    - Efficient animation batching to prevent layout thrashing
- **Functionality**:
  - All links fully accessible with keyboard navigation and enhanced focus states
  - Social icons with appropriate aria-labels and enhanced screen reader descriptions
  - Privacy policy link with animated underline effect on hover and focus
  - Copyright information dynamically updated with current year and fade transition on update
  - Interactive hover states for all clickable elements with coordinated color themes
  - Arrow icons animate with elastic easing on hover/focus
  - Smooth scroll behavior when clicking navigation links

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
- Open Graph and Twitter card meta tags
- Canonical URLs

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  - Large desktop: > 1280px
- Flexible images and grid layouts
- Touch-friendly targets (min 44px × 44px)
- No horizontal scrolling on any screen size

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
   - Define JSON schemas for projects, designs, and personal info
   - Create placeholder content
   - Build data fetching utilities

4. **Page Development**
   - Home page with all sections
   - Projects listing page with filtering
   - Project detail page template
   - Designs and About pages
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

- **Blog Section**: For sharing technical articles or design insights
- **Interactive Resume**: Enhanced visual version of resume
- **Dark/Light Mode Refinements**: Advanced theme customization
- **Internationalization**: Multiple language support
- **Microinteractions**: Additional polish for delightful user experience

This specification provides a comprehensive blueprint for creating a stunning portfolio website that effectively communicates both design expertise and development skills. The resulting site will create immediate impact with recruiters while maintaining excellent performance and accessibility.

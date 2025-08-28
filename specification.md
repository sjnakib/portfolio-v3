Portfolio Website — Technical Specification (Next.js, production-ready)

Goal: a fast, accessible, modern portfolio that gives a hiring manager an immediate — within 10–20 seconds — clear sense of your skill level, the types of work you do, and an easy path to your resume and contact. It must be simple, elegant, creative without being gimmicky, modular, and maintainable so AI or engineers can implement it deterministically.

Tech stack (explicit)

Framework: Next.js (App Router). Use the latest stable Next.js with the App Router (React Server Components + client components pattern).

Language: TypeScript (strict mode).

Styling: Tailwind CSS + CSS variables for tokens. Use Tailwind JIT.

Animations: Framer Motion (for polished, performant transitions).

Icons: Heroicons (only where needed). Use SVG placeholders for any “personal photo” areas.

Image handling: next/image (with placeholders). All images use fill/intrinsic and blurDataURL placeholder.

Forms/serverless: Next.js API routes (or Vercel Serverless Functions). Optionally integrate a transactional email provider (SendGrid) via API for contact form; otherwise use a privacy-first form service (Formspree) to avoid server secrets.

Linting / formatting: ESLint (with Next plugin), Prettier, TypeScript ESLint rules.

Testing: Jest + React Testing Library. Add Playwright for a couple of end-to-end flows (hero CTA, project modal).

Accessibility tests: axe-core (jest-axe) for unit checks, Pa11y/axe for CI spot checks.

CI/CD: GitHub Actions. Build → Lint → Tests → Deploy to Vercel (or GitHub Pages if static build).

Hosting: Vercel (recommended) — use environment variables in Vercel for API keys and analytics.

Analytics: Plausible or Google Analytics (give user option; default to Plausible for privacy).

Optional CMS: Not required. Use a /data/projects.json and MDX for any long-form case studies. Keep content local for control and faster builds.

High-level architecture & routing
/app
  /layout.tsx                -> global layout + header/footer
  /page.tsx                  -> home (hero + 3-second sell)
  /projects/
    /page.tsx                -> projects index (cards)
    /[slug]/page.tsx         -> project detail (server-rendered or ISR)
  /about/page.tsx            -> short about + downloadable resume
  /contact/page.tsx          -> contact form + socials
  /resume.pdf                -> static resume file (download)
  /api/
    contact/route.ts         -> POST endpoint for contact
    resume/route.ts          -> optional resume request logging
/components
  /ui                       -> Button, Card, Avatar, Badge, Icon
  /layout                   -> Header, Footer, Container
  /sections                 -> Hero, Skills, ProjectsList, Testimonial
  /projects                 -> ProjectCard, ProjectModal, ProjectGallery
/styles
  globals.css
  tokens.css
/data
  projects.json
  skills.json
/public
  placeholders (images, favicons)

Content model (JSON) — exact schema for data/projects.json

The AI or developer will use this exact shape; the user will populate entries.

[
  {
    "title": "USIS 2.0",
    "slug": "usis-2-0",
    "roles": ["Full-stack Developer", "Next.js", "Express"],
    "short": "University Student Information System — login, dashboards, advising.",
    "description": "Long description: goals, constraints, your specific contributions (API, schema, auth).",
    "tech": ["Next.js", "React", "Express", "MySQL", "JWT"],
    "images": [
      "/placeholders/project-usis-1.png"
    ],
    "liveUrl": "https://live-site.example.com",  // optional
    "github": "https://github.com/consis-tency/usis",
    "date": "2024-04",
    "highlights": [
       "Built JWT authentication and runtime logging",
       "Designed EER and schema in MySQL",
       "Deployed app on Vercel"
    ]
  }
]


The site uses this JSON to render project cards. You will add your live websites and Figma mockups as entries here. Use image placeholders (e.g., /public/placeholders/figma-accounting.png) until you upload real screenshots.

Pages & UI behavior (precise)
1) Home (/)

Purpose: 10–20 second sell; recruiter should immediately see who you are, what you do, and CTA to view resume or projects.

Layout order (top to bottom):

Header (sticky, subtle)

Left: name (text logo) — clickable to /.

Right: primary nav links → Projects, About, Contact, Resume (resume is a button).

Small theme toggle (light/dark).

Use prefers-reduced-motion for animation opt-out.

Hero (above-the-fold)

Left: Big headline (2 lines max). Example:
Shafaat Jamil Nakib — Full-stack & Robotics engineer creating elegant web apps.
Keep the first line as your name and the second line a one-line specialty.

Right: hero image placeholder (square or circular) — use role="img" with aria-label="Profile placeholder".

Subheading: 1–2 ultra-concise sentences: what you build, technologies (Next.js, Node, React). Add microcopy: Open to internships & junior roles. (optional).

CTAs: View projects (primary) — scrolls to ProjectsList. Download resume (secondary) — direct link to /resume.pdf.

Visual: subtle, tasteful animated underline or reveal on the main heading using Framer Motion; avoid splashy scroll-jacking.

Skill chips row (single-line, horizontally scrollable on mobile):

Use colorless outlined badges: React, Next.js, Node.js, MySQL, Figma, TypeScript, Python, Robotics, ROS.

Ensure icons are minimal; if any icon missing use text only to avoid “weird icons”.

Selected Projects (3 cards) — top 3 strongest items (live sites + Figma accounting mockup placeholder).

Card shows screenshot placeholder, title, tech badges, 1-line summary.

Clicking card opens ProjectDetail overlay (modal) — don’t navigate away for quick scan.

Each card must have an accessible aria-label.

Short About + Contact CTA — 2–3 lines, link to About page.

Footer — small, links to GitHub, LinkedIn, Codeforces/CodeChef/LeetCode (from CV), copyright.

2) Projects (/projects)

Responsive grid (2 columns desktop, 1 column mobile).

Filter row (All / Web / Figma / Robotics) — filter logic implemented client-side; keep minimal.

Each card:

Click opens /projects/[slug] server-rendered page (or modal depending on preference).

Required content: screenshot placeholder, detailed bullets, highlights, live link, repo link, tech stack, date.

Keep the layout scannable: summary line + 4 bullets max + links.

3) Project detail (/projects/[slug])

SEO metadata + canonical.

Layout: left column visuals (carousel), right column content (title, date, roles, tech badges, bullets, problem → approach → result).

Include a callout box for "my role" and "impact" (metrics if available).

Provide an option to expand Figma embed (if you want to embed Figma preview later) — placeholder link.

4) About (/about)

A short crisp paragraph (2–4 sentences) with your top credentials (BRAC University, CGPA 3.97 — only if you want). Use an aside with contact quicklinks and small timeline (education + achievements).

Link to resume.pdf and a downloadable vCard.

5) Contact (/contact)

Minimal form: Name, Email, Subject, Message (max 500 chars). All fields validated client-side and server-side.

On submit: show success toast and send to serverless function that emails and logs to a simple Google Sheet or stores in a small database (if desired). Provide fallback to Formspree.

Provide alternate links: mailto, LinkedIn.

6) Resume

Provide direct link to /resume.pdf cached in /public.

Also a machine-readable JSON resume endpoint for recruiters who want to parse skills: /api/resume.json (automatically generated or manually maintained).

UI / Design system (exact tokens)
Color & typographic tokens (exact values — change if you like)

Primary: --color-primary: #0f172a (deep indigo/near-black)

Accent: --color-accent: #6366f1 (indigo-500)

Muted: --color-muted: #64748b

Background light: --bg: #ffffff / dark --bg-dark: #0b1220

Text: --text-primary: #0b1220 / --text-inverse: #f8fafc

Tailwind config: create CSS variables in :root and map them to Tailwind via theme.extend.colors.

Typography

H1: Inter / system UI, 48px desktop, 32px mobile, font-weight: 700.

Body: 16px, line-height:1.6.

Use font-weights and letter-spacing tokens.

Spacing

Use a scale: 4, 8, 16, 24, 32, 48.

Breakpoints

sm 640px, md 768px, lg 1024px, xl 1280px.

Use lg to switch hero layout from stacked to two-column.

Interaction & motion (rules)

Use subtle motions only. All animations respect prefers-reduced-motion.

Hero heading: small fade+slide-in on load (duration 400ms).

Project cards: hover lift (transform: translateY(-6px), box-shadow).

Modal open/close: scale + fade (use Framer Motion).

Keep transitions consistent: 200–400ms easing cubic-bezier(0.2, 0.9, 0.2, 1).

Accessibility (explicit checklist)

All interactive elements keyboard-focusable; visible focus ring using :focus-visible.

Color contrast: text vs background >= 4.5:1 for body text, >=3:1 for large headings.

Use semantic HTML: <header>, <main>, <section>, <article>, <nav>.

Images: meaningful alt attributes. Placeholder images must have role="img" + aria-label.

Modal aria:

role="dialog", aria-modal="true", trap focus while open, restore focus on close.

Forms: label every input with <label for=...>. Provide ARIA invalid messages.

Landmarks for assistive tech.

Run axe tests and fix critical violations.

Performance & SEO (concrete)

Use next/image with automatic lazy-loading.

Preload critical fonts; use font-display: swap.

Keep Largest Contentful Paint (LCP) < 2.5s. Aim for Lighthouse scores: Performance >= 90, Accessibility >= 90.

Use getStaticProps/ISR for projects index for speed; use server components where possible for non-interactive content.

Add metadata:

<title>Shafaat Jamil Nakib — Full-stack & Robotics</title>

Description: 140–160 chars.

Open Graph + Twitter card with placeholder image.

Sitemap and robots.txt generated by build.

Security & privacy

No third-party trackers by default except selected analytics (Plausible).

Contact endpoint rate-limited and reCAPTCHA optional (if spam risk).

Sanitize all incoming form content server-side.

If using SendGrid or similar, hide API keys in environment variables.

Data & state (client)

Use SWR (stale-while-revalidate) for client-side data fetching (e.g., project list) to cache responses and allow revalidation.

Projects JSON served from /data/projects.json at build time. Optionally add admin flow later to edit via Git commits.

CI / CD (GitHub Actions spec)

/.github/workflows/ci.yml:

Jobs:

lint: npm run lint (fail on errors)

test: npm run test:ci (Jest)

build: npm run build (Next.js)

deploy: optional — deploy to Vercel using Vercel Git integration or use vercel CLI with token in secrets.

On PR: run lint + tests.

On main push: run entire pipeline and deploy.

Tests to include (actual examples)

Unit test: Header renders nav links and theme toggle.

Integration test: ContactForm shows success state on mocked API.

Accessibility test: run jest-axe on Home to ensure no critical violations.

E2E: Playwright test that loads home, opens a project modal, navigates to contact, submits form.

Developer conventions & repository setup

Monorepo not necessary. Single repo with standard Next.js layout.

Branching: main = production, dev = staging. Feature branches off dev.

Commit hooks: Husky + lint-staged to run prettier --write and eslint --fix.

Code style: Prettier with 2-space indent or your preference (be explicit in .prettierrc).

Document component props with TypeScript interfaces and JSDoc comments.

Implementation details (component contracts / props — exact)
Hero component props:
type HeroProps = {
  name: string; // "Shafaat Jamil Nakib"
  title: string; // one-line speciality
  ctaPrimary: { label: string; href: string; onClick?: ()=>void };
  ctaSecondary: { label: string; href: string };
  profilePlaceholderSrc: string; // "/placeholders/profile.png"
};

ProjectCard props:
type ProjectCardProps = {
  title: string;
  short: string;
  slug: string;
  tech: string[];
  imageSrc: string;
  liveUrl?: string;
  github?: string;
  onOpen?: (slug:string)=>void;
};

ProjectModal contract:

Accepts project object.

Keyboard-close on Esc.

Trap focus; first interactive element focused on open.

Content guidelines & microcopy (exact examples you can copy)

Hero CTA: View projects / Download resume.

Skills line heading: Primary tools I use.

Project highlight bullets: use active verbs and quantifiable outcomes:

“Built JWT authentication and runtime logging.”

“Deployed on Vercel; reduced page load by X%” (only insert X if you have the metric).

Contact success message: Thanks! I’ve received your message — I typically reply within 48 hours. (change reply time if you prefer).

Minimal footer microcopy: © {year} Shafaat Jamil Nakib — Built with Next.js.

Placeholders & images

Every image block must show a neutral gray placeholder with a center label: Placeholder — add screenshot.

Provide 3 sizes of placeholder files in /public/placeholders/:

hero-profile.png 600×600

project-lg.png 1200×800

project-thumb.png 600×400

Do not include decorative icons where a real image will be replaced; use the placeholder boxes to preserve layout.

Accessibility & QA checklist (to be run before merge)

Lighthouse audit: Performance >= 90, Accessibility >= 90.

Color contrast checks for headings and body text.

Keyboard-only navigation through header, all nav links, project cards, modals and contact form.

axe run: zero critical violations.

Responsive check at 360px, 768px, 1024px, 1440px.

Run unit and integration tests.

SEO & Hiring manager experience (explicit)

Top fold visible info: Name, one-line specialty, 2 CTAs (projects + resume), and skill badges.

Within 5 seconds: Recruiter can click Download resume or View projects.

Within 20 seconds: Recruiter reads the hero, scans skills, sees 3 featured projects with live links or Figma mockups.

Include mailto: and LinkedIn links in header/footer so recruiter can contact quickly.

Dev & runtime environment variables (exact keys)

SENDGRID_API_KEY (optional)

MAIL_TO_ADDRESS (where contact emails go)

ANALYTICS_ID (Plausible or GA)

VERCEL_URL (auto-set in Vercel)

DO NOT commit environment variables. Use Vercel Secrets or GitHub Secrets.

Example API: POST /api/contact

Request body (JSON)

{
  "name": "Alice",
  "email": "alice@example.com",
  "subject": "Opportunity",
  "message": "Hello!"
}


Server behavior

Validate fields (non-empty, email regex).

Rate-limit by IP (simple in-memory or Redis).

Send email using SendGrid (if available).

Log form to a small persistent store (optionally Google Sheets via API).

Return { status: "ok" } or { error: "..." }.
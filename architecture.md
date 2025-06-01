my-portfolio/
├── public/ # Static assets (images, favicons)
│ └── images/ # Profile pics, slideshow pics
├── src/
│ ├── app/ # Next.js App Router base
│ │ ├── layout.tsx # Global layout
│ │ └── page.tsx # Home page entry
│ ├── components/ # Reusable UI components
│ │ ├── Header.tsx # Typing intro header
│ │ ├── Divider.tsx # Line animation
│ │ ├── About.tsx # About section
│ │ ├── PhotoGallery.tsx # Slideshow gallery (Framer Motion + Image)
│ │ ├── Experience.tsx # Vertical timeline component
│ │ ├── TimelineItem.tsx # Single timeline entry
│ │ ├── Projects.tsx # Container for project cards
│ │ ├── ProjectCard.tsx # Single project card component
│ │ └── GithubLink.tsx # GitHub floating icon link
│ ├── styles/ # Tailwind config & custom styles
│ │ └── globals.css # Tailwind base + custom theme
│ ├── types/ # TS types for props/data models
│ │ └── index.ts # Export shared types
│ └── data/ # Static or JSON data (timeline, projects)
│ ├── experiences.ts # Array of work experience entries
│ └── projects.ts # Array of project entries
├── tailwind.config.ts # Tailwind custom theme (cyberpunk colors)
├── postcss.config.js # Required for Tailwind
├── tsconfig.json # TypeScript configuration
├── .prettierrc # Prettier formatting rules
├── .gitignore
└── README.md

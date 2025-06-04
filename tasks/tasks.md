```markdown
# MVP Build Plan — Step-by-Step Tasks

Using the previously defined architecture, here's a granular, testable task list to build the MVP.
Each task is atomic, focused, and meant to be passed to an engineering LLM one at a time for step-by-step implementation and testing.

---

## 🌐 Project Setup

### 1. Initialize project with Next.js + TypeScript + Tailwind CSS

- `npx create-next-app@latest my-portfolio --typescript --tailwind --eslint --app`
- Select: no src/ folder, no Turbopack

### 2. Set up Prettier config

- Add `.prettierrc`
- Set rules (e.g., printWidth: 100, singleQuote: true, semi: true)
- Add format script to `package.json`

### 3. Clean default boilerplate files

- Clear out `page.tsx` content
- Delete boilerplate styles/images in `public/`

---

## 🎨 Theming and Global Styling

### 4. Configure Tailwind theme (cyberpunk colors)

- Extend `tailwind.config.ts`
- Add dark purple/blue shades, neon glow, custom fonts

### 5. Create `globals.css`

- Set dark background, base font, spacing overrides

---

## 🧱 Component Scaffolding (empty shells first)

### 6. Create basic folder structure under `src/`

- `components/`, `data/`, `types/`, `styles/`

### 7. Create placeholder components:

- `Header.tsx`
- `Divider.tsx`
- `About.tsx`
- `PhotoGallery.tsx`
- `Experience.tsx`
- `TimelineItem.tsx`
- `Projects.tsx`
- `ProjectCard.tsx`
- `GithubLink.tsx`

Each can export a `<div>ComponentName</div>` stub to start.

---

## ✨ Build Each Section

### 8. Implement `Header.tsx`

- Add typing animation (via `typewriter-effect` or `useEffect` + `setTimeout`)
- Text: "Hi, I'm Cece! (Software Developer)"

### 9. Implement `Divider.tsx`

- Create an animated glowing horizontal line (Framer Motion pulsing)

### 10. Add `About.tsx` layout

- Left side: `div` with placeholder paragraph
- Right side: placeholder `PhotoGallery` component

### 11. Implement `PhotoGallery.tsx`

- Load 3 placeholder images from `/public/images`
- Add autoplay or arrow navigation with Framer Motion

### 12. Build out `Experience.tsx`

- Create vertical timeline structure
- Import sample data from `data/experiences.ts`
- Map each item to `TimelineItem`

### 13. Style & animate `TimelineItem.tsx`

- Use Framer Motion fade-in/slide-in per item
- Display job title, company, description, dates

### 14. Build `Projects.tsx`

- Import sample data from `data/projects.ts`
- Use CSS grid to layout cards

### 15. Implement `ProjectCard.tsx`

- Display project name, short description, tech stack footer
- Hover = scale animation (Framer Motion)
- Add subtle box shadow glow

### 16. Add `GithubLink.tsx`

- Floating icon in top-right corner
- Links to GitHub profile or repo

---

## 🧠 Data & Types

### 17. Create `types/index.ts`

- Define types for `Experience`, `Project`

### 18. Populate `data/experiences.ts`

- Create 2-3 mock work entries

### 19. Populate `data/projects.ts`

- Add 2-3 mock projects with tech stack + URLs

---

## 🧪 Integration & Testing

### 20. Import all components into `page.tsx`

- Place them in order: Header → Divider → About → Experience → Projects → GitHub Icon

### 21. Test responsiveness + mobile layout

- Use DevTools for mobile views

### 22. Run Prettier and lint check

- Ensure no formatting issues before deploy

---

## 🚀 Deployment

### 23. Push to GitHub

- Create public repo

### 24. Connect to Vercel

- Set up project with auto-deploy from `main` branch
- Confirm site is live and working

---

## ✅ MVP Complete

Ready for polish, contact form, animations, accessibility, SEO, and more in Phase 2.

---

_End of MVP task list._
```

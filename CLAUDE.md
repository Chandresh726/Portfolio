# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

**Never run dev server as agent, the user will run it to validate any changes.**

## Architecture

This is a Next.js 15 portfolio website using the App Router, React 19, Tailwind CSS 4, and Framer Motion.

### Project Structure

- **app/**: Next.js App Router pages and layouts
  - `layout.tsx`: Root layout with ThemeContext, TooltipProvider, DockNav, and footer
  - `page.tsx`: Homepage assembling all sections
  - `sections/`: Page sections (introduction, experience, projects, about, technologies)
  - `projects/`: Dedicated projects page with filtering

- **components/**: Reusable UI components
  - `index.ts`: Barrel exports for common components
  - `layout/`: Layout components (dock-nav, scroll-progress)
  - `magicui/`: Animation components (blur-fade, dock)
  - `ui/`: Radix-based primitives (button, tooltip, separator)

- **content/**: JSON data files for experience, projects, personal info, SEO
- **constants/**: Static data (technologies, social media, menu items)
- **context/**: React contexts (theme via next-themes)
- **types/**: TypeScript type definitions
- **utils/**: Utility functions (cn for class merging, motion helpers)

### Key Patterns

**Path Aliases**: Import using bare paths (e.g., `import { HeadingDivider } from "components"`) - configured in tsconfig.json.

**Client Components**: Most interactive components use `"use client"` directive for Framer Motion animations and React hooks.

**Theming**: Uses Tailwind CSS 4 with custom CSS variables in `styles/globals.css`. Dark mode via `next-themes` with `.dark` class override.

**Semantic Colors**: Use semantic tokens (`text-on-surface`, `bg-surface`, `text-text-muted`, `border-outline`) rather than raw colors.

### Environment Variables

Required: `NEXT_PUBLIC_RESUME_URL` - URL to resume PDF

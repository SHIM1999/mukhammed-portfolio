# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (port 3000, hot reload)
pnpm build        # Build client with Vite + bundle server with esbuild → dist/
pnpm start        # Run production server (NODE_ENV=production node dist/index.js)
pnpm check        # TypeScript type-check (no emit)
pnpm format       # Prettier format all files
```

Package manager is **pnpm** (not npm or yarn). The `wouter` package has a local patch in `patches/`.

## Architecture

This is a **single-page portfolio** with a static React frontend and a minimal Express server used only as a static file host in production.

**Page composition** (`client/src/pages/Home.tsx`): One page assembling all section components in render order — `Navbar → Hero → About → Timeline → Skills → Projects → EngineeringDirection → Philosophy → Resume → Contact → Footer`. Each section is a standalone component in `client/src/components/` with its own `id` attribute used for scroll-based navigation.

**Navigation**: Wouter handles routes (`/` and `/*` → `NotFound`). Within the page, `Navbar` does anchor-based smooth scroll via `document.getElementById` + `scrollIntoView`, not router links. Active section is tracked by `window.scrollY` vs `offsetTop`.

**Two global contexts** wrap the app in `App.tsx`:
- `LanguageContext` — toggles between `"ENG"` and `"KOR"`. All user-facing strings in sections that support i18n must use the `t(key)` function from `useLanguage()`. Translations are hardcoded in `LanguageContext.tsx`.
- `ThemeContext` — manages dark/light class on `<html>`. Currently set to `defaultTheme="dark"` and non-switchable. To make it switchable, pass `switchable` prop to `ThemeProvider` and use `useTheme()` hook.

**Styling conventions**:
- The dark base background is `oklch(0.07_0.015_265)` — a deep navy/dark blue, not pure black. Used as a literal value in several components, not as a CSS variable.
- Accent color palette: cyan (`cyan-400`, `cyan-500`) for interactive elements and glow effects; indigo for gradients; blue for light-section accents.
- Fonts loaded via Google Fonts CDN in `client/index.html`: **Space Grotesk** (headings/display) and **DM Sans** (body text). Applied via inline `style={{ fontFamily: ... }}` on many elements, not a Tailwind font token.
- Sections alternate between dark theme (`bg-background`, dark cards) and light theme (`bg-white`, `bg-gradient-to-b from-white to-blue-50/20`, light cards with `border-gray-200`). Match the surrounding section's theme when adding new content.

**Animation**: Framer Motion is used throughout. Pattern: `useInView(ref, { once: true, margin: "-80px" })` → animate in on scroll. Entrance animations use `initial={{ opacity: 0, y: 20 }}` and `animate={inView ? { opacity: 1, y: 0 } : {}}`. Easing uses `[0.23, 1, 0.32, 1]` (snappy ease-out).

**Path aliases** (configured in `vite.config.ts`):
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Images/assets**: Do not put images in `client/public/` or `client/src/`. Upload via `manus-upload-file` CLI and reference as `/manus-storage/<key>`.

**Contact form** (`client/src/components/Contact.tsx`): Currently a stub — form submission only toggles a local `sent` state. Needs a real email service (EmailJS, Formspree, etc.) wired up.

**Project/skill data**: Hardcoded arrays at the top of each component file (`projects` in `Projects.tsx`, `skills` in `Skills.tsx`). No external data source.

**Server** (`server/index.ts`): Express static file server only. Serves `dist/public` in production. No API routes — this is a pure static frontend.

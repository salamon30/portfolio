# Portfolio — AI Handoff Brief

This file gives any AI assistant the context it needs to work on this codebase.
**Read this fully before making changes.**

## What this is

Personal portfolio site for Recep Ulaş Uzun. Premium / minimal design (Linear, Vercel, Apple-inspired). Everything is multilingual (English / Turkish / German), supports light + dark mode, and is built to look impressive when sent in job applications.

**Live URL:** set in `NEXT_PUBLIC_SITE_URL` (defaults to `https://recep-uzun.vercel.app`)
**Local path:** `/Users/recepuzun/portfolio`
**Repo:** Next.js 14 App Router project, single package, no monorepo.

## Stack

- **Next.js 14.2** (App Router, server + client components)
- **TypeScript 5**
- **Tailwind CSS 3** (class-based dark mode, CSS variables for theming)
- **Framer Motion 11** (all animations, page transitions, layout animations)
- **react-simple-maps** + **d3-geo** (interactive world map on `/travel`)
- **Resend** (server-side contact form email delivery)
- **@vercel/analytics** (privacy-friendly page view tracking)

No CSS-in-JS, no UI library (Radix/shadcn etc.), no state management library. Everything is hand-rolled with React + Tailwind.

## How to run locally

```bash
cd /Users/recepuzun/portfolio
npm install
cp .env.example .env.local   # optional, only needed for contact form
npm run dev                  # → http://localhost:3000
```

## File structure

```
portfolio/
├─ app/                              ← Next.js App Router. Each folder is a route.
│  ├─ layout.tsx                     ← Root layout: metadata, html shell, providers
│  ├─ page.tsx                       ← / (Home: Hero, metrics, stack, work, tennis)
│  ├─ globals.css                    ← Tailwind layers, CSS variables for theming
│  ├─ icon.tsx                       ← 32×32 favicon (R monogram, generated)
│  ├─ apple-icon.tsx                 ← 180×180 iOS home-screen icon
│  ├─ opengraph-image.tsx            ← 1200×630 social-share preview image
│  ├─ sitemap.ts                     ← /sitemap.xml
│  ├─ robots.ts                      ← /robots.txt
│  ├─ not-found.tsx                  ← Custom 404 page (3-language)
│  ├─ journey/page.tsx               ← /journey (timeline)
│  ├─ projects/page.tsx              ← /projects (filterable grid)
│  ├─ travel/page.tsx                ← /travel (world map + country detail)
│  ├─ think/page.tsx                 ← /think (skills + framework)
│  ├─ contact/page.tsx               ← /contact (form + social links)
│  └─ api/contact/route.ts           ← POST /api/contact (Resend mail send)
│
├─ components/                       ← Reusable UI. All client components.
│  ├─ NavBar.tsx                     ← Sticky top nav, hamburger on mobile
│  ├─ LanguageSwitcher.tsx           ← EN | TR | DE pill in NavBar
│  ├─ ThemeToggle.tsx                ← Sun/moon button in NavBar
│  ├─ ThemeScript.tsx                ← Inline <script> in <head> to prevent FOUC
│  ├─ MotionProvider.tsx             ← Framer MotionConfig (respects reduced-motion)
│  ├─ PageTransition.tsx             ← Wraps children for fade-in route animation
│  ├─ CommandMenu.tsx                ← ⌘K palette: nav, theme, language, links
│  ├─ Timeline.tsx                   ← Used on /journey
│  ├─ TravelGallery.tsx              ← Used on /travel (composes WorldMap + detail)
│  └─ WorldMap.tsx                   ← react-simple-maps wrapper, click + tooltip
│
├─ lib/                              ← Pure data + hooks. Server-safe except where noted.
│  ├─ i18n.ts                        ← *** ALL UI STRINGS in 3 languages ***
│  ├─ projects.ts                    ← *** Project list (edit to add projects) ***
│  ├─ travel.ts                      ← *** Visited countries (edit for new trips) ***
│  └─ socials.ts                     ← *** Social media URLs (linkedin, github, etc) ***
│
├─ public/
│  ├─ cv/CV_Uzun.pdf                 ← The PDF that the "CV" button opens
│  ├─ travel/<country>/              ← Travel photos per country (currently empty)
│  └─ projects/                      ← Project cover images (currently empty)
│
├─ .env.example                      ← Copy to .env.local. Resend key, site URL, etc.
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

The four files marked `***` are the **content surface**. 90% of "update the site" work happens in those.

## Conventions to follow

### Internationalization

Every user-facing string lives in `lib/i18n.ts`. Three dictionaries (`en`, `tr`, `de`) share a typed `Dict` shape — TypeScript will scream if you forget a translation. To use a string in any component:

```tsx
"use client";
import { useT } from "@/lib/i18n";

export function MyComponent() {
  const { t, locale, setLocale } = useT();
  return <h1>{t.nav.home}</h1>;
}
```

Server components cannot use this hook. If a page needs translations, make it a client component (`"use client"` at the top).

When adding a new string:

1. Add the key to the `Dict` type at the top of `lib/i18n.ts`
2. Add the translation to all three of `en`, `tr`, `de` dictionaries below
3. Use `t.<group>.<key>` in the component

### Theming (light + dark)

Driven by a `dark` class on `<html>`. CSS variables are defined in `app/globals.css`:

```css
:root         { --bg: #fff; --fg: #0a0a0a; --accent: #378ADD; ... }
.dark         { --bg: #0a0a0a; --fg: #fafafa; ... }
```

Always reference these via Tailwind arbitrary values (`text-[var(--fg)]`) or the helper utility classes already defined (`text-muted`, `text-faint`, `border-default`, `bg-subtle`). **Never hard-code colors** outside CSS variables — that breaks dark mode.

Accent color is **#378ADD** everywhere (single accent rule).

Theme detection runs in `components/ThemeScript.tsx` (inline `<script>` in `<head>`) to avoid flash. Toggling is in `components/ThemeToggle.tsx`.

### Animations

- All animations use **Framer Motion**, never CSS keyframes (except for one or two utility cases in `globals.css`).
- Use `motion.div`, `motion.section`, etc. with `initial` + `animate` + `transition`.
- For lists, use `AnimatePresence` and unique `key`s.
- Honour user's `prefers-reduced-motion`: this is automatic because the entire app is wrapped in `<MotionConfig reducedMotion="user">` (see `components/MotionProvider.tsx`).
- Keep movement subtle (8–16px, 0.3–0.6s). This site is premium, not playful.

### Design tokens

- Font: **Inter** for sans, default `ui-monospace` for `.num` class
- Border radius: rounded corners are the rule — `rounded-full` for pills, `rounded-xl` for cards, `rounded-2xl` for big surfaces
- Shadow: very subtle, see `shadow-card` / `shadow-cardHover` in `tailwind.config.ts`
- Spacing: generous; sections use `py-20 md:py-28` typically
- Container: `.container-page` (max-width with horizontal padding)

### File patterns

Prefer:
- One file per component, named after the component
- Small subcomponents inline in the same file as long as they belong to that page (see `app/page.tsx` which has Hero, MetricsRow, LogosStrip, OffCourt, Footer all in one file — they only exist on the homepage)
- Data files in `lib/`, never inside components

Avoid:
- Adding new dependencies. We deliberately keep it lean.
- Default exports for components (use named exports — except for Next.js page files, which must be default exports)
- Inline `style={{}}` except where Tailwind cannot express it (gradients, dynamic colors)

## Where to make common changes

| What you want to change | File to edit |
|---|---|
| Add a project | `lib/projects.ts` (add to `PROJECTS` array — full schema in the file) |
| Add a visited country | `lib/travel.ts` (add to `COUNTRIES` array, include ISO numeric code) |
| Update social URLs (LinkedIn, GitHub, etc.) | `lib/socials.ts` |
| Change ANY visible text | `lib/i18n.ts` (search for the English text, update all 3 languages) |
| Replace CV PDF | `public/cv/CV_Uzun.pdf` (filename must stay the same) |
| Add a travel photo | `public/travel/<country>/photo.jpg` + reference in `lib/travel.ts` `photos: []` |
| Add a project cover image | `public/projects/<slug>.jpg` + set `cover: "/projects/<slug>.jpg"` in `lib/projects.ts` |
| Hero headline | `lib/i18n.ts` → `hero.title1` / `hero.title2` (3 langs) |
| Tennis section copy | `lib/i18n.ts` → `tennis.*` (3 langs) |
| Add a new top-level page | Create `app/<route>/page.tsx`, add to `NavBar.tsx` `items[]`, add `nav.<key>` to `lib/i18n.ts`, add to `app/sitemap.ts` |
| Open Graph card design | `app/opengraph-image.tsx` |
| Favicon | `app/icon.tsx` and `app/apple-icon.tsx` |
| Site URL / domain | `.env.local` → `NEXT_PUBLIC_SITE_URL` |

## Data schemas

### `lib/projects.ts`

```ts
type Project = {
  slug: string;                                    // unique, kebab-case
  year: string;                                    // "2025"
  category: "uni" | "work" | "personal" | "research";
  featured?: boolean;
  titles: { en: string; tr: string; de: string };
  summaries: { en: string; tr: string; de: string };
  descriptions?: { en: string; tr: string; de: string };
  tech: string[];                                  // ["Python", "SQL", ...]
  tags?: string[];
  links?: { github?: string; demo?: string; paper?: string };
  cover?: string;                                  // "/projects/foo.jpg"; if absent → auto gradient
  role?: { en: string; tr: string; de: string };
};
```

### `lib/travel.ts`

```ts
type Country = {
  slug: string;                                    // "germany"
  iso: string;                                     // ISO 3166-1 NUMERIC (e.g. "276" for DE)
  flag: string;                                    // emoji "🇩🇪"
  year: string;                                    // "2025–present"
  home?: boolean;                                  // true for Turkey
  current?: boolean;                               // true for Germany
  names: { en: string; tr: string; de: string };
  cities: string[];
  notes: { en: string; tr: string; de: string };
  photos: string[];                                // paths under /public/travel/<slug>/
};
```

ISO numeric codes are critical — `react-simple-maps` matches countries by these. Look them up at https://en.wikipedia.org/wiki/ISO_3166-1_numeric

### `lib/i18n.ts`

The `Dict` type is the source of truth. If you add a key to `Dict`, all three dictionaries (`en`, `tr`, `de`) MUST have it or TypeScript breaks the build. The hook is `useT()` and returns `{ t, locale, setLocale }`.

## Existing pages — what's on each

| Route | What it shows |
|---|---|
| `/` | Hero (status chip + title + 3 CTAs), metrics row, "Tools I work with", "Selected experience" cards (Vodafone, KPMG, McKinsey), "Off the court" tennis section, footer |
| `/journey` | Filterable timeline (All / Education / Work / Achievement) — items defined in `i18n.ts` `journey.items` |
| `/projects` | Filterable grid (All / Uni / Work / Personal / Research). Cards have auto-generated gradient covers if `cover` is missing |
| `/travel` | Hero + interactive world map (visited countries highlighted) + country list + selected country detail (flag, name, year, cities, notes, photo grid) |
| `/think` | Toolbox skill groups + 5-step problem-solving framework |
| `/contact` | Hero + 5 social cards (Email, LinkedIn, GitHub, Instagram, Facebook) + working form (Resend → fallback to mailto) |

Plus utility pages: `/cv/CV_Uzun.pdf` (raw PDF), custom 404, `/sitemap.xml`, `/robots.txt`, `/api/contact` POST endpoint.

## Important non-obvious behaviour

1. **NavBar collapses below `lg` breakpoint (1024px)** into a hamburger menu. Don't add new top-level routes without testing both desktop and the mobile sheet (`components/NavBar.tsx`).

2. **`app/page.tsx` re-keys Framer Motion blocks on locale change** so animations replay when the user switches language. Look for `key={\`hero-${locale}\`}` patterns — preserve this when editing.

3. **Contact form has a graceful fallback**: if `RESEND_API_KEY` is missing, the API route returns 503 with `error: "resend_not_configured"`, and the client-side form falls through to a `mailto:` link. Don't break this fallback.

4. **OG image runtime is `edge`**. Don't import Node-only modules into `app/opengraph-image.tsx`.

5. **The `CommandMenu` listens globally for ⌘K / Ctrl+K**. The NavBar has a "Search ⌘K" button on desktop that fires a synthetic keyboard event to open it — keep them in sync if you change the keybinding.

## Environment variables

Defined in `.env.example`. None are required for the site to render — only the contact form needs `RESEND_API_KEY` to actually send mail.

```
NEXT_PUBLIC_SITE_URL    Public URL (used in sitemap, OG, canonical)
RESEND_API_KEY          Optional — without it, form falls back to mailto
CONTACT_TO_EMAIL        Where messages land (default: ulasch_uzun@hotmail.com)
CONTACT_FROM_EMAIL      Sender ("Recep <hi@example.com>") — must be a Resend-verified sender
```

## Deployment

Hosted on Vercel via GitHub. Pushing to `main` triggers an auto-deploy. Environment variables live in Vercel project settings, not in the repo.

For preview deploys: `npx vercel`. For production: `npx vercel --prod`.

## When in doubt

- Match the existing patterns in adjacent files. Consistency > cleverness.
- Don't add a new dependency to solve a 10-line problem.
- Don't introduce a new design token or color. Use what's in `tailwind.config.ts` and `globals.css`.
- Run `npx tsc --noEmit` before declaring something done — catches missing translations and type errors.

# recep.uzun — Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Personal portfolio for **Recep Uzun** — AI Master's student at THD Deggendorf, Germany. Built to stand out in job applications: clean design, full interactivity, trilingual, and dark-mode ready.

[![Live Site](https://img.shields.io/badge/Live_Site-portfolio--recepuzun.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-lemon-nu-ba4w5tqwof.vercel.app/)

[![Preview](https://raw.githubusercontent.com/salamon30/portfolio/main/public/preview.png)](https://portfolio-lemon-nu-ba4w5tqwof.vercel.app/)

---

## Features

| Feature | Details |
|---|---|
| **Trilingual** | EN / TR / DE — language preference persisted to localStorage, auto-detected from browser |
| **Light & dark mode** | System preference + manual toggle, no flash of unstyled content |
| **⌘K Command palette** | Instant navigation across all pages and actions (Mac: ⌘K, Win/Linux: Ctrl+K) |
| **Interactive world map** | react-simple-maps — 12 visited countries highlighted with hover tooltips and photo gallery |
| **Filterable project gallery** | Category filters (University / Internship / Personal / Research) with animated transitions |
| **Filterable timeline** | Journey page with Work / Education / Achievement filters |
| **Contact form** | Resend API backend with mailto fallback — works without configuration |
| **Page transitions** | Framer Motion fade + slide between routes |
| **SEO** | Sitemap, robots.txt, canonical URLs, Open Graph tags, Twitter card |
| **Auto OG images** | `app/opengraph-image.tsx` generates social share cards |
| **Vercel Analytics** | Page-view tracking, GDPR-compliant, no cookies |
| **Accessibility** | `prefers-reduced-motion`, full keyboard navigation, semantic HTML |

---

## Pages

| Route | Content |
|---|---|
| `/` | Hero · metrics · tech stack · selected work experience · tennis · footer |
| `/journey` | Filterable timeline — all roles, education and achievements |
| `/projects` | Project gallery with category filters and cover images |
| `/travel` | Interactive world map + 12-country photo gallery with notes |
| `/think` | 5-step problem-solving method + skill toolkit |
| `/contact` | Direct channels + contact form (Resend) |

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, CSS custom properties (light/dark tokens) |
| Animation | Framer Motion 11 |
| Map | react-simple-maps, d3-geo |
| Email | Resend |
| Analytics | Vercel Analytics |
| Fonts | Inter (rsms.me CDN) |

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx            # Root layout — providers, NavBar, ThemeScript
│   ├── page.tsx              # Home — hero, stack, selected work, tennis, footer
│   ├── globals.css           # Tailwind + light/dark CSS tokens
│   ├── journey/page.tsx      # Filterable timeline
│   ├── projects/page.tsx     # Project gallery with animated filters
│   ├── travel/page.tsx       # World map + country gallery
│   ├── think/page.tsx        # Approach + toolkit
│   └── contact/page.tsx      # Contact form + social links
├── components/
│   ├── NavBar.tsx            # Sticky header — language, theme, ⌘K
│   ├── CommandMenu.tsx       # ⌘K command palette
│   ├── Timeline.tsx          # Journey timeline with filters
│   ├── TravelGallery.tsx     # Country selector + photo lightbox
│   └── WorldMap.tsx          # react-simple-maps interactive map
├── lib/
│   ├── i18n.ts               # All UI text — EN / TR / DE + LanguageProvider
│   ├── projects.ts           # Project catalogue (add new projects here)
│   ├── travel.ts             # Country data, cities, notes, photo paths
│   └── socials.ts            # Central contact links
└── public/
    ├── projects/             # Project cover images
    ├── travel/               # Travel photos by country
    ├── tennis/               # Tennis photos
    ├── me/                   # Profile photo
    └── cv/CV_Uzun.pdf        # Downloadable CV
```

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/salamon30/portfolio.git
cd portfolio

# 2. Install
npm install

# 3. Environment (optional — contact form)
cp .env.example .env.local

# 4. Run
npm run dev
# → http://localhost:3000
```

### Environment Variables (optional)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Contact form email delivery (resend.com — free tier: 3,000/mo) |
| `CONTACT_TO_EMAIL` | Inbox address for form submissions |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in sitemap and OG tags |

The site runs fully without these — the contact form falls back to `mailto:`.

---

## Content Editing

### Add a project → `lib/projects.ts`

```ts
{
  slug: "my-project",
  year: "2026",
  category: "uni",           // "uni" | "work" | "personal" | "research"
  featured: true,            // adds ★ Featured badge
  titles:   { en: "…", tr: "…", de: "…" },
  summaries:{ en: "…", tr: "…", de: "…" },
  tech: ["Python", "PyTorch"],
  links: { github: "https://github.com/…" },
  cover: "/projects/my-project.png",  // optional — gradient fallback if omitted
}
```

### Add UI text → `lib/i18n.ts`
All strings for all three languages live in one file. `en` at the top is the source of truth.

### Add travel photos
Drop images into `public/travel/<country>/`, then reference them in `lib/travel.ts`.

---

## Deploy to Vercel

```bash
# Push to GitHub, then:
# vercel.com/new → import repo → auto-detects Next.js → Deploy
```

Add the optional environment variables in Vercel Project → Settings → Environment Variables. Redeploy once to activate the contact form.

---

## Author

**Recep Uzun** — AI Master's Student @ Deggendorf Institute of Technology

[![LinkedIn](https://img.shields.io/badge/LinkedIn-recep--ulas--uzun-0077b5?logo=linkedin)](https://www.linkedin.com/in/recep-ulas-uzun/)
[![GitHub](https://img.shields.io/badge/GitHub-salamon30-181717?logo=github)](https://github.com/salamon30)

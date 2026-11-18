# Astrix Mediyeah

A premium, fully static digital agency portfolio built with Next.js 15, React 19
and Tailwind CSS v4.

## Overview

- **Public site** — home, about, services, service detail, projects, project case
  studies, process, testimonials and contact.
- **Content** — services, projects, testimonials, site copy and contact details
  are plain TypeScript files in `data/`.
- **Media** — all images live in `public/` and are served locally through
  `next/image`. No database, CMS, admin panel or external media host is required.
- **Contact** — the form opens the visitor's email client via `mailto:` and
  offers a direct WhatsApp link. No submissions are stored.
- **Design** — dark, editorial, motion-led design with Framer Motion and a shared
  UI primitive set.

## Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19 |
| Language   | TypeScript                         |
| Styling    | Tailwind CSS v4                    |
| Animation  | Framer Motion                      |
| Icons      | Lucide React                       |
| Deployment | Vercel or any static/Node host     |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable               | Required | Purpose                                |
| ---------------------- | -------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Canonical public URL, no trailing slash |

For production, set it to `https://your-domain.com`.

### 3. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the development server (Turbopack) |
| `npm run build`     | Build the production site                |
| `npm start`         | Run the production build                 |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Run TypeScript without emitting          |

## Editing content

All content is local and typed.

| File                     | What it controls                                             |
| ------------------------ | ------------------------------------------------------------ |
| `data/site.ts`           | Brand, SEO, hero, stats, about copy and process intro         |
| `data/projects.ts`       | Projects, galleries, outcomes, categories and related work   |
| `data/services.ts`       | Services, features, pricing copy and cover images            |
| `data/testimonials.ts`   | Client quotes, roles and avatars                             |
| `data/contact.ts`        | Email, phone, WhatsApp, address, hours and social links      |
| `lib/constants.ts`       | Navigation, budget options and process steps                 |
| `types/content.ts`       | Shared content types                                         |

## Media

Replace files in `public/images/` while keeping the same filenames, or update the
paths in `data/`. Recommended formats are WebP or AVIF at sensible dimensions.

```text
public/
  icons/logo-mark.svg
  images/
    logo.png                 512 × 512
    hero-banner.webp
    about.webp
    projects/
      <project-slug>.webp
      <project-slug>-gallery-1.webp
  videos/
    <project-slug>.mp4
```

To add project video, place an MP4 in `public/videos/` and set `videoUrl` on the
project in `data/projects.ts`. Set `instagramReelUrl` to embed a public reel.

## Project structure

```text
app/
  (site)/              Public pages and dynamic project/service routes
  layout.tsx           Root metadata, fonts and shell
  sitemap.ts           Static sitemap generated from data files
  robots.ts            Crawl rules
components/
  layout/              Navbar, footer, scroll progress
  media/               Video and Instagram embed components
  sections/            Public page sections
  ui/                  Shared primitives
data/                  Typed site content
lib/                   Utility helpers and navigation constants
public/                All local images and video
types/                 Content types
```

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the full Vercel deployment
guide.

## Verification

Before shipping:

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass.

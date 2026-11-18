# Astrix Mediyeah

A premium digital agency website and content management dashboard built as a
single Next.js application.

## Overview

- **Public site** — home, about, services, service detail, projects, project
  case studies, process, testimonials and contact.
- **Admin dashboard** — authentication, overview metrics, services, projects,
  testimonials, media library, enquiries pipeline, content editor and global
  settings.
- **Database** — PostgreSQL on Neon, accessed with Prisma.
- **Design** — dark, editorial, motion-led design with Tailwind CSS v4,
  Framer Motion and a shared UI primitive set.

## Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19      |
| Language   | TypeScript                              |
| Styling    | Tailwind CSS v4                         |
| Animation  | Framer Motion                           |
| Database   | Neon PostgreSQL + Prisma 6              |
| Auth       | Signed JWT session cookie (`jose`)      |
| Validation | Zod                                     |
| Icons      | Lucide React                            |
| Deployment | Vercel (recommended)                    |

## Getting started

### 1. Install dependencies

```bash
npm install
```

`postinstall` runs `prisma generate` automatically.

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values.

```bash
cp .env.example .env
```

| Variable              | Required | Purpose                                         |
| --------------------- | -------- | ----------------------------------------------- |
| `DATABASE_URL`        | Yes      | Neon pooled Postgres connection string          |
| `AUTH_SECRET`         | Yes      | 32+ byte secret used to sign session cookies    |
| `ADMIN_EMAIL`         | Seed     | First admin email, used only by `prisma/seed.ts` |
| `ADMIN_PASSWORD`      | Seed     | First admin password, used only by the seed      |
| `ADMIN_NAME`          | Seed     | First admin display name                         |
| `NEXT_PUBLIC_SITE_URL`| Yes      | Canonical public URL, no trailing slash          |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Use the **pooled** Neon connection string (host contains `-pooler`) for
serverless deployments.

### 3. Prepare the database

```bash
npm run db:deploy
npm run db:seed
```

The seed is idempotent and requires `ADMIN_EMAIL` and an `ADMIN_PASSWORD` of at
least 8 characters. It creates the first admin, six services, six projects, five
testimonials, site settings, media records and sample enquiries.

### 4. Run locally

```bash
npm run dev
```

- Public site: <http://localhost:3000>
- Admin login: <http://localhost:3000/admin/login>

Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. There is no
in-app password editor; to replace the seeded password, update the admin's
bcrypt hash in the database as described in `docs/DEPLOYMENT.md`.

## Scripts

| Script             | Description                            |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Start the development server (Turbopack) |
| `npm run build`    | Generate Prisma client and build       |
| `npm start`        | Run the production build               |
| `npm run lint`     | Run ESLint                             |
| `npm run typecheck`| Run TypeScript without emitting        |
| `npm run db:deploy`| Apply committed migrations             |
| `npm run db:migrate`| Create a migration during development |
| `npm run db:push`  | Push schema directly (prototyping only) |
| `npm run db:seed`  | Seed the database                      |
| `npm run db:studio`| Open Prisma Studio                     |

## Content management

| Area        | What you can manage                                                   |
| ----------- | --------------------------------------------------------------------- |
| Services    | Copy, icon, features, price, cover image, order, featured/published   |
| Projects    | Client, category, case study, gallery, outcomes, live URL, service    |
| Testimonials| Client details, quote, rating, avatar, linked project                 |
| Media       | Library of reusable image/document/video URLs                         |
| Enquiries   | Contact submissions, status pipeline and internal notes               |
| Content     | Hero, about, stats, process and SEO copy                              |
| Settings    | Brand, contact details and social links                               |

Media uploads are intentionally not bundled with a storage provider. Register
hosted URLs in the Media library, or add S3 / Vercel Blob credentials and an
upload route for binary uploads.

## Security

- Admin routes are protected by middleware and re-verified in every admin API
  route.
- Passwords are hashed with bcrypt.
- Sessions are signed HS256 JWTs in `httpOnly`, `sameSite=lax` cookies, `secure`
  in production, with a 7-day expiry.
- Login and contact submissions are rate-limited in memory.
- All mutations validate input with Zod before touching the database.
- Admin pages and API routes are excluded from indexing.

For multi-instance deployments, replace the in-memory rate limiter in
`lib/rate-limit.ts` with a shared store such as Upstash Redis.

## Project structure

```text
app/
  (site)/              Public pages
  admin/               Login and dashboard
  api/                 Route handlers
components/
  admin/               Dashboard UI and forms
  layout/              Navbar, footer, scroll progress
  sections/            Public page sections
  ui/                  Shared primitives
lib/                   Prisma, auth, validation, settings, queries
prisma/                Schema and seed
types/                 Shared types
middleware.ts          Admin route protection
```

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the complete Vercel and
GitHub deployment guide.

## Verification

Before shipping:

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass.

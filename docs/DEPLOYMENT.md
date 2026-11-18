# Deployment guide

This is a static Next.js site. It deploys to Vercel with no database, auth
service or media host. The same steps work on any Node.js host that supports
Next.js 15.

## 1. Prepare the repository

```bash
git add .
git commit -m "Convert Astrix Mediyeah to a static portfolio"
git push origin main
```

Confirm `.env` is not committed:

```bash
git status
```

`.gitignore` ignores `.env*` but allows `.env.example`.

## 2. Import into Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Add the environment variable below for Production, Preview and Development.

### Required environment variables

| Name                   | Value                                |
| ---------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (no slash) |

No database, auth, SMTP or storage variables are needed.

## 3. Deploy

Deploy from the Vercel dashboard. The build prerenders every static page,
including all project and service detail routes from `data/`.

Add your custom domain in **Vercel → Settings → Domains**, then update
`NEXT_PUBLIC_SITE_URL` to the final canonical URL and redeploy.

## 4. Post-deploy checklist

- [ ] Home page and all navigation links load.
- [ ] Every project and service detail page loads directly by URL.
- [ ] Images load from `/images/` and no external image requests are required.
- [ ] Contact buttons open the correct email client and WhatsApp chat.
- [ ] `robots.txt` allows public pages and points to the sitemap.
- [ ] `sitemap.xml` contains every page and detail route.
- [ ] Mobile navigation, gallery, video and reel sections work.
- [ ] Run Lighthouse on mobile and desktop.
- [ ] Verify the canonical URL uses the production domain.

## Updating content

1. Edit the relevant file in `data/`.
2. Add or replace media in `public/images/` or `public/videos/`.
3. Run the verification commands below.
4. Commit and push; Vercel redeploys automatically.

### Adding a project

Add an entry to the `PROJECTS` array in `data/projects.ts` with a unique `slug`.
The detail page, sitemap and related-work links are generated automatically.

### Adding a service

Add an entry to the `SERVICES` array in `data/services.ts` with a unique `slug`.
Link projects to it with `service: { title, slug }`.

### Adding video

Place an MP4 in `public/videos/` and set `videoUrl` on the project. Use a WebP
poster via `videoThumbnail`. For a public Instagram reel, set
`instagramReelUrl`.

## Verification

Before deploying:

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass.

## Troubleshooting

| Symptom                       | Likely fix                                                    |
| ----------------------------- | ------------------------------------------------------------- |
| Images 404                    | Confirm the filename and path match `data/` and `public/`     |
| Wrong canonical or sitemap URL| Set `NEXT_PUBLIC_SITE_URL` without a trailing slash, redeploy |
| Detail page 404               | Confirm the item exists in `data/` with the expected `slug`   |
| Video does not play           | Use an H.264 MP4 in `public/videos/` and check `videoUrl`      |
| Build fails fetching fonts    | Retry the build; Google Fonts must be reachable at build time  |

# Deployment guide

This app deploys cleanly to Vercel with Neon PostgreSQL. The same steps work for
any Node.js host that supports Next.js 15.

## 1. Prepare the repository

```bash
git init
git add .
git commit -m "Initial Astrix Mediyeah build"
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repo>.git
git push -u origin main
```

Confirm `.env` is not committed:

```bash
git status
```

`.gitignore` ignores `.env*` but allows `.env.example`.

## 2. Create the Neon database

1. Create a project in the Neon console.
2. Copy the **pooled** connection string. The host should contain `-pooler`.
3. Keep the direct (non-pooled) string available for schema pushes and seeding
   if your tooling requires it.

Recommended production settings:

- Enable point-in-time restore / history retention.
- Restrict access with an IP allow list if your host has stable egress IPs.
- Store the connection string only in the hosting provider's environment
  settings.

## 3. Apply migrations and seed

Run these once against the production database from a trusted machine:

```bash
DATABASE_URL="<production-pooled-url>" npx prisma migrate deploy
DATABASE_URL="<production-pooled-url>" ADMIN_EMAIL="admin@yourdomain.com" ADMIN_PASSWORD="<strong-password>" ADMIN_NAME="Astrix Admin" npm run db:seed
```

On Windows PowerShell:

```powershell
$env:DATABASE_URL="<production-pooled-url>"
$env:ADMIN_EMAIL="admin@yourdomain.com"
$env:ADMIN_PASSWORD="<strong-password>"
$env:ADMIN_NAME="Astrix Admin"
npx prisma migrate deploy
npm run db:seed
```

The seed is idempotent and requires `ADMIN_EMAIL` and an `ADMIN_PASSWORD` of at
least 8 characters. Remove `ADMIN_PASSWORD` from local shell history after use,
and delete it from the host environment once seeded.

## 4. Import into Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js**. Build command: `npm run build`.
4. Add the environment variables below for Production, Preview and Development.

### Required environment variables

| Name                   | Value                                      |
| ---------------------- | ------------------------------------------ |
| `DATABASE_URL`         | Neon pooled connection string              |
| `AUTH_SECRET`          | 48+ random bytes, hex or base64            |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (no slash)       |

`ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_NAME` are only needed when running the
seed. The running app does not read them.

### Optional

| Name                   | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `VERCEL_URL`           | Provided automatically by Vercel          |

## 5. Deploy

Deploy from the Vercel dashboard. `postinstall` generates the Prisma client and
the build command regenerates it before compiling.

Add your custom domain in **Vercel → Settings → Domains**, then update
`NEXT_PUBLIC_SITE_URL` to the final canonical URL and redeploy.

## 6. Post-deploy checklist

- [ ] `/admin/login` loads and accepts the seeded credentials.
- [ ] Create, edit and delete a service.
- [ ] Create, edit and delete a project.
- [ ] Submit the public contact form and confirm the enquiry appears in admin.
- [ ] Update a content field and confirm it appears on the public site.
- [ ] Confirm `robots.txt` disallows `/admin` and `/api`.
- [ ] Confirm `sitemap.xml` returns public URLs.
- [ ] Check mobile navigation and the admin mobile drawer.
- [ ] Change the seeded admin password.
- [ ] Confirm database backups / PITR are enabled.

## Operations

### Schema changes

```bash
npx prisma migrate dev --name describe_change
```

For production, prefer committed migrations:

```bash
npx prisma migrate deploy
```

Then redeploy so the generated client matches the schema.

### Adding an admin

There is no public admin sign-up. Create users with a one-off script or Prisma
Studio using a bcrypt hash:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('new-password', 12).then(console.log)"
```

Insert the resulting hash into the `Admin.passwordHash` column. Do not store
plain-text passwords.

### Logs

- Vercel → Deployment → Functions logs for runtime errors.
- Neon console for database metrics and slow queries.

### Rate limiting

`lib/rate-limit.ts` is in-memory and resets when an instance restarts. For
production scale, back it with Upstash Redis or a similar shared store so
limits apply across all instances.

## Troubleshooting

| Symptom                              | Likely fix                                                        |
| ------------------------------------ | ----------------------------------------------------------------- |
| `AUTH_SECRET is missing or too short`| Set a 32+ byte `AUTH_SECRET` in the host environment              |
| Prisma cannot reach the database     | Use the `-pooler` host and append `?sslmode=require`              |
| Login succeeds but dashboard redirects | Confirm cookies are enabled and the site is served over HTTPS  |
| Images do not render                 | Use absolute `https://` URLs; add new hosts to `next.config.ts`   |
| Build fails after a schema change    | Run `npx prisma generate` and redeploy                            |

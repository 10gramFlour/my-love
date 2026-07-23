# my-love — private deployment

The site is protected by a shared, server-verified password. It has no accounts or database. `/` and `/api/media/*` require an HttpOnly, HS256 signed session cookie; `/login` is public.

## Setup
1. Copy `.env.example` values into Vercel/environment (never commit `.env.local`).
2. Run `npm run auth:hash-password` and store its output in `SITE_PASSWORD_HASH`. Production should use an Argon2id hash generated with `@node-rs/argon2`; the script's scrypt format is a local fallback while the restricted package registry is unavailable.
3. Run `npm run auth:generate-secret` and store it as `SESSION_SECRET`.
4. Create a **private** Supabase Storage bucket named `love-private`; upload `images/IMG_5265.png`, `images/IMG_5266.png`, `images/IMG_5269.png`, `images/IMG_5270.jpeg`, `images/IMG_5271.jpeg`, `images/IMG_5272.png`, and `music/our-song.mp3`.

Increment `AUTH_COOKIE_VERSION` to invalidate all sessions. Rotate `SESSION_SECRET` to do the same. Bucket-list completion stays in browser localStorage.

After confirming private storage in production, remove the corresponding files from `public/images` and `public/music`. Keep this repository private: old Git commits may still contain media. Back up first; deliberate history cleanup with `git filter-repo` requires a force push.

Run `npm run lint`, `npm run test`, `npx tsc --noEmit`, and `npm run build` before deployment.

# Password-protection checklist

- [ ] Keep the GitHub repository private.
- [ ] Create a private Supabase bucket `love-private` and upload the listed `images/...` and `music/our-song.mp3` paths.
- [ ] Configure every variable from `.env.example` in Vercel.
- [ ] Generate a strong password hash and a 32-byte session secret using the npm scripts.
- [ ] Deploy, then verify `/` redirects to `/login` and media without a cookie returns 401.
- [ ] Remove legacy public media only after the authenticated gallery and music work.
- [ ] On password change or suspected disclosure, change the hash and increment `AUTH_COOKIE_VERSION`.

> **Status:** Astro + Tailwind site scaffolded (home, blog list, post page, My Story, contact,
> thank-you, 404, RSS, sitemap). Sanity Studio schema built in `studio/`. Palette and tagline pulled
> from the logo; logo in header, Faith Emblem in home hero, DPL monogram favicon, logo-based social share image.
> Sanity project `lm4byk8d` connected; test post verified locally. GitHub repo + Netlify preview set up.
> Author is anonymous. Copy review tags (`?review`). Not yet: publish→rebuild hook, hosted Studio, domain.

# Daily Present Living — Site Plan

A Christian blog where the author shares her story and posts regularly. She must be able to write
and publish **without anyone pushing code**.

**Domain:** dailypresentliving.com
**Tagline (from logo):** "Sharing encouragement, empowerment, and expectance through faith in God"
**Palette (from logo):** wine-mauve `#8c4560`, black `#1b1a1c`, sunshine peach-gold `#f2a548`
**Fonts:** Playfair Display (headings, echoes the logo's high-contrast serif), Lora (body — reads
well for long posts).

## Decisions

- **CMS: Sanity.** Hosted Studio at `dailypresentliving.sanity.studio`; she logs in with Google or
  email. Chosen over TinaCMS/Decap for the friendliest writing + photo experience. Free plan covers it.
  Content lives in Sanity's cloud (not the repo) — use `sanity dataset export` for backups.
- **Static, rebuild-on-publish.** Astro fetches posts at build time. A Sanity webhook calls a Netlify
  build hook on publish, so the live site updates ~1 minute after she hits Publish. No server, near-zero JS.
- **Future-dated posts** stay hidden until their date, but only appear on the next rebuild after
  that date. If she starts scheduling posts, add a daily scheduled rebuild.
- **Contact form:** Netlify Forms with a honeypot; email notification set up in the Netlify dashboard
  (no Zapier needed for a low-volume blog). Topic dropdown includes "Prayer request".
- **"My Story"** is a single Sanity document (About Me), so she can edit it herself.
- **Anonymous author.** No name or photo anywhere on the site (name/photo optional in the Studio; posts credited to "Daily Present Living" in JSON-LD). If she later wants to be named, she fills in About Me — no code change needed.

## Site structure

- **Home** — hero with tagline, latest post featured, 6 more recent posts, contact CTA.
- **Blog** (`/blog`) — all posts, newest first.
- **Post** (`/blog/[slug]`) — cover photo, optional featured scripture, rich text body (headings,
  quotes, photos, scripture callouts), previous/next links, `BlogPosting` JSON-LD.
- **My Story** (`/about`) — photo + bio from Sanity.
- **Contact** → **Thank-you**.
- `/rss.xml`, sitemap, `WebSite` JSON-LD sitewide.

## Getting it live

1. ~~Add logo files~~ — done. Originals in `assets/logo/`. In use: `Daily Present Living Logo (1).png` → header (`src/assets/logo/logo-horizontal.png`) + `public/og-image.png`; `Faith Emblem` → home hero (`src/assets/hero-emblem.png`); `Gilded Celestial DPL Emblem` → favicons (`public/favicon-*.png`, `apple-touch-icon.png`). Older `Logo.png` / `Watercolor Emblem` are superseded.
2. Create the Sanity project: `cd studio && npx sanity login && npx sanity init --env` (or create at
   sanity.io/manage), dataset `production`, **public** read. Put the project ID in `studio/.env` and `.env`.
3. `cd studio && npm run deploy` → hosts the Studio at dailypresentliving.sanity.studio.
4. Sanity → API → CORS origins: add `https://dailypresentliving.sanity.studio` (deploy usually adds it).
5. Invite the author to the Sanity project (Members → Invite, role Editor).
6. Push the repo to GitHub (`bradcuthrell-source/daily-present-living`).
7. Netlify: import repo; set env vars `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`.
8. Netlify → Build hooks → create "Sanity publish"; Sanity → API → Webhooks → POST to that URL on
   create/update/delete of `post` and `author`, filter `!(_id in path("drafts.**"))`.
9. Netlify Forms: enable form detection, add email notification for the `contact` form.
10. Point dailypresentliving.com DNS at Netlify (HTTPS automatic).
11. Google Search Console → verify, submit `sitemap-index.xml`.

## Later / ideas

- Newsletter signup (e.g. Buttondown or Mailchimp embed) so readers get new posts by email.
- Category pages (`/blog/category/[slug]`) once there are enough posts.
- Comments (probably not — moderation burden; the contact form covers it for now).

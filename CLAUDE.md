## Project

Christian blog at dailypresentliving.com. Astro static site (repo root) + Sanity Studio (`studio/`).
Posts and the "My Story" page are written in Sanity by the author, not in code. See `PLAN.md`.

- Site reads Sanity at **build time** only (`src/lib/sanity.ts`). Publishing in the Studio triggers a
  Netlify build hook to rebuild. Without `PUBLIC_SANITY_PROJECT_ID` the site still builds, with no posts.
- Site-wide info (name, tagline, nav) lives in `src/data/site.ts`. Brand colors are in `src/styles/global.css`.
- Studio schema: `studio/schemaTypes/`. Any field change there needs the matching GROQ query in
  `src/lib/sanity.ts` and rendering updated, then `cd studio && npm run deploy`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Studio locally: `cd studio && npm run dev` (needs `studio/.env`, see `studio/.env.example`).

## Documentation

Full documentation: https://docs.astro.build · Sanity: https://www.sanity.io/docs

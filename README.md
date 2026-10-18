# Daily Present Living

Christian blog at [dailypresentliving.com](https://dailypresentliving.com). Astro + Tailwind static
site, content from Sanity, hosted on Netlify. See `PLAN.md` for decisions and launch steps.

| Command                        | Action                                    |
| :----------------------------- | :---------------------------------------- |
| `npm install`                  | Install site dependencies                 |
| `npm run dev`                  | Site dev server at `localhost:4321`       |
| `npm run build`                | Build the site to `./dist/`               |
| `cd studio && npm install`     | Install Studio dependencies               |
| `cd studio && npm run dev`     | Studio locally at `localhost:3333`        |
| `cd studio && npm run deploy`  | Deploy Studio to dailypresentliving.sanity.studio |

Copy `.env.example` → `.env` and `studio/.env.example` → `studio/.env` and fill in the Sanity project ID.

# Contributing

This repo is **only the main page, the theme and the setup** of sargam.design. It is not
where projects live.

## The one rule

**Every project gets its own repo and its own subdomain.** A new project is never a folder in
this repo.

| Thing | Where it goes |
| --- | --- |
| The main page, theme, shared setup, the list of projects | This repo (`sargam-design`) |
| Any project (health reports, travel planner, a calculator, ...) | Its **own new repo**, deployed at its own address such as `health.sargam.design` |

Private projects (anything with logins, private documents or health data) get a **private**
repo. Whether a project's repo is public is always the owner's decision.

The full step-by-step is in [docs/NEW_PROJECT.md](docs/NEW_PROJECT.md). The map of how
everything fits together is in [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md).

## How a change goes live

Every project repo is connected to Vercel through GitHub:

- Push to **any branch**: you get a temporary preview link. Nothing live changes.
- Push or merge to **`main`**: the live site updates by itself in a minute or two.

So `main` is the live site. Do not deploy by hand.

## Adding a project to the main page

Once a project works at its own address, add one entry to `publishedProjects` in
`src/lib/projects.ts` (the README explains each field), on a branch. Keep the text generic.
Merge when the preview looks right and the checks pass.

## Working safely

- **Risky change? Use a branch.** Do the work on a branch, check the preview, and merge into
  `main` only when it works. To undo a bad release, promote the previous deployment in the
  Vercel dashboard.
- Never commit secrets (`.env` files, tokens, passwords) or real health or
  family data. This repo is **public**. The `.gitignore` already blocks PDFs,
  CSVs, report-style JSON and `.env` files. Do not work around it.
- Do not change DNS or domain settings without checking first. A wrong record
  can take a site offline.

## Checks before merging

```sh
npm run lint
npm run typecheck
npm run build
```

All three should finish without errors. `npm test` runs the browser tests and
needs the extra install described in the README.

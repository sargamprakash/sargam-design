# Contributing

Where does a new project go? One rule:

| The project is... | Put it... |
| --- | --- |
| A small page or tool | In a **new folder** inside this repo (`sargam-design`) |
| Needing a backend, private data, or likely to grow big | In a **new repo**, with its own **subdomain** |

Examples:

- An About page, a simple calculator, a travel checklist: a new folder here.
- Health reports (a login, private family records, a database): its own private
  repo at `health.sargam.design`. It is not in this repo and must never be.

If you are not sure, start with a folder. Moving a project out into its own
repo later is easy. Moving private data out of a public repo is not, because
Git remembers everything.

## Adding a small project as a folder

1. Make a branch (see "Working safely" below). Name it after the project,
   for example `add-calculator`.
2. Create a folder under `src/app/`, for example `src/app/calculator/`.
3. Put a `page.tsx` file in it. That file is the page. The folder name becomes
   the web address: `src/app/calculator/` shows at `sargam.design/calculator/`.
   (If you know plain websites: `page.tsx` plays the role of `index.html`.)
4. To show it on the homepage, add an entry in `src/lib/projects.ts`. The
   README explains each field.
5. Check it works (see "Checks"), then merge.

`src/app/about/` and `src/app/travel-planner/` already exist as placeholders
with a README only. They are not live until they get a `page.tsx`.

## Starting a bigger project as its own repo

1. Create a new GitHub repo (private if it will ever touch private data).
2. Create a new project at your host (Vercel) and connect the repo to it.
3. Add the subdomain (for example `health.sargam.design`) to that Vercel
   project. Vercel then shows the exact DNS record to add.
4. Add that record at your domain registrar (GoDaddy). Change nothing else
   there. Keep a copy of the old records first.
5. When the new address works, add it to `src/lib/projects.ts` here so it
   shows on the homepage.

## Working safely

- **Risky change? Use a branch.** Do the work on a branch, check it, and
  merge into `main` only when it works. `main` is what the world sees.
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

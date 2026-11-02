# <Project name>

<!--
Template for a new project's AGENTS.md. Copy it to the new repo's root, fill in every
<placeholder>, delete this comment and any section that does not apply, and add a CLAUDE.md
that contains only: @AGENTS.md
-->

## Start here

This is one project of **sargam.design**. Read `docs/ECOSYSTEM.md` first: it explains the
one-repo-per-project layout, how pushes go live, accounts, and the owner's working
agreement. The owner is not a coder; explain simply and ask before irreversible actions.

- **What it is:** <one plain sentence>
- **Repo:** `sargamprakash/<name>` (<private|public>)
- **Live at:** `https://<name>.sargam.design` (Vercel project `<name>`, scope `sargam8`)
- **Main page card:** `publishedProjects` in `sargamprakash/sargam-design`, `src/lib/projects.ts`
- **Stack:** <framework, runtime, database, storage>

## How changes go live

- Push to a branch: Vercel builds a **preview**. Push or merge to `main`: Vercel builds
  **production**, which is live. Do not run `vercel deploy --prod` by hand.
- Risky change: branch, run the checks, look at the preview, merge only when it works.
- <If private data: Merge to `main` only with the owner's approval. Secrets exist for
  Production only; previews have none, so they cannot reach real data.>

## Checks before merging

```sh
<npm run lint>
<npm run typecheck>
<npm run build>
<npm test>
```

## Rules

- Never commit secrets, `.env` files, or real private data (health records, documents,
  exports). `.gitignore` blocks `.env*`, PDFs, CSVs, spreadsheets and report-style JSON; do
  not weaken it or force-add around it.
- Ask the owner before: making anything public, deleting anything, changing domain, DNS or
  billing settings. Never change DNS yourself; tell the owner the exact record.
- <Project-specific hard rules>

## Where to look

| Need | File |
| --- | --- |
| Product brief | `PRODUCT.md` |
| Design system | `DESIGN.md` (inherits sargam.design: Manrope, monogram, cobalt, light/true-black) |
| Setup and commands | `README.md` |
| Ecosystem, deploys, accounts | `docs/ECOSYSTEM.md` |

# sargam.design (main page, theme, setup)

## Start here

This public repo is **only the main page, the theme and the setup** of sargam.design. Every
project (health reports, travel planner, ...) lives in **its own repo** with its own Vercel
project and subdomain. Do **not** add a project folder here. Read these before changing
anything:

- `docs/ECOSYSTEM.md`: how the whole site is organised, how pushes go live, accounts, the
  owner's working agreement.
- `docs/NEW_PROJECT.md`: the step-by-step playbook for adding a project (repo, Vercel, domain,
  main-page card).
- `docs/templates/project-AGENTS.md`: the `AGENTS.md` to copy into every new project repo.
- `PRODUCT.md`, `DESIGN.md`: product brief and design system that every project inherits.
- `README.md`: how to run, build and check the site. `CONTRIBUTING.md`: the short human rules.

Essentials:

- **Pushing or merging to `main` deploys to production at https://sargam.design
  automatically** (GitHub is connected to Vercel). Other branches get preview links.
  Never run `vercel deploy --prod` by hand. Risky change: use a branch, run
  `npm run lint && npm run typecheck && npm run build`, merge only when it works.
- This repo is **public**. Never commit secrets, `.env` files, tokens, or any real health or
  family data. `.gitignore` blocks `.env*`, PDFs, CSVs and report-style JSON; do not weaken it.
- The owner is not a coder. Explain simply. **Ask before** making anything public, deleting
  anything, or changing domain, DNS or billing settings. Never change DNS yourself; tell the
  owner the exact record to add at GoDaddy.
- A project appears on the main page only through `publishedProjects` in `src/lib/projects.ts`,
  and only after its own address works. Keep card text generic and free of private details.
- Vercel commands need `--scope sargam8`. Check `gh api user --jq .login` is `sargamprakash`
  before creating repos or pushing (see ECOSYSTEM.md for the exact commands).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

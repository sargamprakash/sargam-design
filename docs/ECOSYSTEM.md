# The sargam.design ecosystem

**Read this first.** It explains how all of sargam.design is organised and how an agent
should work on any part of it. The canonical copy lives in the public repo
`sargamprakash/sargam-design` (`docs/ECOSYSTEM.md`). Other project repos keep a verbatim copy
at `docs/ECOSYSTEM.md`; if copies differ, the `sargam-design` one wins.

## What this is

sargam.design is the owner's personal home for vibe-coded projects. The owner is **not a
coder**: explain things in plain words and ask before anything irreversible.

**One repo per project.** The main repo holds only the main page, the theme and the setup.
Every project (health reports, a future travel planner, ...) has its **own repo**, its **own
Vercel project** and its **own subdomain**. Nothing else lives in the main repo.

| Site | Repo | Visibility | Vercel project | Address |
| --- | --- | --- | --- | --- |
| Main page, theme, setup | `sargamprakash/sargam-design` | **public** | `sargam-design` | <https://sargam.design> (`www` redirects here) |
| Health reports (private family records) | `sargamprakash/health-reports` | **private** | `health-reports` | <https://health.sargam.design> |

Add a row here whenever a project is added (see [NEW_PROJECT.md](NEW_PROJECT.md)). The owner's
portfolio at sargamprakash.com is a different project on a different host and is not part of
this ecosystem; do not touch it from these repos.

The main page links to each project through one list, `publishedProjects` in
`src/lib/projects.ts` of the main repo. A project's repo never changes the main repo on its
own: the main page just links to the project's address.

## How a change goes live

GitHub is connected to Vercel for every project repo. **Nobody deploys by hand.**

```text
any branch  --push-->  Vercel builds a PREVIEW (temporary link, not live)
main        --push-->  Vercel builds PRODUCTION (live at the project's address)
```

- **Pushing or merging to `main` makes it live within a minute or two.** Treat `main` as the
  live site.
- Risky change? Work on a branch, check the preview, run the repo's checks, merge only when it
  works. For any private-data project, merge to `main` only with the owner's approval.
- Do not run `vercel deploy --prod` from a laptop. It bypasses review and Git history.
- To undo a bad release: Vercel dashboard, Deployments, pick the last good one, Promote (or
  `vercel rollback <good-deployment-url> --scope sargam8`). Then fix forward on a branch.
- Check a preview with `vercel inspect <preview-url>` and, from inside the project folder,
  `vercel curl / --deployment <preview-url>` (previews can be access-protected, so a plain
  `curl` may return 401).
- Environment variables and secrets live in Vercel's settings, never in GitHub. Private
  projects set secrets for **Production only**, so branch previews can never reach real data.

## Accounts and tools (no secrets here)

- **GitHub:** the owner's personal account `sargamprakash`. The GitHub CLI on the owner's Mac
  may also be signed in to another account through the `GH_TOKEN` environment variable. Before
  creating a repo or pushing, check `gh api user --jq .login` prints `sargamprakash`. If not, run
  commands as `env -u GH_TOKEN -u GITHUB_TOKEN gh ...`. For a plain `git push`, use
  `GH_TOKEN=$(env -u GH_TOKEN -u GITHUB_TOKEN gh auth token --user sargamprakash) git -c credential.helper= -c credential.helper='!gh auth git-credential' push`.
  Commit as `Sargam Prakash <54455982+sargamprakash@users.noreply.github.com>`.
- **Vercel:** team scope `sargam8`. The owner's Vercel account has a GitHub login connection
  and the Vercel GitHub app is installed on **all** repos of `sargamprakash`, so a new repo can
  be connected from the CLI with no GitHub clicks. If the CLI says the token is invalid, run
  `vercel login` and ask the owner to approve the device code in the browser.
  Pass `--scope sargam8` to every Vercel command.
- **Domain:** `sargam.design` is registered at **GoDaddy**, which also hosts its DNS. Records
  point to Vercel. **An agent never changes DNS.** For a new subdomain, tell the owner the
  exact record Vercel gives (see [NEW_PROJECT.md](NEW_PROJECT.md)).
- **On the owner's Mac** each repo sits in `~/Vibecoding projects/<repo-name>/` and is linked
  to its Vercel project by an ignored `.vercel/project.json`.

## The owner's working agreement

1. **Plain language.** Short, simple, no jargon. Say what you did and what is still needed.
2. **Ask before** making anything public (a repo, a page, a link), deleting anything, or
   changing domain, DNS or billing settings. When in doubt, ask.
3. **Never commit secrets or real private data** to any repo: no `.env` files, tokens,
   passwords, health records, PDFs or exports. Public repos get an extra look before any push.
4. **Risky change = branch.** Merge only when it works.
5. **Finish with a short summary:** what was created or changed, and what the owner still has
   to do.
6. Write copy in the owner's plain voice. No poetic or "AI-sounding" phrasing.

## What every project repo must have

- Its own repo (private if it will ever touch private data) and its own Vercel project,
  connected to the repo, with its own subdomain.
- `AGENTS.md` (start from [templates/project-AGENTS.md](templates/project-AGENTS.md)) and a
  `CLAUDE.md` containing `@AGENTS.md`, plus a `README.md` a non-coder can follow.
- This file copied to `docs/ECOSYSTEM.md`.
- A `.gitignore` that blocks `.env*`, `*.pdf`, `*.csv`, `*.xls(x)` and report-style JSON.
- Its design inherits the main site: bundled Manrope, the supplied monogram, restrained
  cobalt, system light and true-black dark, mobile first. See `DESIGN.md` in the main repo.
- A card in `publishedProjects` in the main repo once it works.
- Passing lint, type check and build before anything merges to `main`.

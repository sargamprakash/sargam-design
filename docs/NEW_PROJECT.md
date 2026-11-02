# Adding a new project

Use this playbook for every new project. Follow the order. **O** marks a step only the owner
can do or must approve; **A** marks a step an agent does. Pass `--scope sargam8` to every
Vercel command and read [ECOSYSTEM.md](ECOSYSTEM.md) first.

Pick a short lowercase name, for example `travel-planner`. It becomes the repo name, the
Vercel project name and (usually) the subdomain `travel-planner.sargam.design`.

## 0. Confirm it is a separate project (A)

Every project gets its own repo. Do **not** add a project folder to `sargam-design`. That repo
holds only the main page, the theme and the setup.

## 1. Create the repo (A, O approves visibility)

- Private if the project will ever touch private data (health, documents, bookings, logins).
  Otherwise ask the owner whether it should be public. Never make a repo public without asking.
- Start the folder at `~/Vibecoding projects/<name>/`. Add before the first commit:
  `.gitignore` (block `.env*`, `*.pdf`, `*.csv`, `*.xls`, `*.xlsx`, report-style JSON),
  `AGENTS.md` from [templates/project-AGENTS.md](templates/project-AGENTS.md), `CLAUDE.md`
  containing `@AGENTS.md`, a plain-language `README.md`, and `docs/ECOSYSTEM.md` (copy of
  this repo's file).
- Check `gh api user --jq .login` prints `sargamprakash`, then:
  `gh repo create sargamprakash/<name> --private --source . --push`
  (use `--public` only after the owner says yes).

## 2. Create and connect the Vercel project (A)

```sh
vercel project add <name> --scope sargam8
vercel link --yes --project <name> --scope sargam8
vercel git connect https://github.com/sargamprakash/<name> --yes --scope sargam8
```

If `git connect` says the repo cannot be found, the Vercel GitHub app is not covering it. Ask
the owner to check github.com/apps/vercel (it should be installed on all repositories).
If the CLI token is invalid, run `vercel login` and have the owner approve the code.

Check the build settings (`vercel project inspect <name> --scope sargam8`): right framework,
Node 24, default build command.

## 3. Secrets, if any (A, owner supplies values)

Add variables with `vercel env add NAME production --scope sargam8`. For a project with
private data, add them for **Production only**, never Preview or Development, so a branch
preview cannot reach real data. Never paste secrets into chat, source or docs.

## 4. First deploy from a branch (A)

Push a branch. Vercel builds a preview. Confirm it built (`vercel ls <name> --scope sargam8`,
then `vercel inspect <preview-url> --scope sargam8`) and loads (from inside the project
folder: `vercel curl / --deployment <preview-url>`). Merge to `main` only when it
works. The merge deploys to production automatically.

## 5. Give it an address (A prepares, O changes DNS)

```sh
vercel domains add <name>.sargam.design <name> --scope sargam8
vercel domains inspect <name>.sargam.design --scope sargam8
```

The second command shows the exact DNS record Vercel needs. For a subdomain it is a CNAME:

| Field | Value |
| --- | --- |
| Type | `CNAME` |
| Name / Host | `<name>` (only the part before `.sargam.design`) |
| Value / Points to | exactly what Vercel shows (for example `abc123.vercel-dns-017.com`) |
| TTL | default |

**The owner adds this at GoDaddy** (My Products, sargam.design, DNS, Add record). Tell the
owner to change nothing else: leave the root domain, `www`, email and nameserver records
alone. Never use a remembered or example value. After the owner confirms, check
`dig +short <name>.sargam.design CNAME` and `vercel domains verify <name>.sargam.design
--scope sargam8`, then load `https://<name>.sargam.design`.

## 6. Add it to the main page (A, branch in `sargam-design`)

On a branch in `sargam-design`, add an entry to `publishedProjects` in `src/lib/projects.ts`
(`id`, `name`, `href: "https://<name>.sargam.design/"`, `tone`, and optionally an icon in
`public/icons/` with a dark variant). Only add it after the address works. Run
`npm run lint`, `npm run typecheck`, `npm run build`, check the preview, then merge.
The card goes live automatically. Keep the card's public text generic; never put private
details on the main page.

## 7. Record it (A)

- Add the project to the table in `docs/ECOSYSTEM.md` and copy the updated file into every
  project repo's `docs/ECOSYSTEM.md`.
- Give the owner a five-line summary: what was created, and what is still on them.

## Rolling back

Vercel dashboard, the project's Deployments, pick the last good deployment, Promote. Or
`vercel rollback <good-deployment-url> --scope sargam8`. Then fix forward on a branch.

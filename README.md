# sargam.design

A mobile-first directory for personal projects. The registry includes
**Health reports**, linking to `https://health.sargam.design/` with a
medical-document/heart icon in light and dark variants. The application uses
the supplied monogram, local Manrope, cobalt accents, and automatic
light/true-black dark appearance.

This is only the homepage. It does not implement the travel tool, passwords,
private data storage, offline downloads, or installation prompts.

## How this site is organised

sargam.design is **one website made of separate projects**. This repo is only the **main
page, the theme and the setup**. Every project has its **own repo and its own subdomain**.

```text
sargam-design/                this repo: main page, theme, setup (public)
├── src/app/page.tsx          the main page (what you see at sargam.design)
├── src/app/about/            About page: planned, folder only, not live
├── src/lib/projects.ts       the list of projects shown on the main page
├── public/                   images and icons (brand, project icons)
└── docs/                     ECOSYSTEM.md, NEW_PROJECT.md, templates/
```

A folder under `src/app/` becomes a web address. `src/app/about/` would show at
`sargam.design/about/`, but only once it contains a `page.tsx` file (that file does the job
`index.html` does on a plain website). Today it has only a README, so nothing is published.

| Site | Repo | Address |
| --- | --- | --- |
| Main page, theme, setup | `sargam-design` (public, this repo) | sargam.design |
| Health reports | `health-reports` (**private**) | health.sargam.design |

A project is **never** a folder here. It gets its own repo; this repo only links to it
through `publishedProjects` in `src/lib/projects.ts`. See [CONTRIBUTING.md](CONTRIBUTING.md),
the map in [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md), and the playbook in
[docs/NEW_PROJECT.md](docs/NEW_PROJECT.md).

**Pushing to `main` updates the live site automatically.** Other branches get a preview link.

This repo is **public**. Never commit secrets, `.env` files, or real health or
family data. The `.gitignore` blocks PDFs, CSVs, report-style JSON and `.env`
files as a safety net.

## Develop

Use Node 24 and npm. Run commands from this directory, not the parent workspace.

```sh
npm ci
npm run dev
```

Development listens on `http://127.0.0.1:3000`. Fonts and images are local; the
homepage does not call third-party services.

## Build a portable site

```sh
npm run build
npm run preview -- -p 4173
```

The build regenerates the brand icons/share image, validates declared project
icons, and exports the site to `out/`. Preview serves that directory at
`http://127.0.0.1:4173`, including its real `404.html` response.

Deploy the **contents of `out/`**, not the source tree. The exported homepage
needs only an ordinary static web server, not Next.js, Node, a database, an
image service, or a Vercel runtime. `npm start` is also a static preview;
`next start` is not used with this export.

The build requires the development dependencies because the asset generator
uses the exact bundled variable font. WOFF2 is losslessly decompressed before
Fontkit outlines the text, avoiding platform-font substitutions in the share
image. Manrope's license ships in `public/licenses/Manrope-OFL.txt`.

## Add a real project

A project lives in **its own repo** at its own subdomain; see
[docs/NEW_PROJECT.md](docs/NEW_PROJECT.md). This repo only links to it. Edit
`publishedProjects` in `src/lib/projects.ts` only after the project's public
destination actually works. The array order is the display order.

| Field | Purpose |
| --- | --- |
| `id` | Stable lowercase identifier; do not change it just to rename the title |
| `name` | Public display name; it wraps rather than truncating |
| `href` | Actual site-relative or HTTPS destination |
| `tone` | `cobalt`, `moss`, `violet`, `clay`, `ochre`, or `teal` |
| `icon.src` | Optional local icon path within `public/` |
| `icon.darkSrc` | Optional dark-appearance asset; supplied marks are not inverted |
| `publicSummary` | Optional public metadata copy, not a description in the grid |

Keep each project's permanent URL stable so bookmarks continue to work.
Projects can be independently hosted and need not use this framework.

The registry rejects duplicate ids, invalid destinations, and invalid icon
paths. The build rejects missing icon files rather than publishing broken
images. If `icon` is omitted, the component displays grapheme-safe initials.

Never put passwords, private records, signed document links, or other sensitive
content in the registry or `public/`. Future public demos should use genuinely
synthetic, clearly labelled content; real family data and access controls
belong to the separately built project.

Test definitions live under `tests/`. The pretest command renders the real
React collection into ignored `.test-fixtures/` HTML files, which browser tests
load during the test. No fixture route or fake projects are deployed.

## Appearance, assets, and metadata

- `src/app/globals.css`: tokens, responsive layout, system appearance, focus,
  and reduced-motion behavior.
- `src/components/`: supplied brand lockup, empty illustration, and icon/name
  project collection.
- `src/assets/`: the bundled variable font.
- `public/brand/`: original supplied black/white monogram SVGs.
- `scripts/generate-brand-assets.mjs`: favicon, Apple touch icon, and the
  1200 x 630 branded share image.
- `src/lib/site.ts`: public site identity and canonical origin.
- `src/app/robots.ts` and `sitemap.ts`: static public discovery metadata.

The homepage is indexable. Its initial sitemap contains only the real home
URL. Published destinations on other hosts do not get inserted into this
host's sitemap. There is no fabricated last-modified date or private content
in preview metadata. Search engines and messaging apps decide whether and how
to display the supplied metadata.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium webkit
npm test
```

The browser suite serves `out/` using a generic static server. It covers
desktop Chromium and iPhone-style WebKit, light/dark states, keyboard access,
accessibility, narrow/enlarged text, native links, and zero/one/many projects.
It saves screenshots under the ignored `test-results/` directory.

## Vercel and the GoDaddy domain

Vercel hosts the site. GoDaddy registers `sargam.design` and hosts its DNS, so no domain
transfer is needed. `sargam.design` and `www.sargam.design` are attached to the Vercel project
`sargam-design` (team `sargam8`), and the DNS records at GoDaddy point to Vercel.

### How it goes live (the normal way)

This repo is connected to that Vercel project through GitHub.

- Push to **any branch**: Vercel builds a **preview** link. Nothing live changes.
- Push or merge to **`main`**: Vercel builds the static export (`npm run build`) and publishes
  https://sargam.design by itself, usually within a minute or two.

So **`main` is the live site**. Do not deploy by hand. To undo a bad release, promote the
previous deployment in the Vercel dashboard (or `vercel rollback <deployment-url> --scope
sargam8`) and fix it on a branch. Never change DNS without the owner's approval.

The full picture is in [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md).

### Fallback only: prebuilt deployment by hand

Before GitHub was connected, the site was uploaded by hand. Use this only if the GitHub route
is unavailable and the owner asks for it.

If organization policy blocks package or deployment traffic, keep that policy
in place and coordinate an approved route with IT. The existing static export
can be reviewed locally without fetching more packages.

For an approved **prebuilt-only Vercel deployment**, prepare the existing export:

```sh
node scripts/prepare-vercel-output.mjs
```

This copies only `out/` into the documented Build Output API structure under
`.vercel/output/`, with real 404 routing and the exported RSC payload MIME
types. It does not run a build, install dependencies, copy source or environment
files, or change the portable `out/` directory.

Use an already-installed Vercel CLI with `--prebuilt --prod`, targeting the
linked project. `NO_UPDATE_NOTIFIER=1` disables the CLI's optional npm version
check; it does not change any network policy. Do not use this path to retrieve
blocked packages. A prebuilt upload needs no npm installation on Vercel.

1. Sign in to the intended Vercel account and deploy this application. Use
   `npm run build` with its static export. Do not enable a paid plan by default.
2. Confirm the Vercel deployment before changing the domain.
3. Add `sargam.design` and `www.sargam.design` to the Vercel project.
4. Back up the current DNS records. Use the **exact A/CNAME values supplied by
   that Vercel project**, not a remembered example address.
5. With the owner's approval, replace only conflicting website records at
   GoDaddy. Preserve nameservers and unrelated email/verification records.
6. Redirect `www` to `https://sargam.design` and confirm HTTPS, assets, and 404s.

The source lives in the public GitHub repo `sargamprakash/sargam-design`. Do not connect
additional accounts, change DNS, or buy a plan without approval. Passwords, MFA codes, and
hosting credentials must not be pasted into source or chat.

## Move to another host

Keep the source, lockfile, assets, and exported `out/` together.

1. Confirm that the destination can serve uploaded HTML/CSS/JS and provide
   HTTPS. Owning a GoDaddy domain or a website-builder subscription does not
   by itself provide compatible file hosting.
2. Upload the contents of `out/` and configure directory indexes, the
   `404.html` error response, and the equivalent `www`/HTTPS redirects.
3. On Apache-based hosting, configure `ErrorDocument 404 /404.html` rather than
   sending every unknown path to the homepage with a misleading 200 status.
4. Verify the destination before DNS cutover, preserve unrelated DNS records,
   and retain the prior deployment and record values for rollback.

The static homepage has no provider-specific storage or authentication to
migrate. Any future private tools have their own runtime/data requirements;
copying this homepage does not migrate them.

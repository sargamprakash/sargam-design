---
name: "sargam.design"
description: "A warm, understated visual language for a little personal toolkit."
colors:
  accent: "#2f5bd2"
  accent-dark: "#8ba7ff"
  canvas: "#ffffff"
  canvas-dark: "#000000"
  surface: "#f7f7f5"
  surface-dark: "#121214"
  ink: "#242424"
  ink-dark: "#f3f3f5"
  secondary: "#666666"
  secondary-dark: "#a6a6ae"
  line: "#e8e8e5"
  line-dark: "#29292e"
typography:
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 650
    lineHeight: "2.375rem"
    letterSpacing: "-0.035em"
  headline-desktop:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 650
    lineHeight: "2.75rem"
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: "1.625rem"
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: "1.375rem"
rounded:
  project-icon: "16px"
  project-shortcut: "1.125rem"
spacing:
  gutter: "1.5rem"
  gutter-medium: "2rem"
  gutter-desktop: "3rem"
  gutter-narrow: "1.25rem"
  main-top: "2.25rem"
  main-top-medium: "2.75rem"
  main-top-desktop: "3.5rem"
  collection-gap: "2rem"
  collection-gap-medium: "2.5rem"
  collection-gap-desktop: "2.75rem"
components:
  brand:
    textColor: "{colors.ink}"
    rounded: "0.375rem"
  brand-dark:
    textColor: "{colors.ink-dark}"
  empty-projects:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "1.25rem"
    padding: "1.75rem 1.5rem"
  empty-projects-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-dark}"
  project-shortcut:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.project-shortcut}"
    padding: "1rem 0.625rem"
  project-shortcut-hover:
    backgroundColor: "{colors.surface}"
  project-shortcut-active:
    backgroundColor: "{colors.surface}"
  project-shortcut-dark:
    textColor: "{colors.ink-dark}"
  project-shortcut-hover-dark:
    backgroundColor: "{colors.surface-dark}"
  project-shortcut-active-dark:
    backgroundColor: "{colors.surface-dark}"
  project-icon:
    backgroundColor: "#eef3ff"
    textColor: "{colors.accent}"
    rounded: "{rounded.project-icon}"
    width: "52px"
    height: "52px"
  project-icon-dark:
    backgroundColor: "#142044"
    textColor: "{colors.accent-dark}"
  project-icon-moss:
    backgroundColor: "#eff4ed"
    textColor: "#416d42"
  project-icon-moss-dark:
    backgroundColor: "#172218"
    textColor: "#91bc8b"
  project-icon-violet:
    backgroundColor: "#f3effa"
    textColor: "#7453a4"
  project-icon-violet-dark:
    backgroundColor: "#251d34"
    textColor: "#bc9bef"
  project-icon-clay:
    backgroundColor: "#f8ede8"
    textColor: "#a2593d"
  project-icon-clay-dark:
    backgroundColor: "#2c1e18"
    textColor: "#d69b7f"
  project-icon-ochre:
    backgroundColor: "#f7f2e3"
    textColor: "#836323"
  project-icon-ochre-dark:
    backgroundColor: "#2a2516"
    textColor: "#d0b268"
  project-icon-teal:
    backgroundColor: "#eaf4f3"
    textColor: "#2d7168"
  project-icon-teal-dark:
    backgroundColor: "#142725"
    textColor: "#84bdb5"
---

# Design System: sargam.design

## Overview

**Creative North Star: "My little toolkit."**

Warm, personal, and understated: the identity feels like a small collection of useful things, not a performance by its maker. The supplied monochrome monogram and Manrope carry recognition; restrained cobalt adds a small, clear point of emphasis. Approachable typography and careful spacing matter more than ornamental treatment or borrowed branding.

The implemented visual language is compact without feeling crowded. White space, quiet tonal surfaces, and consistently rounded icon boxes make room for individual project character. A true-black system dark appearance belongs to the same identity. Playfulness is confined to small movements during real interaction, with equally clear nonmoving feedback.

**Key Characteristics:**
- Supplied monochrome monogram at a deliberately modest optical size.
- Manrope throughout, with weight and spacing creating hierarchy.
- Restrained cobalt on white or a true-black system dark canvas.
- Compact, consistent icon surfaces with distinct project tones.
- Quiet, accessible feedback only during interaction.

## Colors

Restrained cobalt sits within a warm-neutral light palette and a cool-neutral dark palette; project-specific tones stay inside the shared icon geometry.

The frontmatter is normative. The unsuffixed semantic colors map to the identically named root CSS custom properties; their `-dark` counterparts are the values of those same properties under the system dark preference. Icon colors remain component-scoped variants rather than a second global palette.

### Primary
- **Cobalt** (`accent`): the wordmark dot, bookmarked-tile accent, keyboard focus, and default project-icon foreground.
- **Light cobalt** (`accent-dark`): the corresponding dark-appearance emphasis, kept readable against black and dark surfaces.

### Neutral
- **White / true black** (`canvas` / `canvas-dark`): the page canvas.
- **Warm mist / charcoal** (`surface` / `surface-dark`): the empty-state container and interactive shortcut backgrounds.
- **Soft ink / pale ink** (`ink` / `ink-dark`): headings, wordmark, and project names.
- **Quiet gray / silver gray** (`secondary` / `secondary-dark`): supporting copy and the small credit. These are text roles, not a secondary brand accent.
- **Warm hairline / dark hairline** (`line` / `line-dark`): the subtle header divider.

### Named Rules

**The System Appearance Rule.** Follow the system color preference automatically, preserve the true-black dark canvas, and do not add a theme toggle.

**The Contained Color Rule.** Keep cobalt as the identity accent; give project icons distinct tones without changing their shared geometry or coloring their name labels.

The supplied mark stays black in light appearance and white in dark appearance. The white mark on cobalt is the established favicon and touch-icon treatment. Illustration paper and strokes are local artwork details, not additional global palette roles. Sidecar tonal ramps are synthesized swatch previews, not implemented theme steps or substitutes for the recorded colors.

## Typography

**Display Font:** Manrope, with system-ui and sans-serif fallbacks.
**Body Font:** the same Manrope family and fallback stack.

**Character:** approachable, clear, and quietly rounded. The single-family hierarchy is intentional; size, weight, and tight heading tracking supply distinction without an ornamental second face.

Manrope is loaded locally through `next/font/local`, uses the bundled variable weight range (200–800), and swaps into place. The CSS disables font synthesis. This is a local-font identity, not a dependency on a remote font service.

### Hierarchy
- **Headline** (`headline`; `headline-desktop` from the desktop breakpoint): the leading heading, balanced across lines and allowed to wrap long text.
- **Title** (`title`): the collection heading, visually below the headline.
- **Body** (`body`): supporting introduction text; the desktop introduction uses a slightly more open line height (1.5625rem).
- **Label** (`label`): project names, centered below icons and allowed to wrap without truncation.

Component-specific typography is not a new global scale: the wordmark is bold (700), with a base size/line height (1.125rem / 1.625rem) that grows on desktop (1.25rem / 1.75rem). The empty-state title is semibold (650), with its own base size/line height (1.1875rem / 1.6875rem) and desktop treatment (1.25rem / 1.75rem). Empty supporting copy uses a compact size/line height (0.9375rem / 1.5rem); the credit is smaller (0.8125rem / 1.25rem).

**The One Family Rule.** Preserve Manrope across the wordmark, headings, copy, and labels; use the established weight and size relationships instead of introducing another typeface.

Keep the wordmark's soft break before the dot and its emergency wrapping for enlarged text. Balance both the empty-state title and supporting copy. Decorative initials remain fixed-size (20px, unit line height) inside the icon box; they are hidden from assistive technology, while the adjacent project name remains readable, resizable text.

## Layout

The shared container aligns the header, main content, and credit. It is full-width with a centered maximum width of the content measure plus two gutters (60rem + twice the current gutter). Inline padding uses the larger of the gutter and each safe-area inset. The body is a column with a viewport minimum height (100svh, with a 100vh fallback), and main content flexes so the footer stays in document flow.

The spacing entries are the existing named layout controls, not a general-purpose spacing scale. Unsuffixed values apply first; medium and desktop variants replace them at the corresponding breakpoint.

| Viewport | Layout controls | Published-project grid | Header minimum height |
| --- | --- | --- | --- |
| Base | Base gutter, main-top, and collection-gap | Two equal columns; row/column gap (0.75rem / 1rem) | Base height (4rem), plus top safe area |
| At least 40rem | Medium variants | Three equal columns; gap (1rem) | Medium height (4.5rem), plus top safe area |
| At least 60rem | Desktop variants | Four equal columns; gap (1rem) | Desktop height (5rem), plus top safe area |
| At most 359px | Narrow gutter; other base controls remain | Two columns | Base behavior |
| At most 319px | Narrow gutter | One column to preserve legibility | Base behavior |

Keep the user-approved icon/name grid rather than substituting image-heavy cards. Columns use `minmax(0, 1fr)` and project names wrap. Shortcut targets are roomy despite the compact icons: base minimum height (8.25rem), increasing on desktop (8.5rem). Desktop shortcut padding increases (1.125rem / 0.75rem).

The empty container has a minimum height rather than a fixed height (18rem), so enlarged text can grow it. Its desktop padding increases (2rem); at the narrowest breakpoint, inline padding decreases (1rem). Empty copy has a bounded measure that widens on desktop (16.25rem to 20.625rem). The footer respects the bottom safe area and is not fixed over content.

These measurements describe the implemented homepage and its collection pattern, not an imposed composition for future tools. No surface mode or deferred-tool layout is established here.

## Elevation & Depth

The system is flat. There are no implemented shadow or blur tokens. Depth comes from a quiet surface against the page canvas, the thin header divider (1px), and local paper/stroke contrast in the bookmarked-tile illustration. Shortcut interaction changes the surface tone and moves the icon slightly; it does not introduce a shadow-based elevation scale.

**The Quiet Depth Rule.** Use tonal separation and the established hairline rather than inventing shadows or glass effects for these components.

## Shapes

Small rounded icon boxes are the recurring signature: a fixed square footprint (52px) with the `project-icon` radius. Custom project imagery occupies a centered inner square (26px); fixed-size decorative initials are the fallback. Keep that silhouette consistent across cobalt, moss, violet, clay, ochre, and teal.

The containing shortcut uses the separate `project-shortcut` radius and remains visually open at rest. The larger empty-state surface is more gently rounded; its radius belongs to `components.empty-projects`, not a generalized card scale. The bookmarked-tile illustration is component-local artwork (96px by 72px), with a rounded paper tile and fine strokes.

Preserve the supplied monogram's exact path and optical crop. In the header it is deliberately small (20px by 33px), increasing only on desktop (22px by 36px). It does not shrink with the wordmark, and it is not a generic initial badge.

## Components

### Brand navigation

Compact and recognizable, with an optically modest mark beside the wordmark.

- Use the supplied black/white SVGs with the existing cropped viewBox (`32 12 64 104`); do not redraw the mark.
- The mark-to-wordmark gap is compact (0.625rem), growing on desktop (0.75rem). The dot uses the primary accent.
- The home link has a comfortable minimum target height (2.75rem), no underline, and the accessible name “sargam.design home.” Its mark is decorative.
- Preserve soft wordmark reflow. No brand hover animation is implemented; keyboard focus uses the shared ring.

### Empty projects

Finished, calm, and honest rather than an unfinished loading placeholder.

- Use the quiet surface, rounded container, and padding recorded in `components.empty-projects`.
- Center the bookmarked-tile illustration, title, and bounded copy. The illustration is decorative and has no motion.
- Preserve “Nothing here just yet.” and “When a tool is ready, you'll find it here.” Balance the copy instead of forcing line breaks.
- Keep the title as a heading within the named collection section. This is a static, noninteractive state: no invented call to action, progress indicator, or disabled fake project.

### Project shortcuts

Small, direct native links with individual icon character and one consistent shape.

- The implemented collection supports the approved grid when projects exist; the finished homepage currently has zero published projects. Documentation previews are specimens, not launch entries.
- Render an ordered-by-source list of native same-tab anchors, each with a visible name below its icon. Preserve durable destination URLs and owner-controlled order; no whole-card script is needed.
- Use the shared shortcut and icon geometry. Names inherit the normal ink color. Cobalt is the default icon treatment; moss, violet, clay, ochre, and teal are scoped variants recorded in the frontmatter. Teal uses the accessible current foreground, not the earlier lighter treatment.
- Custom icons can have a system-dark asset variant. Decorative initials and images stay inside the fixed icon area; the visible name supplies the link's accessible text.
- On a hover-capable fine pointer, reveal the quiet surface and move only the icon (translate upward 2px and rotate −2deg). On press, retain the surface and compress only the icon (scale 0.94). Press takes precedence over hover.
- Transition only the icon transform (160ms, `cubic-bezier(.2,.7,.2,1)`). There is no arrival or idle animation.
- Under reduced motion, remove both the transition and interaction transforms. Surface feedback and visible keyboard focus remain.

### Shared keyboard affordances

Native, visible, and unobtrusive until needed.

- All anchors use the accent outline on `:focus-visible` (2px solid, offset 4px).
- The skip link becomes visible when focused and targets the main region, which can receive programmatic focus.
- Do not make decorative SVGs focusable. Preserve the text link name, semantic headings, and list structure.

The sidecar contains drop-in previews of the brand, empty state, and representative implemented shortcut tones. These do not add controls to the application. Standalone buttons, inputs, chips, dialogs, and theme controls are not part of the sampled homepage component vocabulary.

## Do's and Don'ts

### Do:
- **Do** use the supplied monochrome monogram at its modest optical size beside the Manrope wordmark.
- **Do** preserve cobalt as the identity accent and the system-driven white/true-black canvas.
- **Do** keep project-specific tones inside the consistent rounded icon geometry.
- **Do** retain the approved responsive icon/name grid, native same-tab links, and visible focus.
- **Do** balance empty-state copy and allow the wordmark and project names to reflow with enlarged text.
- **Do** keep decorative initials fixed inside their icon box while visible names remain resizable.
- **Do** honor reduced motion by removing icon movement while retaining clear state feedback.

### Don't:
- **Don't** redraw the supplied mark, enlarge it into a hero motif, or replace the approved Manrope identity.
- **Don't** substitute a gray dark canvas or add a theme toggle.
- **Don't** add arrival animation, idle animation, or movement to the static empty illustration.
- **Don't** fill the zero-project state with fictional entries, loading skeletons, or unavailable actions.
- **Don't** restore the earlier lower-contrast teal treatment or clip enlarged text to preserve a rigid layout.
- **Don't** promote local illustration values, synthetic swatch ramps, or off-surface control styles into global tokens.

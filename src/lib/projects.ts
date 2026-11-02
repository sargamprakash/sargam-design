import { SITE } from "./site.ts";

export const PROJECT_TONES = [
  "cobalt",
  "moss",
  "violet",
  "clay",
  "ochre",
  "teal",
] as const;

export type ProjectTone = (typeof PROJECT_TONES)[number];
export type LocalAsset = `/${string}`;

export type Project = Readonly<{
  id: string;
  name: string;
  href: LocalAsset | `https://${string}`;
  tone: ProjectTone;
  icon?: Readonly<{
    src: LocalAsset;
    darkSrc?: LocalAsset;
  }>;
  publicSummary?: string;
}>;

function isLocalPath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("\\");
}

export function defineProjects<const T extends readonly Project[]>(items: T): T {
  const ids = new Set<string>();

  for (const project of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id)) {
      throw new Error(`Project "${project.id}" needs a stable lowercase slug.`);
    }
    if (ids.has(project.id)) {
      throw new Error(`Duplicate project id: "${project.id}".`);
    }
    ids.add(project.id);

    if (!project.name.trim() || project.name !== project.name.trim()) {
      throw new Error(`Project "${project.id}" needs a name without surrounding whitespace.`);
    }
    if (!PROJECT_TONES.some((tone) => tone === project.tone)) {
      throw new Error(`Project "${project.id}" has an unknown icon tone.`);
    }
    if (
      project.href !== project.href.trim() ||
      project.href.includes("\\") ||
      !(isLocalPath(project.href) || project.href.startsWith("https://")) ||
      !URL.canParse(project.href, SITE.origin)
    ) {
      throw new Error(`Project "${project.id}" needs a site-relative or HTTPS destination.`);
    }
    const destination = new URL(project.href, SITE.origin);
    if (destination.username || destination.password) {
      throw new Error(`Project "${project.id}" must not put credentials in its destination.`);
    }
    for (const asset of [project.icon?.src, project.icon?.darkSrc]) {
      if (asset !== undefined && (!isLocalPath(asset) || /[?#]/.test(asset))) {
        throw new Error(`Project "${project.id}" needs a local icon path without query or hash.`);
      }
    }
  }

  return items;
}

export function projectInitials(name: string): string {
  if (!name.trim()) {
    throw new Error("Cannot create project initials from an empty name.");
  }
  const segments = new Intl.Segmenter("en", { granularity: "grapheme" });
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => segments.segment(word)[Symbol.iterator]().next().value?.segment)
    .join("")
    .toLocaleUpperCase("en");
}

export const publishedProjects = defineProjects([
  {
    id: "health-reports",
    name: "Health reports",
    href: "https://health.sargam.design/",
    tone: "cobalt",
    icon: {
      src: "/icons/health-reports.svg",
      darkSrc: "/icons/health-reports-dark.svg",
    },
    publicSummary: "A private family health-record archive.",
  },
]);

import { defineProjects, type Project } from "../src/lib/projects";

export const sampleProjects = defineProjects([
  {
    id: "example-one",
    name: "Example one",
    href: "/example-one/",
    tone: "cobalt",
    icon: {
      src: "/brand/monogram-black.svg",
      darkSrc: "/brand/monogram-white.svg",
    },
  },
  { id: "example-two", name: "Example two", href: "/example-two/", tone: "moss" },
  { id: "example-three", name: "Example three", href: "/example-three/", tone: "violet" },
  { id: "example-four", name: "A deliberately longer project name", href: "/example-four/", tone: "clay" },
  { id: "example-five", name: "Example five", href: "/example-five/", tone: "ochre" },
  { id: "example-six", name: "Example six", href: "/example-six/", tone: "teal" },
]);

export function exampleProject(overrides: Partial<Project> = {}): Project {
  return { ...sampleProjects[0], ...overrides };
}

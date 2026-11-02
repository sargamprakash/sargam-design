import React from "react";
import { type Project, projectInitials } from "@/lib/projects";
import { EmptyProjects } from "./empty-projects";

export function ProjectCollection({
  projects,
}: {
  projects: readonly Project[];
}) {
  return (
    <section className="project-collection" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="collection-heading">
        Projects
      </h2>
      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <ul className="project-grid">
          {projects.map((project) => (
            <li key={project.id}>
              <a className="project-shortcut" href={project.href}>
                <span
                  className="project-icon"
                  data-tone={project.tone}
                  aria-hidden="true"
                >
                  {project.icon ? (
                    <picture className="project-image">
                      {project.icon.darkSrc ? (
                        <source
                          media="(prefers-color-scheme: dark)"
                          srcSet={project.icon.darkSrc}
                        />
                      ) : null}
                      <img
                        src={project.icon.src}
                        width="26"
                        height="26"
                        alt=""
                        decoding="async"
                      />
                    </picture>
                  ) : (
                    <span className="project-initials">
                      {projectInitials(project.name)}
                    </span>
                  )}
                </span>
                <span className="project-name">{project.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

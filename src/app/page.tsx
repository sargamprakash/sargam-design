import { ProjectCollection } from "@/components/project-collection";
import { publishedProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <div className="container">
        <h1 className="page-title">{SITE.heading}</h1>
        <p className="intro-copy">{SITE.description}</p>
        <ProjectCollection projects={publishedProjects} />
      </div>
    </main>
  );
}

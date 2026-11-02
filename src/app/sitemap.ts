import type { MetadataRoute } from "next";
import { publishedProjects } from "@/lib/projects";
import { publicSitemapUrls } from "@/lib/public-sitemap";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicSitemapUrls(publishedProjects).map((url) => ({ url }));
}

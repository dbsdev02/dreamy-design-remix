import imagesData from "./projects.images.json";
import data from "./projects.data.json";

export type CategoryKey = "commercial" | "retail" | "healthcare" | "institutional";

export type ProjectMeta = {
  category: CategoryKey;
  name: string;
  location: string;
  year: string;
  blurb: string;
  order?: string[];
  cover?: number;
};

export type Project = {
  slug: string;
  folder: string;
  name: string;
  category: CategoryKey;
  categoryTitle: string;
  location: string;
  year: string;
  blurb: string;
  cover: string;
  images: string[];
};

const manifest = imagesData as Record<string, string[]>;
const categoryMeta = data.categoryMeta as Record<CategoryKey, { title: string; blurb: string }>;
const categoryOrder = data.categoryOrder as CategoryKey[];
const META = data.meta as Record<string, ProjectMeta>;

/** Folders that exist in the image manifest but should not appear as projects. */
const FOLDER_SKIP = new Set(["Other"]);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projects: Project[] = Object.entries(META)
  .filter(([folder]) => !FOLDER_SKIP.has(folder) && manifest[folder]?.length)
  .map(([folder, m]) => {
    const images = (manifest[folder] ?? []).slice();
    if (m.order?.length) {
      const decoded = (u: string) => decodeURIComponent(u.split("/").pop() ?? "");
      const ranked = [...m.order];
      images.sort((a, b) => {
        const ia = ranked.indexOf(decoded(a));
        const ib = ranked.indexOf(decoded(b));
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });
    }
    const cover = images[Math.min(m.cover ?? 0, images.length - 1)] ?? images[0] ?? "";
    return {
      slug: slugify(m.name),
      folder,
      name: m.name,
      category: m.category,
      categoryTitle: categoryMeta[m.category].title,
      location: m.location,
      year: m.year,
      blurb: m.blurb,
      cover,
      images,
    };
  });

export const projectsByCategory = categoryOrder
  .map((key) => ({
    key,
    ...categoryMeta[key],
    projects: projects.filter((p) => p.category === key),
  }))
  .filter((c) => c.projects.length);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const adjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
};

export const projectCount = projects.length;

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { adjacentProjects, getProject } from "@/lib/projects";

export const Route = createFileRoute("/projects_/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project
      ? `${project.name} | Essential Decor Projects`
      : "Project | Essential Decor";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: project?.blurb ?? "An Essential Decor interior fit-out project in Dubai.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: project?.blurb ?? "" },
        { property: "og:type", content: "article" },
        ...(project?.cover ? [{ property: "og:image", content: project.cover }] : []),
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) => {
      if (!project) return;
      setLightbox((i) =>
        i === null ? i : (i + dir + project.images.length) % project.images.length,
      );
    },
    [project],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  if (!project) {
    return (
      <PageShell>
        <section className="bg-secondary">
          <SiteHeader />
        </section>
        <section className="px-8 py-32 text-center md:px-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Not found</p>
          <h1 className="mt-6 text-5xl font-semibold">That project isn’t here.</h1>
          <Link
            to="/projects"
            className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={16} /> Back to all work
          </Link>
        </section>
        <SiteFooter />
      </PageShell>
    );
  }

  const { prev, next } = adjacentProjects(slug);
  const hero = project.cover || project.images[0] || "";

  return (
    <PageShell>
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 overflow-hidden">
          <img src={hero} alt={project.name} className="h-full w-full object-cover opacity-45" />
        </div>
        <div className="relative z-10">
          <SiteHeader inverse />
          <div className="min-h-[38svh] md:min-h-[46svh]" />
        </div>
      </section>

      <section className="px-8 pt-10 md:px-16 md:pt-14">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[.14em] text-muted-foreground">
          <Link to="/projects" className="link-underline">
            Our Work
          </Link>
          <span>/</span>
          <span>{project.categoryTitle}</span>
          <span>/</span>
          <span className="text-accent">{project.name}</span>
        </nav>
        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <h1 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[.9] tracking-[-.03em]">
              {project.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[.16em] text-muted-foreground">
              {project.location} · {project.year}
            </p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
        </div>
      </section>

      <section className="px-8 py-12 md:px-16 md:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.images.map((src, i) => {
            const big = i % 4 === 0;
            return (
              <Reveal key={src} delay={(i % 3) * 70} className={big ? "sm:col-span-3" : ""}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`group block w-full overflow-hidden bg-muted ${
                    big ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.name} — view ${i + 1}`}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[.14em] text-muted-foreground">
          {project.images.length} {project.images.length === 1 ? "image" : "images"} · click to
          enlarge
        </p>
      </section>

      <section className="grid grid-cols-1 border-y border-border md:grid-cols-2">
        {prev && (
          <Link
            to="/projects/$slug"
            params={{ slug: prev.slug }}
            className="group flex items-center gap-5 border-b border-border px-8 py-10 md:border-b-0 md:border-r md:px-16"
          >
            <ArrowLeft
              size={22}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>
              <span className="block text-[11px] uppercase tracking-[.16em] text-muted-foreground">
                Previous work
              </span>
              <span className="mt-1 block text-lg font-medium group-hover:text-accent">
                {prev.name}
              </span>
            </span>
          </Link>
        )}
        {next && (
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-end gap-5 px-8 py-10 text-right md:px-16"
          >
            <span>
              <span className="block text-[11px] uppercase tracking-[.16em] text-muted-foreground">
                Next work
              </span>
              <span className="mt-1 block text-lg font-medium group-hover:text-accent">
                {next.name}
              </span>
            </span>
            <ArrowRight
              size={22}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </section>

      <section className="grid-lines px-8 py-24 text-center md:px-16 md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Have a similar space?
          </p>
          <h2 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[.9] tracking-[-.03em]">
            Let’s talk about <em className="font-display font-medium">yours.</em>
          </h2>
          <Link
            to="/contact"
            className="mt-9 inline-flex h-12 items-center gap-2 bg-primary px-8 text-xs font-semibold uppercase tracking-[.14em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start the conversation <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <SiteFooter />

      {lightbox !== null && project.images[lightbox] && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 text-primary-foreground transition-transform hover:rotate-90 md:right-8 md:top-8"
          >
            <X size={30} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 text-primary-foreground/70 transition-colors hover:text-primary-foreground md:left-8"
          >
            <ArrowLeft size={34} strokeWidth={1.2} />
          </button>
          <img
            src={project.images[lightbox]}
            alt={`${project.name} — view ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 text-primary-foreground/70 transition-colors hover:text-primary-foreground md:right-8"
          >
            <ArrowRight size={34} strokeWidth={1.2} />
          </button>
          <span className="absolute bottom-5 text-xs uppercase tracking-[.16em] text-primary-foreground/60">
            {lightbox + 1} / {project.images.length}
          </span>
        </div>
      )}
    </PageShell>
  );
}

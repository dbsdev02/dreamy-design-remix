import { ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { projectCount, projectsByCategory } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Essential Decor — Interior Fit-Out in Dubai" },
      {
        name: "description",
        content:
          "A selection of Essential Decor commercial, retail, healthcare and institutional interior fit-out projects delivered across Dubai and the UAE.",
      },
      { property: "og:title", content: "Projects | Essential Decor" },
      {
        property: "og:description",
        content: "Completed interior fit-out, design and build projects across Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <SiteHeader />
        <PageIntro
          eyebrow="Our work"
          title={
            <>
              Spaces built for
              <br />
              <em className="font-display font-medium">how they’re used.</em>
            </>
          }
        >
          {projectCount}+ completed interiors across Dubai — commercial, retail, healthcare and
          institutional. Designed to enhance functionality, reflect brand identity and create better
          everyday experiences.
        </PageIntro>
      </section>

      {projectsByCategory.map((category, ci) => (
        <section
          key={category.key}
          className={`px-8 py-20 md:px-16 md:py-28 ${ci % 2 === 0 ? "" : "bg-secondary"}`}
        >
          <Reveal className="mb-14 border-b border-border pb-7">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
              {String(ci + 1).padStart(2, "0")} — {category.title}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {category.blurb}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {category.projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 90}>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={project.cover}
                      alt={project.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[.12em]">
                      {project.year}
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium leading-snug transition-colors group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[.14em] text-muted-foreground">
                        {project.location}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-.02em]">
            Want your project
            <br />
            <em className="font-display font-medium">on this page next year?</em>
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex h-12 items-center gap-2 bg-primary-foreground px-8 text-xs font-semibold uppercase tracking-[.14em] text-primary transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start the conversation <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </PageShell>
  );
}

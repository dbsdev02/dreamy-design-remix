import { ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blog | Essential Decor — Interior Fit-Out Insights" },
      {
        name: "description",
        content:
          "Notes on commercial interior fit-out, authority approvals, design and project management from the Essential Decor team in Dubai.",
      },
      { property: "og:title", content: "Blog | Essential Decor" },
      {
        property: "og:description",
        content: "Interior fit-out, design and build insights from Essential Decor LLC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogsPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogsPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <PageShell>
      <SiteHeader />
      <section className="bg-secondary">
        <PageIntro
          eyebrow="Blog"
          title={
            <>
              Notes on building
              <br />
              <em className="font-display font-medium">better commercial spaces.</em>
            </>
          }
        >
          Practical notes on fit-out timelines, authority approvals, design and project management
          from the Essential Decor team.
        </PageIntro>
      </section>

      {featured && (
        <section className="px-8 py-20 md:px-16 md:py-28">
          <Reveal className="group grid grid-cols-1 gap-8 border-b border-border pb-16 md:grid-cols-12">
            <Link
              to="/blogs/$slug"
              params={{ slug: featured.slug }}
              className="relative aspect-[16/10] overflow-hidden bg-muted md:col-span-7"
            >
              <img
                src={featured.cover}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-col justify-center md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
                {featured.category} · {formatDate(featured.date)}
              </p>
              <Link to="/blogs/$slug" params={{ slug: featured.slug }}>
                <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.02em] transition-colors group-hover:text-accent">
                  {featured.title}
                </h2>
              </Link>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <Link
                to="/blogs/$slug"
                params={{ slug: featured.slug }}
                className="link-underline mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]"
              >
                {featured.readTime} <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      <section className="px-8 pb-20 md:px-16 md:pb-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90} className="group">
              <Link to="/blogs/$slug" params={{ slug: post.slug }} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-accent">
                  {post.category} · {formatDate(post.date)}
                </p>
                <h3 className="mt-3 text-lg font-medium leading-snug transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-[.14em] text-muted-foreground">
                  {post.readTime}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-.02em]">
            Have a space
            <br />
            <em className="font-display font-medium">you're planning to fit out?</em>
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

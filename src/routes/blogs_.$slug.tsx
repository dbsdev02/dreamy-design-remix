import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { adjacentBlogPosts, getBlogPost, type BlogBlock } from "@/lib/blog";

export const Route = createFileRoute("/blogs_/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    const title = post ? `${post.title} | Essential Decor Blog` : "Blog | Essential Decor";
    return {
      meta: [
        { title },
        { name: "description", content: post?.excerpt ?? "An Essential Decor blog post." },
        { property: "og:title", content: title },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        ...(post?.cover ? [{ property: "og:image", content: post.cover }] : []),
      ],
    };
  },
  component: BlogDetail,
});

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders `[label](url)` markdown-style links inside otherwise-plain text. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-foreground"
      >
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function BlogContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 text-2xl font-semibold leading-[1.15] tracking-[-.01em] first:mt-0 md:text-3xl">
          {renderInline(block.text)}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="shrink-0 font-display text-base italic text-accent">{i + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "iframe":
      return (
        <div className="mt-8 aspect-[4/3] w-full overflow-hidden border border-border sm:aspect-video">
          <iframe
            title={block.title}
            src={block.src}
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      );
    case "p":
    default:
      return (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground first:mt-0">
          {renderInline(block.text)}
        </p>
      );
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogDetail() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <PageShell>
        <section className="bg-secondary">
          <SiteHeader />
        </section>
        <section className="px-8 py-32 text-center md:px-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Not found</p>
          <h1 className="mt-6 text-4xl font-semibold">That post isn’t here.</h1>
          <Link
            to="/blogs"
            className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={16} /> Back to the blog
          </Link>
        </section>
        <SiteFooter />
      </PageShell>
    );
  }

  const { prev, next } = adjacentBlogPosts(slug);

  return (
    <PageShell>
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 overflow-hidden">
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover opacity-45" />
        </div>
        <div className="relative z-10">
          <SiteHeader inverse />
          <div className="min-h-[34svh] md:min-h-[40svh]" />
        </div>
      </section>

      <section className="px-8 pt-10 md:px-16 md:pt-14">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[.14em] text-muted-foreground">
          <Link to="/blogs" className="link-underline">
            Blog
          </Link>
          <span>/</span>
          <span className="text-accent">{post.category}</span>
        </nav>
        <div className="mt-6 max-w-3xl border-b border-border pb-8">
          <h1 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.1] tracking-[-.02em]">
            {post.title}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[.16em] text-muted-foreground">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </section>

      <section className="px-8 py-12 md:px-16 md:py-16">
        <Reveal className="mx-auto max-w-2xl">
          {post.content.map((block, i) => (
            <BlogContentBlock key={i} block={block} />
          ))}
        </Reveal>
      </section>

      <section className="grid grid-cols-1 border-y border-border md:grid-cols-2">
        {prev && (
          <Link
            to="/blogs/$slug"
            params={{ slug: prev.slug }}
            className="group flex items-center gap-5 border-b border-border px-8 py-10 md:border-b-0 md:border-r md:px-16"
          >
            <ArrowLeft
              size={22}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>
              <span className="block text-[11px] uppercase tracking-[.16em] text-muted-foreground">
                Previous post
              </span>
              <span className="mt-1 block text-lg font-medium group-hover:text-accent">
                {prev.title}
              </span>
            </span>
          </Link>
        )}
        {next && (
          <Link
            to="/blogs/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-end gap-5 px-8 py-10 text-right md:px-16"
          >
            <span>
              <span className="block text-[11px] uppercase tracking-[.16em] text-muted-foreground">
                Next post
              </span>
              <span className="mt-1 block text-lg font-medium group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={22}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </section>

      <section
        className="relative bg-cover bg-center px-8 py-24 text-center md:px-16 md:py-32"
        style={{ backgroundImage: "url('/bg-3.jpg')" }}
      >
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Have a space you're planning to fit out?
          </p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-.02em]">
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
    </PageShell>
  );
}

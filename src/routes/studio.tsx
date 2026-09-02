import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — W.D.A. Architecture" },
      { name: "description", content: "Meet the people and principles behind W.D.A.'s influential residential spaces." },
      { property: "og:title", content: "The Studio — W.D.A. Architecture" },
      { property: "og:description", content: "Meet the people and principles behind W.D.A.'s influential residential spaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <PageShell>
      <section className="bg-primary text-primary-foreground">
        <SiteHeader inverse />
        <PageIntro eyebrow="The studio" title={<>Spaces with<br /><em className="font-display font-medium">a point of view.</em></>} image="/images/hero-alt.jpg">
          W.D.A. is an architecture and interior design studio creating places with a clear sense of identity. We work across disciplines, scales, and contexts to make spaces that feel inevitable.
        </PageIntro>
      </section>
      <section className="grid grid-cols-1 gap-16 px-8 py-24 md:grid-cols-12 md:px-16 md:py-36">
        <div className="md:col-span-4 md:col-start-2"><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Our point of view</p><h2 className="mt-7 text-6xl font-semibold leading-[.82] md:text-8xl">Design is<br /><em className="font-display font-medium">a daily ritual.</em></h2></div>
        <div className="space-y-10 md:col-span-4 md:col-start-8"><p className="text-lg leading-relaxed">The best rooms don’t ask for attention. They make room for life — for morning light, long dinners, quiet work, and the people who gather there.</p><p className="text-sm leading-relaxed text-muted-foreground">From first sketch to final finish, our studio brings architecture, interiors, and construction into one considered process. The result is a home that is generous, durable, and distinctly yours.</p><Link to="/contact" className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[.14em]">Work with us <ArrowUpRight size={16} /></Link></div>
      </section>
      <section className="bg-secondary px-8 py-24 md:px-16 md:py-32"><div className="mb-14 flex items-end justify-between border-b border-border pb-7"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Studio notes</p><h2 className="mt-5 text-6xl font-semibold leading-[.8] md:text-8xl">What guides<br /><em className="font-display font-medium">our work.</em></h2></div><ArrowDownRight className="hidden md:block" size={38} strokeWidth={1} /></div><div className="grid grid-cols-1 gap-10 md:grid-cols-3">{[["01", "Material honesty", "We choose materials for how they age, not just how they arrive."], ["02", "Human scale", "Every detail is measured against the rituals and rhythms of real life."], ["03", "Long-term thinking", "We design for the next decade, not the next season."]].map(([number, title, text]) => <article key={number} className="border-t border-border pt-5"><span className="text-xs text-accent">{number}</span><h3 className="mt-10 font-display text-4xl italic">{title}</h3><p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></section>
      <SiteFooter />
    </PageShell>
  );
}
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { advantages, approvals, sectors } from "@/lib/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Essential Decor — Interior Fit-Out, Design & Build in Dubai" },
      {
        name: "description",
        content:
          "Essential Decor LLC is a full-service interior fit-out, design and build company transforming commercial visions into completed spaces across Dubai and the UAE since 2012.",
      },
      { property: "og:title", content: "About Essential Decor" },
      {
        property: "og:description",
        content:
          "Design-led. Function-focused. Future-ready. Building commercial interiors in Dubai since 2012.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="bg-primary text-primary-foreground">
        <SiteHeader inverse />
        <PageIntro
          eyebrow="About"
          title={
            <>
              Commercial visions,
              <br />
              <em className="font-display font-medium">completed spaces.</em>
            </>
          }
          image="/images/hero-alt.jpg"
        >
          Essential Decor LLC is a full-service interior fit-out, design and build company. We
          transform commercial visions into completed spaces — managing design, procurement,
          approvals coordination, construction, installation and handover through one accountable
          process.
        </PageIntro>
      </section>

      <section className="grid grid-cols-1 gap-16 px-8 py-24 md:grid-cols-12 md:px-16 md:py-36">
        <Reveal className="md:col-span-4 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Our position
          </p>
          <h2 className="mt-7 text-4xl font-semibold leading-[.9] md:text-6xl">
            Design-led.
            <br />
            Function-focused.
            <br />
            <em className="font-display font-medium">Future-ready.</em>
          </h2>
        </Reveal>
        <Reveal delay={140} className="space-y-8 md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed">
            We create commercial spaces where design, function and business purpose align — spaces
            that look considered, work hard, and hold up as the business around them changes.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Working alongside in-house design and engineering, we deliver everything from
            partitions, ceilings and flooring to joinery, MEP systems, structured cabling and
            acoustics — with a single team accountable from first drawing to final handover.
          </p>
          <div className="flex items-end gap-6 border-t border-border pt-6">
            <span className="font-display text-5xl leading-none">2012</span>
            <span className="pb-1 text-xs uppercase tracking-[.16em] text-muted-foreground">
              Building commercial
              <br />
              interiors in Dubai
            </span>
          </div>
        </Reveal>
      </section>

      <section className="bg-secondary px-8 py-24 md:px-16 md:py-32">
        <Reveal className="mb-14 flex items-end justify-between border-b border-border pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
              Our advantages
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[.82] md:text-7xl">
              Why clients
              <br />
              <em className="font-display font-medium">choose us.</em>
            </h2>
          </div>
          <ArrowDownRight className="hidden md:block" size={38} strokeWidth={1} />
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {advantages.map((item, i) => (
            <Reveal
              as="article"
              key={item.number}
              delay={i * 100}
              className="border-t border-border pt-5"
            >
              <span className="text-xs text-accent">{item.number}</span>
              <h3 className="mt-6 text-base font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-8 py-24 md:px-16 md:py-36">
        <Reveal className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Sectors we serve
          </p>
          <h2 className="mt-5 text-5xl font-semibold leading-[.82] md:text-7xl">
            Delivering excellence
            <br />
            <em className="font-display font-medium">across every sector.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {sectors.map((sector, i) => (
            <Reveal
              key={sector.title}
              delay={i * 90}
              className="flex gap-6 border-t border-border pt-6"
            >
              <span className="font-display text-3xl italic text-accent">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-medium">{sector.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {sector.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:col-start-2">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
              Trade licence & approvals
            </p>
          </Reveal>
          <Reveal delay={140} className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed">
              Registered and approved to undertake interior fit-out, design and related commercial
              works across Dubai and the UAE.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-primary-foreground/20 pt-6 text-xs font-semibold uppercase tracking-[.14em] text-primary-foreground/70">
              {approvals.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <Link
              to="/contact"
              className="link-underline mt-10 inline-flex items-center gap-3 border-b border-primary-foreground pb-2 text-xs font-semibold uppercase tracking-[.14em]"
            >
              Work with us <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </PageShell>
  );
}

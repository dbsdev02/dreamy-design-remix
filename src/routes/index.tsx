import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CountUp,
  Marquee,
  Reveal,
  RevealWords,
  ScrollProgress,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { advantages, approvals, capabilities, sectors, stats, testimonials } from "@/lib/portfolio";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interior Fit-Out, Design & Build in Dubai | Essential Decor LLC" },
      {
        name: "description",
        content:
          "Essential Decor LLC delivers commercial interior fit-out, design and build across Dubai and the UAE — one accountable process from concept to handover. Since 2012, 145+ projects.",
      },
      {
        property: "og:title",
        content: "Interior Fit-Out, Design & Build in Dubai | Essential Decor LLC",
      },
      {
        property: "og:description",
        content:
          "Creating commercial spaces where design, function and business purpose align. Design-led, function-focused, future-ready.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = (getProject("averyx-group-office") ?? projects[0])!;

const expertise = [
  {
    number: "01",
    title: "Interior Fit-out",
    text: "High-quality interior fit-out that turns design concepts into fully functional spaces. Working closely with architects, designers and project managers, we deliver partitions, ceilings, flooring, high-quality furnishings and MEP (mechanical, electrical and plumbing) systems.",
  },
  {
    number: "02",
    title: "Design & Build",
    text: "A fully integrated approach to project delivery under a single turnkey contract. Consolidating the technical design and construction phases simplifies the process — you focus on the vision while we handle the rest.",
  },
];

function Index() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="animate-page-in overflow-hidden bg-background">
      <ScrollProgress />

      <section className="relative mx-3 mt-3 min-h-[calc(100svh-24px)] overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 animate-slow-zoom bg-[url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="absolute inset-0 grid-lines opacity-35" />
        <SiteHeader inverse />
        <div className="relative z-10 flex min-h-[calc(100svh-150px)] flex-col justify-end px-7 pb-12 md:px-10 md:pb-16">
          <p className="animate-rise-in mb-6 text-xs font-semibold uppercase tracking-[.2em] text-primary-foreground/60">
            Design-led · Function-focused · Future-ready
          </p>
          <h1 className="max-w-[900px] text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[.98] tracking-[-0.02em]">
            <RevealWords text="Commercial spaces where" step={80} />{" "}
            <RevealWords
              text="design, function and business purpose"
              className="font-display font-medium italic"
              delay={260}
              step={70}
            />{" "}
            <RevealWords text="align." delay={720} />
          </h1>
          <Reveal
            className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70"
            delay={600}
          >
            Interior fit-out, design and build — managed through one accountable process, from
            concept and approvals to construction, installation and handover.
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 bg-primary-foreground px-7 text-xs font-semibold uppercase tracking-[.14em] text-primary transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start the conversation <ArrowUpRight size={15} />
            </Link>
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex h-12 items-center gap-2 border border-primary-foreground/40 px-7 text-xs font-semibold uppercase tracking-[.14em] transition-colors hover:bg-primary-foreground/10"
            >
              See our work
            </button>
          </div>
          <button
            onClick={() => scrollTo("intro")}
            className="animate-rise-in mt-12 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-primary-foreground/60"
            style={{ animationDelay: "1s" }}
          >
            <ArrowDownRight className="animate-bob" size={18} /> Scroll to explore
          </button>
        </div>
      </section>

      <section
        id="intro"
        className="grid-lines grid grid-cols-1 gap-10 px-8 py-28 md:grid-cols-12 md:px-16 md:py-40"
      >
        <Reveal className="md:col-span-8 md:col-start-3">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            About Essential Decor
          </p>
          <p className="mt-8 text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.3] tracking-[-.01em]">
            Essential Decor LLC is a full-service interior fit-out, design and build company. We
            transform commercial visions into completed spaces — managing design, procurement,
            approvals coordination, construction, installation and handover through one accountable
            process.
          </p>
          <Link
            to="/about"
            className="link-underline mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]"
          >
            More about us <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-border bg-secondary px-8 py-16 md:px-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[.8]">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  plain={stat.plain}
                  duration={stat.plain ? 1200 : 1600}
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[.14em] text-muted-foreground">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="px-8 py-24 md:px-16 md:py-36">
        <Reveal className="mb-20 flex items-end justify-between border-b border-border pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
              Our expertise
            </p>
            <h2 className="mt-5 text-[clamp(3rem,6vw,7rem)] font-semibold leading-[.82] tracking-[-.04em]">
              Fit-out, design <em className="font-display font-medium">&amp; build.</em>
            </h2>
          </div>
          <ArrowDownRight className="hidden md:block" size={38} strokeWidth={1} />
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {expertise.map((item, i) => (
            <Reveal key={item.number} delay={i * 120} className="border-t border-border pt-6">
              <span className="text-xs text-accent">{item.number}</span>
              <h3 className="mt-6 font-display text-4xl italic">{item.title}</h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <Link
            to="/services"
            className="link-underline inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]"
          >
            Full-spectrum capabilities <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-border bg-secondary py-10">
        <Marquee speed={42}>
          {capabilities.map((item) => (
            <span
              key={item}
              className="mx-6 inline-flex items-center gap-6 font-display text-2xl italic md:text-4xl"
            >
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="px-8 py-24 md:px-16 md:py-36">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Sectors we serve
          </p>
          <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[.84] tracking-[-.03em]">
            Delivering excellence <em className="font-display font-medium">across every sector.</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Tailored interior fit-out, design and build solutions for commercial, hospitality,
            wellness, healthcare and institutional environments across Dubai.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {sectors.map((sector, i) => (
            <Reveal key={sector.title} delay={i * 100} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={sector.image}
                  alt={sector.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-lg font-medium">{sector.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-12 bg-secondary px-8 py-24 md:grid-cols-12 md:px-16 md:py-36">
        <Reveal className="md:col-span-4 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Featured project
          </p>
          <h2 className="mt-6 text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[.88] tracking-[-.03em]">
            {featured.name}
          </h2>
          <p className="mt-3 text-xs uppercase tracking-[.16em] text-muted-foreground">
            {featured.location} · {featured.year}
          </p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {featured.blurb}
          </p>
          <Link
            to="/projects/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]"
          >
            View the project{" "}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </Reveal>
        <Reveal
          delay={140}
          className="group relative aspect-[1.1] overflow-hidden md:col-span-6 md:col-start-7"
        >
          <Link
            to="/projects/$slug"
            params={{ slug: featured.slug }}
            className="block h-full w-full"
          >
            <img
              src={featured.cover}
              alt={featured.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </Link>
        </Reveal>
      </section>

      <section className="px-8 py-24 md:px-16 md:py-36">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Our advantages
          </p>
          <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[.84] tracking-[-.03em]">
            Why clients <em className="font-display font-medium">choose us.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-5">
          {advantages.map((item, i) => (
            <Reveal key={item.number} delay={i * 90}>
              <span className="text-xs text-accent">{item.number}</span>
              <h3 className="mt-5 text-base font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-36">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Client feedback
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-primary-foreground/20 pt-12 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 150}>
              <p className="font-display text-2xl italic leading-snug md:text-[1.7rem]">
                “{item.quote}”
              </p>
              <p className="mt-8 text-xs uppercase tracking-[.16em] text-primary-foreground/60">
                — {item.name}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-8 py-16 md:px-16 md:py-20">
        <Reveal className="border-y border-border py-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Registered and approved to undertake interior fit-out, design and related commercial
            works across Dubai and the UAE.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[.14em] text-foreground/70">
            {approvals.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="grid-lines px-8 py-28 md:px-16 md:py-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Let’s work together
          </p>
          <h2 className="mt-7 text-[clamp(2.8rem,6.5vw,6.5rem)] font-semibold leading-[.84] tracking-[-.04em]">
            Create your
            <br />
            <em className="font-display font-medium">dream property.</em>
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Tell us what the space needs to do — we’ll come back within 48 hours.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex h-12 items-center gap-2 bg-primary px-8 text-xs font-semibold uppercase tracking-[.14em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start the conversation <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

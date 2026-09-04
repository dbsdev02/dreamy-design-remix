import { ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { approach, capabilities } from "@/lib/portfolio";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Essential Decor — Interior Fit-Out & Design and Build" },
      {
        name: "description",
        content:
          "Comprehensive in-house design, engineering and delivery capabilities for commercial interiors across Dubai and the UAE — interior fit-out and design & build.",
      },
      { property: "og:title", content: "Services | Essential Decor" },
      {
        property: "og:description",
        content: "One team, every trade — interior fit-out and design & build, end to end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const leadServices = [
  {
    number: "01",
    title: "Interior Fit-out",
    text: "We deliver high-quality interior fit-out services, turning design concepts into fully functional spaces. Working closely with architects, designers and project managers, we provide comprehensive solutions including partitions, ceilings, flooring, high-quality furnishings and MEP (mechanical, electrical and plumbing) systems.",
  },
  {
    number: "02",
    title: "Design & Build",
    text: "We offer a fully integrated approach to project delivery under a single turnkey contract. This method simplifies the process by consolidating the technical design and construction phases, enabling you to focus on your vision while we handle the rest.",
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <SiteHeader />
        <PageIntro
          eyebrow="Services"
          title={
            <>
              Comprehensive, in-house,
              <br />
              <em className="font-display font-medium">end to end.</em>
            </>
          }
          image="/Projects/Averyx%20Group,%20TECOM/WORKSTATION%20VIEW.png"
        >
          Comprehensive in-house design, engineering and delivery capabilities for commercial
          interiors across Dubai and the UAE.
        </PageIntro>
      </section>

      <section className="px-8 py-24 md:px-16 md:py-36">
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {leadServices.map((item, i) => (
            <Reveal key={item.number} delay={i * 120} className="border-t border-border pt-6">
              <span className="text-xs text-accent">{item.number}</span>
              <h2 className="mt-6 font-display text-5xl italic">{item.title}</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary px-8 py-20 md:px-16 md:py-28">
        <Reveal className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Full-spectrum capabilities
          </p>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[.86] tracking-[-.03em]">
            One team, <em className="font-display font-medium">every trade.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <Reveal
              key={item}
              delay={(i % 3) * 80}
              className="flex items-center gap-4 border-b border-border py-6"
            >
              <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg font-medium">{item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-8 py-24 md:px-16 md:py-36">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Our approach
          </p>
          <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[.84] tracking-[-.03em]">
            How the work <em className="font-display font-medium">gets done.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-3">
          {approach.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 100}>
              <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[.9] tracking-[-.03em]">
            Not sure where
            <br />
            <em className="font-display font-medium">your project starts?</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-primary-foreground/60">
            Send us the brief — we’ll come back with a direction within 48 hours.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex h-12 items-center gap-2 bg-primary-foreground px-8 text-xs font-semibold uppercase tracking-[.14em] text-primary transition-transform duration-300 hover:-translate-y-0.5"
          >
            Tell us about the space <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </PageShell>
  );
}

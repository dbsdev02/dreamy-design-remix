import { ArrowUpRight, Plus } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, PageShell, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — W.D.A. Architecture" },
      { name: "description", content: "Architecture, interiors, and construction services for residential spaces with lasting character." },
      { property: "og:title", content: "Our Services — W.D.A. Architecture" },
      { property: "og:description", content: "Architecture, interiors, and construction services for residential spaces with lasting character." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  ["01", "Architecture", "From a first idea to a resolved building, we shape structure, light, and movement around the way you want to live."],
  ["02", "Interior design", "Material palettes, joinery, furniture, and the quiet details that turn a house into a home."],
  ["03", "Construction", "A hands-on, transparent build process that protects the design intent from the drawing board to the final key."],
];

function ServicesPage() {
  const [active, setActive] = useState(0);
  return <PageShell>
    <section className="bg-secondary"><SiteHeader /><PageIntro eyebrow="Our services" title={<>One studio.<br /><em className="font-display font-medium">Every detail.</em></>} image="/images/project-3.jpg">We bring the full life of a project together under one roof — architecture, interiors, and construction working as one continuous act of making.</PageIntro></section>
    <section className="px-8 py-24 md:px-16 md:py-36"><div className="grid grid-cols-1 gap-16 md:grid-cols-12"><div className="md:col-span-4 md:col-start-2"><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">How we help</p><h2 className="mt-7 text-6xl font-semibold leading-[.82] md:text-8xl">A clear path<br /><em className="font-display font-medium">forward.</em></h2></div><div className="md:col-span-5 md:col-start-8"><div className="divide-y divide-border border-y border-border">{services.map(([number, title, text], index) => <button key={number} onClick={() => setActive(index)} className="flex w-full items-start justify-between gap-8 py-7 text-left"><span><span className="mr-5 text-xs text-accent">{number}</span><span className="text-xl font-medium">{title}</span>{active === index && <span className="mt-5 block max-w-sm pl-9 text-sm leading-relaxed text-muted-foreground">{text}</span>}</span><Plus className={`mt-1 shrink-0 transition-transform ${active === index ? "rotate-45" : ""}`} size={20} /></button>)}</div><Link to="/contact" className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]">Discuss your project <ArrowUpRight size={16} /></Link></div></div></section>
    <section className="bg-primary px-8 py-24 text-primary-foreground md:px-16 md:py-32"><div className="grid grid-cols-1 gap-14 md:grid-cols-12"><div className="md:col-span-5 md:col-start-2"><p className="text-xs uppercase tracking-[.18em] text-accent">Our process</p><h2 className="mt-6 text-6xl font-semibold leading-[.82] md:text-8xl">From first<br /><em className="font-display font-medium">line to life.</em></h2></div><div className="md:col-span-4 md:col-start-8"><div className="space-y-8 border-t border-primary-foreground/20 pt-5">{[["01", "Listen", "Understanding the brief, the place, and the people who will inhabit it."], ["02", "Shape", "Testing ideas through drawings, materials, and conversations."], ["03", "Make", "Delivering every detail with care, clarity, and a steady hand."]].map(([number, title, text]) => <div key={number} className="border-b border-primary-foreground/20 pb-8"><span className="text-xs text-accent">{number}</span><h3 className="mt-3 font-display text-3xl italic">{title}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">{text}</p></div>)}</div></div></div></section>
    <SiteFooter />
  </PageShell>;
}
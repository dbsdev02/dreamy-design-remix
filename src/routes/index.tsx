import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "W.D.A. — Architecture & Interior Design" },
      { name: "description", content: "Influential residential spaces through architecture, interior design, and construction." },
      { property: "og:title", content: "W.D.A. — Architecture & Interior Design" },
      { property: "og:description", content: "Influential residential spaces through architecture, interior design, and construction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  { number: "01", title: "Influential", subtitle: "Interior Design.", description: "Interior design is the art and science of enhancing the interiors, sometimes including the exterior, of a space or building, to achieve a healthier and more aesthetically pleasing environment.", image: "/images/project-1.jpg" },
  { number: "02", title: "Historic", subtitle: "City Marks.", description: "We shape meaningful places by bringing together environmental stewardship, social equity, and economic viability into the creation of spaces with distinct beauty and identity.", image: "/images/project-2.jpg" },
  { number: "03", title: "Cafe —", subtitle: "Restaurant.", description: "We create interiors that feel considered, tactile, and enduring — spaces designed for the daily rituals that make a place feel like home.", image: "/images/project-5.jpg" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative mx-3 mt-3 min-h-[calc(100svh-24px)] overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 animate-slow-zoom bg-[url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="absolute inset-0 grid-lines opacity-35" />
        <header className="relative z-10 flex items-start justify-between px-7 py-6 md:px-10 md:py-7">
          <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-foreground/55 transition-colors hover:bg-primary-foreground hover:text-primary">
            <Menu size={20} strokeWidth={1.4} />
          </button>
          <div className="absolute left-24 top-7 text-[13px] font-bold uppercase leading-[1.05] tracking-[0.16em] md:left-28">W.D —<br />Architect</div>
          <nav id="primary-nav" className="hidden items-center gap-7 text-[13px] font-semibold md:flex">
            <button onClick={() => scrollTo("about")}><span className="mr-1 text-[9px] align-top">01</span> Home</button>
            <button onClick={() => scrollTo("about")}><span className="mr-1 text-[9px] align-top">02</span> The Studio</button>
            <button onClick={() => scrollTo("services")}><span className="mr-1 text-[9px] align-top">03</span> Our Services</button>
            <button onClick={() => scrollTo("projects")}><span className="mr-1 text-[9px] align-top">04</span> Projects <ChevronDown className="ml-1 inline" size={13} /></button>
            <button onClick={() => scrollTo("contact")}><span className="mr-1 text-[9px] align-top">05</span> Contact</button>
            <Button onClick={() => scrollTo("contact")} variant="secondary" className="ml-1 h-12 px-7 font-semibold">Contact Us</Button>
          </nav>
        </header>
        <div className="relative z-10 flex min-h-[calc(100svh-150px)] items-end px-7 pb-12 md:px-10 md:pb-16">
          <h1 className="max-w-[690px] animate-rise-in text-[clamp(2.2rem,4.3vw,4.55rem)] font-semibold leading-[.94] tracking-[-0.02em]">
            <em className="font-display font-medium">We build residential space</em> through a unique combination of engineering, construction and design.
          </h1>
        </div>
        {menuOpen && <div className="fixed inset-0 z-50 flex flex-col bg-primary px-8 py-7 text-primary-foreground md:px-16"><button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="self-end"><X size={28} /></button><nav className="mt-20 flex flex-col gap-7 text-4xl font-display italic md:text-6xl"><button className="text-left" onClick={() => scrollTo("about")}>The Studio</button><button className="text-left" onClick={() => scrollTo("services")}>Our Services</button><button className="text-left" onClick={() => scrollTo("projects")}>Projects</button><button className="text-left" onClick={() => scrollTo("contact")}>Contact</button></nav></div>}
      </section>

      <section id="about" className="grid-lines grid min-h-[720px] grid-cols-1 gap-10 px-8 py-28 md:grid-cols-12 md:px-16 md:py-40">
        <div className="md:col-span-4 md:col-start-3"><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Meet W-D-A</p><h2 className="mt-7 text-[clamp(3.8rem,7vw,8rem)] font-semibold leading-[.79] tracking-[-.04em]">Influential<br /><em className="font-display font-medium">and impactful.</em></h2></div>
        <div className="flex flex-col justify-end md:col-span-4 md:col-start-8"><p className="max-w-sm text-base leading-relaxed text-muted-foreground">Through a unique combination of engineering, construction and design disciplines, we deliver <strong className="font-semibold text-foreground">world class spaces</strong> to customers and communities across a broad range of sectors.</p><div className="mt-16 border-t border-border pt-5"><p className="text-[11px] uppercase tracking-[.16em] text-muted-foreground">Projects completed this year.</p><div className="mt-2 flex items-end gap-1 text-7xl font-display leading-none"><span>4</span><span>7</span><span>1</span></div></div></div>
      </section>

      <section id="services" className="bg-secondary px-8 py-24 md:px-16 md:py-36"><div className="grid grid-cols-1 gap-16 md:grid-cols-12"><div className="md:col-span-5 md:col-start-2"><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Our approach</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[.79] tracking-[-.04em]">Building the<br /><em className="font-display font-medium">future cities</em></h2></div><div className="md:col-span-4 md:col-start-8"><div className="divide-y divide-border border-y border-border">{["Building the future cities", "Unique and influential design", "Award-winning architecture"].map((item, index) => <button key={item} onClick={() => setActiveFaq(index)} className="flex w-full items-center justify-between py-6 text-left text-lg font-medium"><span>{item}</span>{activeFaq === index ? <ArrowUpRight size={20} /> : <Plus size={20} />}</button>)}</div><p className="mt-10 text-sm leading-relaxed text-muted-foreground">Many strands of place-making, environmental stewardship, social equity and economic viability come together in <strong className="text-foreground">the creation of places</strong> with distinct beauty and identity.</p></div></div><div className="mt-28 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-3">{["Concept Drawing", "Schematic Design", "Project Administration"].map((item, i) => <div key={item}><p className="font-display text-3xl italic">{item}</p><p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">Since the 1980s, as the complexity of buildings began to increase, the field of architecture became multi-disciplinary.</p><span className="mt-8 block text-xs text-accent">0{i + 1}</span></div>)}</div></section>

      <section id="projects" className="px-8 py-24 md:px-16 md:py-36"><div className="mb-20 flex items-end justify-between border-b border-border pb-7"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Selected work</p><h2 className="mt-5 text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[.8] tracking-[-.04em]">Our <em className="font-display font-medium">projects.</em></h2></div><ArrowDownRight className="hidden md:block" size={38} strokeWidth={1} /></div><div className="space-y-24">{projects.map((project, index) => <article key={project.number} className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 ${index % 2 ? "" : ""}`}><div className={`md:col-span-5 ${index % 2 ? "md:col-start-8 md:order-2" : "md:col-start-2"}`}><p className="text-xs text-accent">{project.number}</p><h3 className="mt-5 text-6xl font-semibold leading-[.8] tracking-[-.04em] md:text-8xl">{project.title}<br /><em className="font-display font-medium">{project.subtitle}</em></h3><p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">{project.description}</p><button onClick={() => scrollTo("contact")} className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]">Learn more <ArrowUpRight size={16} /></button></div><div className={`relative aspect-[.9] overflow-hidden md:col-span-5 ${index % 2 ? "md:col-start-2 md:row-start-1" : "md:col-start-8"}`}><img src={project.image} alt={`${project.title} ${project.subtitle} project`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div></article>)}</div></section>

      <section className="grid bg-primary px-8 py-24 text-primary-foreground md:grid-cols-12 md:px-16 md:py-32"><div className="md:col-span-4 md:col-start-2"><p className="text-xs uppercase tracking-[.18em] text-accent">Experience</p><div className="mt-10 flex items-end gap-2 text-8xl font-display leading-none"><span>30</span><span className="mb-2 text-4xl">+</span></div><p className="mt-6 max-w-[180px] text-sm leading-relaxed text-primary-foreground/60">Years of experience designing spaces with purpose.</p></div><div className="mt-16 md:col-span-4 md:col-start-8 md:mt-0"><div className="border-t border-primary-foreground/20 pt-5"><p className="text-[11px] uppercase tracking-[.16em] text-primary-foreground/60">International recognition</p><p className="mt-5 text-4xl font-display italic">Design that lasts beyond the moment.</p></div></div></section>

      <footer id="contact" className="grid-lines px-8 py-24 md:px-16 md:py-36"><div className="grid grid-cols-1 gap-16 md:grid-cols-12"><div className="md:col-span-6 md:col-start-2"><p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Start a project</p><h2 className="mt-6 text-[clamp(3.8rem,8vw,9rem)] font-semibold leading-[.78] tracking-[-.05em]">Let’s build<br /><em className="font-display font-medium">together.</em></h2></div><div className="md:col-span-3 md:col-start-9 md:pt-20"><p className="text-sm leading-relaxed text-muted-foreground">Tell us a little about your project and we’ll get back to you shortly.</p><a href="mailto:hello@wda.architect" className="mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold">hello@wda.architect <ArrowUpRight size={16} /></a></div></div><div className="mt-32 flex flex-col justify-between gap-7 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row"><span className="font-semibold uppercase tracking-[.16em] text-foreground">W.D — Architect</span><span>© 2026 W.D.A. All rights reserved.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2">Back to top <ArrowUpRight size={14} /></button></div></footer>
    </main>
  );
}
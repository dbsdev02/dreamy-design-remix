import { ArrowUpRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — W.D.A. Architecture" },
      { name: "description", content: "A selection of W.D.A. residential architecture and interior design projects." },
      { property: "og:title", content: "Projects — W.D.A. Architecture" },
      { property: "og:description", content: "A selection of W.D.A. residential architecture and interior design projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  ["01", "Influential", "Interior Design.", "/images/project-1.jpg", "A warm, tactile home shaped around light and collected objects."],
  ["02", "Historic", "City Marks.", "/images/project-2.jpg", "A sensitive renovation that gives an old structure a new rhythm."],
  ["03", "Cafe —", "Restaurant.", "/images/project-5.jpg", "An intimate hospitality space designed for lingering."],
  ["04", "Quiet", "House.", "/images/project-4.jpg", "A calm retreat where material and landscape meet."],
  ["05", "North", "Extension.", "/images/project-3.jpg", "A precise addition that opens a family home to its garden."],
];

function ProjectsPage() {
  return <PageShell><section className="bg-secondary"><SiteHeader /><PageIntro eyebrow="Selected work" title={<>Places that<br /><em className="font-display font-medium">stay with you.</em></>} image="/images/project-1.jpg">Every project begins with its own set of conditions. What connects them is a belief in thoughtful, enduring design and the power of a well-made place.</PageIntro></section><section className="space-y-28 px-8 py-24 md:px-16 md:py-36">{projects.map(([number, title, subtitle, image, description], index) => <article key={number} className="grid grid-cols-1 items-center gap-10 md:grid-cols-12"><div className={`md:col-span-5 ${index % 2 ? "md:col-start-8 md:order-2" : "md:col-start-2"}`}><p className="text-xs text-accent">{number}</p><h2 className="mt-5 text-6xl font-semibold leading-[.8] md:text-8xl">{title}<br /><em className="font-display font-medium">{subtitle}</em></h2><p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p><Link to="/contact" className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em]">Enquire about a project <ArrowUpRight size={16} /></Link></div><div className={`relative aspect-[.9] overflow-hidden md:col-span-5 ${index % 2 ? "md:col-start-2 md:row-start-1" : "md:col-start-8"}`}><img src={image} alt={`${title} ${subtitle}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div></article>)}</section><SiteFooter /></PageShell>;
}
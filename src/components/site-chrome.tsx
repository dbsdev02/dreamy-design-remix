import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { number: "01", label: "Home", to: "/" as const },
  { number: "02", label: "The Studio", to: "/studio" as const },
  { number: "03", label: "Our Services", to: "/services" as const },
  { number: "04", label: "Projects", to: "/projects" as const },
  { number: "05", label: "Contact", to: "/contact" as const },
];

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tone = inverse ? "text-primary-foreground" : "text-foreground";
  const border = inverse ? "border-primary-foreground/55" : "border-border";

  return (
    <header className={`relative z-20 flex items-start justify-between px-7 py-6 md:px-10 md:py-7 ${tone}`}>
      <Button
        aria-label="Open menu"
        variant="ghost"
        size="icon"
        onClick={() => setMenuOpen(true)}
        className={`h-14 w-14 rounded-full border ${border} hover:bg-primary hover:text-primary-foreground`}
      >
        <Menu size={20} strokeWidth={1.4} />
      </Button>
      <Link to="/" className="absolute left-24 top-7 text-[13px] font-bold uppercase leading-[1.05] tracking-[0.16em] md:left-28">
        W.D —<br />Architect
      </Link>
      <nav className="hidden items-center gap-7 text-[13px] font-semibold md:flex" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} activeProps={{ className: "text-accent" }}>
            <span className="mr-1 align-top text-[9px]">{item.number}</span> {item.label}
          </Link>
        ))}
        <Button asChild variant={inverse ? "secondary" : "default"} className="ml-1 h-12 px-7 font-semibold">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-primary px-8 py-7 text-primary-foreground md:px-16">
          <Button aria-label="Close menu" variant="ghost" size="icon" onClick={() => setMenuOpen(false)} className="self-end hover:bg-primary-foreground hover:text-primary">
            <X size={28} strokeWidth={1.4} />
          </Button>
          <nav className="mt-20 flex flex-col gap-7 text-4xl font-display italic md:text-6xl" aria-label="Mobile navigation">
            {navItems.slice(1).map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="text-left transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-left text-base font-sans not-italic uppercase tracking-[.16em] text-primary-foreground/60">
              Back to home
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="grid-lines border-t border-border px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Start a project</p>
          <h2 className="mt-6 text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[.8]">
            Let’s build<br /><em className="font-display font-medium">together.</em>
          </h2>
        </div>
        <div className="md:col-span-3 md:col-start-9 md:pt-16">
          <p className="text-sm leading-relaxed text-muted-foreground">Tell us a little about your project and we’ll get back to you shortly.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold">
            hello@wda.architect <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="mt-20 flex flex-col justify-between gap-7 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row">
        <Link to="/" className="font-semibold uppercase tracking-[.16em] text-foreground">W.D — Architect</Link>
        <span>© 2026 W.D.A. All rights reserved.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 text-left">Back to top <ArrowUpRight size={14} /></button>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children, image }: { eyebrow: string; title: ReactNode; children: ReactNode; image?: string }) {
  return (
    <section className="grid min-h-[520px] grid-cols-1 items-end gap-12 bg-secondary px-8 pb-16 pt-12 md:grid-cols-12 md:px-16 md:pb-24">
      <div className="md:col-span-7 md:col-start-2">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">{eyebrow}</p>
        <h1 className="mt-7 max-w-4xl text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.78] tracking-[-.04em]">{title}</h1>
      </div>
      {image && <div className="aspect-[1.15] overflow-hidden md:col-span-3 md:col-start-9"><img src={image} alt="Architectural interior detail" className="h-full w-full object-cover" /></div>}
      <div className="md:col-span-4 md:col-start-2"><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{children}</p></div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="overflow-hidden bg-background">{children}</main>;
}
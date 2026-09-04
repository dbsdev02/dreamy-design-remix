import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export { Button };

/**
 * Scroll-triggered reveal. Adds `is-visible` once the element enters the
 * viewport so the CSS in styles.css can animate it in. Honors
 * prefers-reduced-motion (the CSS falls back to no transform).
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  once = true,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
} & Record<string, unknown>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) setVisible(false);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Splits a string into words that rise in with a stagger. */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  step = 60,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`word-reveal ${visible ? "is-visible" : ""} ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word-reveal-line">
            <span
              className="word-reveal-inner"
              style={{ transitionDelay: `${delay + i * step}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/** Counts from 0 to `value` when scrolled into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  plain = false,
  duration = 1600,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  plain?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {plain ? display : display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Seamless infinite marquee. Duplicates children for the loop. */
export function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`} data-reverse={reverse || undefined}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        <div className="marquee-group" aria-hidden={false}>
          {children}
        </div>
        <div className="marquee-group" aria-hidden={true}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Thin scroll-progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden={true}>
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}

const navItems = [
  { number: "01", label: "Home", to: "/" as const },
  { number: "02", label: "About", to: "/about" as const },
  { number: "03", label: "Services", to: "/services" as const },
  { number: "04", label: "Projects", to: "/projects" as const },
  { number: "05", label: "Contact", to: "/contact" as const },
];

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tone = inverse ? "text-primary-foreground" : "text-foreground";
  const border = inverse ? "border-primary-foreground/55" : "border-border";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`animate-drop-in relative z-20 flex items-start justify-between px-7 py-6 md:px-10 md:py-7 ${tone}`}
    >
      <Button
        aria-label="Open menu"
        variant="ghost"
        size="icon"
        onClick={() => setMenuOpen(true)}
        className={`h-14 w-14 rounded-full border ${border} transition-transform duration-300 hover:scale-95 hover:bg-primary hover:text-primary-foreground`}
      >
        <Menu size={20} strokeWidth={1.4} />
      </Button>

      <Link
        to="/"
        aria-label="Essential Decor — home"
        className="absolute left-[88px] top-0 md:left-28"
      >
        <img
          src="/logo-ed.png"
          alt="Essential Decor LLC — Interior Fitout, Design & Build"
          className={`h-[68px] w-auto md:h-[92px] ${inverse ? "brightness-0 invert" : ""}`}
        />
      </Link>

      <nav
        className="hidden items-center gap-7 text-[13px] font-semibold md:flex"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{ className: "text-accent" }}
            className="link-underline"
          >
            <span className="mr-1 align-top text-[9px]">{item.number}</span> {item.label}
          </Link>
        ))}
        <Button
          asChild
          variant={inverse ? "secondary" : "default"}
          className="ml-1 h-12 px-7 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Link to="/contact">Start the conversation</Link>
        </Button>
      </nav>

      {menuOpen && (
        <div className="animate-menu-wipe fixed inset-0 z-50 flex min-h-screen flex-col bg-primary px-8 py-7 text-primary-foreground md:px-16">
          <div className="flex items-start justify-between">
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label="Essential Decor — home">
              <img
                src="/logo-ed.png"
                alt="Essential Decor LLC"
                className="h-16 w-auto brightness-0 invert md:h-20"
              />
            </Link>
            <Button
              aria-label="Close menu"
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(false)}
              className="transition-transform duration-300 hover:rotate-90 hover:bg-primary-foreground hover:text-primary"
            >
              <X size={28} strokeWidth={1.4} />
            </Button>
          </div>

          <nav
            className="mt-16 flex flex-col gap-6 font-display text-4xl italic md:mt-24 md:text-7xl"
            aria-label="Mobile navigation"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="animate-menu-item group flex items-baseline gap-4 text-left transition-colors hover:text-accent"
                style={{ animationDelay: `${180 + i * 70}ms` }}
              >
                <span className="font-sans text-sm not-italic tracking-[.2em] text-primary-foreground/40">
                  {item.number}
                </span>
                <span className="transition-transform duration-500 group-hover:translate-x-3">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="animate-menu-item mt-auto flex flex-wrap gap-x-10 gap-y-2 border-t border-primary-foreground/15 pt-7 text-xs uppercase tracking-[.16em] text-primary-foreground/60"
            style={{ animationDelay: "620ms" }}
          >
            <span>Al Jaddaf Avenue Building, Office 707, Dubai</span>
            <a href="tel:+971585209636" className="link-underline">
              +971 58 520 9636
            </a>
            <a href="mailto:info@essentialsfnd.com" className="link-underline">
              info@essentialsfnd.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="grid-lines border-t border-border px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Let’s work together
          </p>
          <h2 className="mt-6 text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[.8]">
            Create your
            <br />
            <em className="font-display font-medium">dream property.</em>
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:col-span-3 md:col-start-9 md:pt-16">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tell us what the space needs to do — we’ll come back within 48 hours.
          </p>
          <Link
            to="/contact"
            className="link-underline mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold"
          >
            Start the conversation <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-7 text-xs text-muted-foreground md:grid-cols-12">
        <Link to="/" aria-label="Essential Decor — home" className="md:col-span-3 md:col-start-2">
          <img
            src="/logo-ed.png"
            alt="Essential Decor LLC — Interior Fitout, Design & Build"
            className="h-24 w-auto"
          />
        </Link>
        <div className="md:col-span-3 md:pt-2">
          <p>Al Jaddaf Avenue Building</p>
          <p>Office 707, Dubai, UAE</p>
        </div>
        <div className="md:col-span-2">
          <a href="tel:+971585209636" className="link-underline block">
            +971 58 520 9636
          </a>
          <a href="mailto:info@essentialsfnd.com" className="link-underline block">
            info@essentialsfnd.com
          </a>
        </div>
        <div className="md:col-span-2">
          <p>Mon–Fri 8AM–6PM</p>
          <p>Sat 8AM–2PM</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-muted-foreground md:flex-row">
        <span>© 2026 Essential Decor. All rights reserved.</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-left transition-colors hover:text-foreground"
        >
          Back to top <ArrowUpRight size={14} />
        </button>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  image?: string;
}) {
  return (
    <section className="grid min-h-[520px] grid-cols-1 items-end gap-12 bg-secondary px-8 pb-16 pt-12 md:grid-cols-12 md:px-16 md:pb-24">
      <div className="md:col-span-7 md:col-start-2">
        <p className="animate-rise-in text-xs font-semibold uppercase tracking-[.18em] text-accent">
          {eyebrow}
        </p>
        <h1
          className="animate-rise-in mt-7 max-w-4xl text-[clamp(3rem,6.5vw,7rem)] font-semibold leading-[.85] tracking-[-.03em]"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
      </div>
      {image && (
        <div className="aspect-[1.15] overflow-hidden md:col-span-3 md:col-start-9">
          <img
            src={image}
            alt="Essential Decor interior fit-out detail"
            className="animate-slow-zoom h-full w-full object-cover"
          />
        </div>
      )}
      <Reveal delay={220} className="md:col-span-4 md:col-start-2">
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{children}</p>
      </Reveal>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="animate-page-in overflow-hidden bg-background">{children}</main>;
}

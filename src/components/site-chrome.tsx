import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Menu, X } from "lucide-react";
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

/** Full-bleed background slideshow — cross-fades through a set of images on a timer. */
export function HeroSlider({
  images,
  interval = 5500,
}: {
  images: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0" aria-hidden={true}>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <div
            className="animate-slow-zoom h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${encodeURI(src)}')` }}
          />
        </div>
      ))}
    </div>
  );
}

/** Inline WhatsApp glyph — lucide-react ships no brand icons. */
function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden={true}>
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.638 4.474 1.75 6.325L4 29l7.86-1.71A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.97 0-3.86-.53-5.51-1.53l-.395-.233-4.66 1.014 1.03-4.53-.256-.406A9.77 9.77 0 0 1 4.727 15c0-6.234 5.073-11.273 11.277-11.273 6.204 0 11.273 5.04 11.273 11.273 0 6.234-5.07 11.273-11.273 11.273Zm6.22-8.45c-.34-.17-2.01-.99-2.322-1.104-.312-.114-.54-.17-.767.17-.227.34-.878 1.104-1.077 1.33-.198.227-.396.256-.735.086-.34-.17-1.434-.528-2.732-1.685-1.01-.9-1.692-2.012-1.89-2.352-.198-.34-.021-.523.15-.692.154-.153.34-.397.51-.595.17-.198.227-.34.34-.567.113-.227.057-.425-.028-.595-.085-.17-.767-1.85-1.052-2.533-.277-.665-.56-.575-.767-.585l-.653-.012c-.227 0-.595.085-.907.425-.312.34-1.19 1.163-1.19 2.836 0 1.673 1.219 3.29 1.389 3.517.17.227 2.399 3.663 5.814 5.138.812.35 1.446.559 1.94.716.815.26 1.556.223 2.142.135.653-.098 2.01-.822 2.293-1.615.283-.793.283-1.472.198-1.615-.085-.142-.312-.227-.652-.397Z" />
    </svg>
  );
}

/** Fixed floating WhatsApp toggle button — present on every page. */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-rise-in w-72 rounded-2xl bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <WhatsAppIcon size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Essential Decor</p>
              <p className="text-[11px] text-white/80">Typically replies instantly</p>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="rounded-lg bg-[#f0f4f8] px-3 py-2.5 text-sm text-gray-700">
              Hi! 👋 How can we help you with your interior project?
            </div>
            <a
              href="https://wa.me/971585209636?text=Hi%2C%20I%27m%20interested%20in%20your%20interior%20fit-out%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={16} /> Start Chat
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle WhatsApp chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        {open ? <X size={22} strokeWidth={2} /> : <WhatsAppIcon />}
      </button>
    </div>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: "https://ae.linkedin.com/company/essential-decor-llc", icon: Linkedin },
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Essential-Decor-LLC-61578222913679/",
    icon: Facebook,
  },
  { label: "Instagram", href: "https://www.instagram.com/essentialdecorllc/", icon: Instagram },
];

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
  { number: "05", label: "Blogs", to: "/blogs" as const },
  { number: "06", label: "Contact", to: "/contact" as const },
];

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = inverse ? scrolled : true;
  const tone = solid ? "text-foreground" : "text-primary-foreground";
  const border = solid ? "border-border" : "border-primary-foreground/55";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!inverse) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [inverse]);

  return (
    <header
      className={`animate-drop-in ${inverse ? "fixed" : "sticky"} top-0 z-30 w-full flex items-start justify-between px-7 py-6 transition-colors duration-300 md:px-10 md:py-7 ${tone} ${
        solid ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
      }`}
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
        className="absolute left-[88px] top-1/2 -translate-y-1/2 md:left-28"
      >
        <img
          src="/logo-horizontal.png"
          alt="Essential Decor LLC — Interior Fitout, Design & Build"
          className={`h-8 w-auto md:h-11 ${solid ? "" : "brightness-0 invert"}`}
        />
      </Link>

      <nav
        className="hidden items-center gap-7 text-[15px] font-semibold md:flex"
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
      </nav>

      {menuOpen && (
        <div className="animate-menu-wipe fixed inset-0 z-50 flex min-h-screen flex-col bg-primary px-8 py-7 text-primary-foreground md:px-16">
          <div className="flex items-start justify-between">
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label="Essential Decor — home">
              <img
                src="/logo-horizontal.png"
                alt="Essential Decor LLC"
                className="h-9 w-auto brightness-0 invert md:h-12"
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

          <div className="mt-16 grid flex-1 grid-cols-1 gap-12 md:mt-24 md:grid-cols-12">
            <nav
              className="flex flex-col gap-6 font-display text-4xl italic md:col-span-7 md:text-7xl"
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
              className="animate-menu-item md:col-span-4 md:col-start-9 md:pt-4"
              style={{ animationDelay: "480ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary-foreground/50">
                Contact <span className="text-accent underline decoration-2 underline-offset-4">Info</span>
              </p>
              <div className="mt-5 space-y-2 text-sm">
                <p className="text-primary-foreground/70">2nd Floor, Aspin Tower, Sheikh Zayed Road, Dubai</p>
                <a href="tel:+971585209636" className="link-underline block">
                  UAE | +971 58 520 9636
                </a>
                <a href="mailto:info@essentialsfnd.com" className="link-underline block">
                  info@essentialsfnd.com
                </a>
              </div>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[.18em] text-primary-foreground/50">
                Social <span className="text-accent underline decoration-2 underline-offset-4">Media</span>
              </p>
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition-colors hover:border-primary-foreground hover:text-accent"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </a>
                ))}
                <a
                  href="https://wa.me/971585209636"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-[#25D366] transition-colors hover:border-primary-foreground"
                >
                  <WhatsAppIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="border-t border-border px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Let’s work together
          </p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.02]">
            Create your
            <br />
            <em className="font-display font-medium">dream property.</em>
          </h2>
        </Reveal>
        {showCta && (
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
        )}
      </div>

      <div className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-7 text-xs text-muted-foreground md:grid-cols-12">
        <Link to="/" aria-label="Essential Decor — home" className="md:col-span-3 md:col-start-2">
          <img
            src="/logo-horizontal.png"
            alt="Essential Decor LLC — Interior Fitout, Design & Build"
            className="h-9 w-auto md:h-11"
          />
        </Link>
        <div className="md:col-span-3 md:pt-2">
          <p>2nd Floor, Aspin Tower</p>
          <p>Sheikh Zayed Road, Dubai, UAE</p>
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

      <div className="mt-10 flex flex-col gap-6 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>© 2026 Essential Decor. All rights reserved.</span>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground hover:text-foreground"
            >
              <Icon size={15} strokeWidth={1.5} />
            </a>
          ))}
        </div>
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
    <section
      className="relative grid min-h-[520px] grid-cols-1 items-end gap-12 bg-secondary bg-cover bg-center px-8 pb-16 pt-12 md:grid-cols-12 md:px-16 md:pb-24"
      style={{ backgroundImage: "url('/bg-3.jpg')" }}
    >
      <div className="md:col-span-7 md:col-start-2">
        <p className="animate-rise-in text-xs font-semibold uppercase tracking-[.18em] text-accent">
          {eyebrow}
        </p>
        <h1
          className="animate-rise-in mt-7 max-w-3xl text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] tracking-[-.02em] text-foreground"
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
  return <main className="animate-page-in bg-background">{children}</main>;
}

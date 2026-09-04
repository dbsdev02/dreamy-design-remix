import { ArrowUpRight, Check } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro, PageShell, Reveal, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Essential Decor — Start Your Interior Fit-Out in Dubai" },
      {
        name: "description",
        content:
          "Tell Essential Decor about your commercial space. We come back within 48 hours to arrange an initial conversation about your interior fit-out, design or build project.",
      },
      { property: "og:title", content: "Contact Essential Decor" },
      {
        property: "og:description",
        content: "Let’s work together to create your dream property.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const details: [string, string, string?][] = [
  ["Phone", "+971 58 910 2341", "tel:+971589102341"],
  ["Email", "info@essentialsfnd.com", "mailto:info@essentialsfnd.com"],
  ["Direct", "sanjana@essentialsfnd.ae", "mailto:sanjana@essentialsfnd.ae"],
  ["Address", "Al Jaddaf Avenue Building, Office 707, Dubai, UAE"],
  ["Hours", "Mon–Fri 8AM–6PM · Sat 8AM–2PM"],
];

const inputClass =
  "mt-3 block w-full border-b border-border bg-transparent pb-3 text-base font-sans normal-case tracking-normal outline-none focus:border-accent";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="bg-primary text-primary-foreground">
        <SiteHeader inverse />
        <PageIntro
          eyebrow="Contact"
          title={
            <>
              Let’s work together to
              <br />
              <em className="font-display font-medium">create your dream property.</em>
            </>
          }
          image="/images/hero.jpg"
        >
          Tell us what the space needs to do, who’ll use it, and what’s non-negotiable. We’ll come
          back within 48 hours to arrange an initial conversation.
        </PageIntro>
      </section>

      <section className="grid grid-cols-1 gap-16 px-8 py-24 md:grid-cols-12 md:px-16 md:py-36">
        <Reveal className="md:col-span-4 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Contact details
          </p>
          <dl className="mt-8 space-y-8">
            {details.map(([label, value, href]) => (
              <div key={label} className="border-t border-border pt-4">
                <dt className="text-xs uppercase tracking-[.16em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 text-lg leading-snug">
                  {href ? (
                    <a href={href} className="link-underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="md:col-span-5 md:col-start-8">
          {sent ? (
            <div className="border-t border-border pt-6">
              <Check className="text-accent" size={28} strokeWidth={1.5} />
              <h2 className="mt-7 text-4xl font-semibold leading-[.9]">Got it.</h2>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Someone from the team will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[.14em]">
                  Your name
                  <input required name="name" className={inputClass} />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[.14em]">
                  Company (optional)
                  <input name="company" className={inputClass} />
                </label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[.14em]">
                What are we building?
                <select
                  required
                  name="type"
                  className={`${inputClass} appearance-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="commercial">Commercial / office</option>
                  <option value="hospitality">Hospitality / F&amp;B</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Wellness / healthcare</option>
                  <option value="institutional">Institutional</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[.14em]">
                A little about the space
                <textarea
                  required
                  name="message"
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[.14em]">
                Best way to reach you
                <input required name="reach" className={inputClass} />
              </label>
              <Button type="submit" className="h-12 px-7">
                Send it over <ArrowUpRight size={16} />
              </Button>
            </form>
          )}
        </Reveal>
      </section>

      <SiteFooter />
    </PageShell>
  );
}

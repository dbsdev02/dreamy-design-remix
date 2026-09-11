import { createFileRoute } from "@tanstack/react-router";
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

function ContactPage() {
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
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
            Find us
          </p>
          <div className="mt-8 aspect-[4/3] w-full overflow-hidden border border-border">
            <iframe
              title="Essential Decor LLC location"
              src="https://www.google.com/maps?q=Al+Jaddaf+Avenue+Building,+Dubai,+UAE&output=embed"
              className="h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      <SiteFooter showCta={false} />
    </PageShell>
  );
}

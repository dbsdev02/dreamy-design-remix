import { ArrowUpRight, Check } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro, PageShell, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — W.D.A. Architecture" },
      { name: "description", content: "Start a conversation with W.D.A. about your architecture or interior design project." },
      { property: "og:title", content: "Contact — W.D.A. Architecture" },
      { property: "og:description", content: "Start a conversation with W.D.A. about your architecture or interior design project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="bg-primary text-primary-foreground">
        <SiteHeader inverse />
        <PageIntro
          eyebrow="Start a project"
          title={<>Let’s build<br /><em className="font-display font-medium">together.</em></>}
          image="/images/hero.jpg"
        >
          Tell us a little about the place you’re imagining. We’ll get back to you shortly to arrange an initial conversation.
        </PageIntro>
      </section>
      <section className="grid grid-cols-1 gap-16 px-8 py-24 md:grid-cols-12 md:px-16 md:py-36">
        <div className="md:col-span-4 md:col-start-2">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">Say hello</p>
          <a href="mailto:hello@wda.architect" className="mt-7 block text-3xl font-display italic md:text-4xl">hello@wda.architect</a>
          <div className="mt-16 border-t border-border pt-5">
            <p className="text-xs uppercase tracking-[.16em] text-muted-foreground">Studio</p>
            <p className="mt-4 text-sm leading-relaxed">14 Whitworth Street<br />Manchester M1 3BY<br />United Kingdom</p>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {sent ? (
            <div className="border-t border-border pt-6">
              <Check className="text-accent" size={28} strokeWidth={1.5} />
              <h2 className="mt-7 text-5xl font-semibold leading-[.85]">Message<br /><em className="font-display font-medium">received.</em></h2>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">Thank you for getting in touch. A member of the studio will be in contact soon.</p>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[.14em]">Your name<input required name="name" className="mt-3 block w-full border-b border-border bg-transparent pb-3 text-base font-sans normal-case tracking-normal outline-none focus:border-accent" /></label>
                <label className="text-xs font-semibold uppercase tracking-[.14em]">Email address<input required type="email" name="email" className="mt-3 block w-full border-b border-border bg-transparent pb-3 text-base font-sans normal-case tracking-normal outline-none focus:border-accent" /></label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-[.14em]">Tell us about the project<textarea required name="message" rows={5} className="mt-3 block w-full resize-none border-b border-border bg-transparent pb-3 text-base font-sans normal-case tracking-normal outline-none focus:border-accent" /></label>
              <Button type="submit" className="h-12 px-7">Send enquiry <ArrowUpRight size={16} /></Button>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </PageShell>
  );
}
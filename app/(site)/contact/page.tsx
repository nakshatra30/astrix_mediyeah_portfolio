import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { SERVICES } from "@/data/services";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Astrix Mediyeah. Tell us what you're building and we'll reply within one working day.",
  alternates: { canonical: "/contact" },
};

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export default function ContactPage() {
  const details: ContactDetail[] = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: contact.phoneHref,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us directly",
      href: contact.whatsappHref,
      external: true,
    },
    {
      icon: MapPin,
      label: "Studio",
      value: contact.address,
    },
    {
      icon: Clock,
      label: "Hours",
      value: contact.hours,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title={
          <>
            Let&apos;s talk about
            <br />
            <span className="gradient-text">what&apos;s next.</span>
          </>
        }
        description="One short form, one honest reply. No automated sequences, no discovery-call theatre — you'll speak to a senior lead within one working day."
      />

      <Container className="grid gap-10 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          {details.map((detail, index) => (
            <Reveal key={detail.label} delay={index * 0.06}>
              <div className="glass-card flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-bright">
                  <detail.icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      target={detail.external ? "_blank" : undefined}
                      rel={detail.external ? "noopener noreferrer" : undefined}
                      className="mt-1 block break-words text-sm text-zinc-200 transition-colors hover:text-white"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.26}>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                What happens next
              </p>
              <ol className="mt-4 space-y-3">
                {[
                  "We read your enquiry personally and reply within one working day.",
                  "A 30-minute call to understand the business and the goal.",
                  "A clear proposal with scope, timeline and fixed pricing.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3 text-[13px] text-zinc-400">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neon/25 bg-neon/10 text-[10px] font-medium text-neon-bright">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex flex-wrap gap-2 pt-1">
              {contact.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ContactForm services={SERVICES.map((service) => service.title)} />
        </Reveal>
      </Container>
    </>
  );
}

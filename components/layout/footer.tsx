import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS } from "@/lib/constants";
import { FALLBACK_SERVICES } from "@/lib/fallback";

type FooterSettings = {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  socials: { label: string; href: string }[];
};

export function Footer({ settings }: { settings: FooterSettings }) {
  const year = new Date().getFullYear();
  const socials = settings.socials.filter((social) => social.href);

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-white/[0.07] bg-ink-soft/50">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.15),transparent)]"
        aria-hidden="true"
      />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo name={settings.name} />
            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              {settings.description}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-zinc-600">
              {settings.note}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {FALLBACK_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Start something
            </h3>
            <div className="mt-5 space-y-3 text-sm text-zinc-400">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neon-bright" />
                {settings.email}
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neon-bright" />
                {settings.phone}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-bright" />
                {settings.address}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-electric-bright"
            >
              Book an intro call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="surface-line mt-14" />

        <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-600">
            © {year} {settings.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-zinc-500 transition-colors hover:text-white"
              >
                {social.label}
              </a>
            ))}
            <Link
              href="/admin/login"
              className="text-xs text-zinc-700 transition-colors hover:text-zinc-400"
            >
              Admin
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

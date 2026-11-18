import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/settings";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");

  const [{ next }, settings] = await Promise.all([
    searchParams,
    getSiteSettings(),
  ]);

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-white/[0.07] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-neon/15 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-electric/10 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]"
          aria-hidden="true"
        />

        <div className="relative">
          <Logo name={settings["site.name"]} />
        </div>

        <div className="relative max-w-md">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Studio control room
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05]">
            Everything your site needs.
            <span className="mt-2 block gradient-text">
              Nothing you don&apos;t.
            </span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            Manage services, projects, testimonials, enquiries and every word of
            copy — all from one clean, fast dashboard.
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Protected by signed, httpOnly sessions and rate limiting.
          </div>
        </div>

        <div className="relative flex items-center justify-between text-[11px] text-zinc-600">
          <span>© {new Date().getFullYear()} {settings["site.name"]}</span>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-zinc-300"
          >
            View website <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo name={settings["site.name"]} />
          </div>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}

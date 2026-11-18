"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  FolderKanban,
  Images,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Quote,
  Settings,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn, getInitials } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Media", href: "/admin/media", icon: Images },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function pageTitle(pathname: string) {
  if (pathname === "/admin") return "Overview";
  const match = NAV.filter((item) => !item.exact).find((item) =>
    pathname.startsWith(item.href),
  );
  return match?.label ?? "Dashboard";
}

export function AdminShell({
  session,
  children,
}: {
  session: { name: string; email: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-6">
        <Link href="/admin" onClick={() => setMobileOpen(false)}>
          <Logo compact />
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-medium text-white lg:block">
            Admin
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-[linear-gradient(100deg,rgba(168,85,247,0.18),rgba(34,211,238,0.08))] text-white shadow-[inset_0_0_0_1px_rgba(168,85,247,0.25)]"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200",
              )}
            >
              <item.icon
                className={cn("h-4 w-4", active && "text-neon-bright")}
                strokeWidth={1.7}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/[0.07] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-200"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
          View website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-500 transition-colors hover:bg-red-500/[0.08] hover:text-red-300 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.7} />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>

        <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon/30 to-electric/20 text-[11px] font-semibold text-white">
            {getInitials(session.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium text-white">
              {session.name}
            </span>
            <span className="block truncate text-[10px] text-zinc-600">
              {session.email}
            </span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-white/[0.07] bg-ink-soft/60 backdrop-blur-xl lg:block">
        {sidebar}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] border-r border-white/10 bg-ink-soft">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/[0.07] bg-ink/80 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Dashboard
              </p>
              <h1 className="text-sm font-medium text-white">
                {pageTitle(pathname)}
              </h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            System online
          </span>
        </header>

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

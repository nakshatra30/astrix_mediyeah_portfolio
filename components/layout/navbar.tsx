"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label={`${siteName} home`}
        >
          <Logo name={siteName} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                isActive(link.href)
                  ? "text-white"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {isActive(link.href) ? (
                <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.05]" />
              ) : null}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/contact" size="sm" className="group">
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <ButtonLink href="/contact" size="lg" className="mt-4 w-full">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

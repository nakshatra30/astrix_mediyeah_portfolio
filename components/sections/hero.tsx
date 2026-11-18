"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, TrendingUp, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";

type HeroSettings = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  projects: number;
  clients: number;
  satisfaction: number;
};

const bars = [34, 48, 41, 62, 55, 74, 68, 88, 82, 96];

export function Hero({ settings }: { settings: HeroSettings }) {
  const reduce = useReducedMotion();

  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-dvh lg:pb-24 lg:pt-40">
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-neon/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-electric/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="flex flex-col items-start"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[11px] font-medium tracking-wide text-zinc-300 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {settings.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-balance text-[2.65rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.35rem] lg:leading-[0.98]"
          >
            {settings.title}
            <span className="mt-2 block gradient-text">{settings.highlight}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-[17px]"
          >
            {settings.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/contact" size="lg" className="group">
              {settings.primaryCta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/projects" size="lg" variant="secondary" className="group">
              <Play className="h-3.5 w-3.5 fill-current" />
              {settings.secondaryCta}
            </ButtonLink>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <Counter value={settings.projects} suffix="+" />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Projects shipped
              </p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <Counter value={settings.clients} suffix="+" />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Brands partnered
              </p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                <Counter value={settings.satisfaction} suffix="%" />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Client satisfaction
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div
            className="absolute inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.35),transparent)] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative aspect-square">
            <div className="absolute inset-[4%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-white/[0.09]" />

            <div className="absolute inset-[4%] animate-spin-slow">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_18px_5px_rgba(34,211,238,0.45)]" />
            </div>
            <div
              className="absolute inset-[12%] animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "34s" }}
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neon shadow-[0_0_16px_4px_rgba(168,85,247,0.5)]" />
            </div>

            <div className="absolute inset-[17%] flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.075),rgba(8,8,15,0.92)_45%)] p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-neon" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Astrix Growth OS
                  </span>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
                  Live
                </span>
              </div>

              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Brand momentum
                </p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-display text-4xl font-semibold text-white">
                    98.4
                  </span>
                  <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    <TrendingUp className="h-3 w-3" /> +18.6%
                  </span>
                </div>
              </div>

              <div className="mt-5 flex h-[88px] items-end gap-1.5">
                {bars.map((height, index) => (
                  <motion.span
                    key={index}
                    initial={reduce ? false : { height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,rgba(34,211,238,0.85),rgba(168,85,247,0.35))]"
                  />
                ))}
              </div>

              <div className="mt-auto space-y-2 border-t border-white/[0.06] pt-4">
                {[
                  { label: "Conversion rate", value: "6.8%" },
                  { label: "Organic reach", value: "412k" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="text-zinc-500">{row.label}</span>
                    <span className="font-medium text-zinc-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -right-2 top-[12%] hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-soft/90 px-3.5 py-3 shadow-xl backdrop-blur-md sm:flex"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-electric/10 text-electric-bright">
                <Zap className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                  Launch speed
                </span>
                <span className="block text-xs font-semibold text-white">
                  6 weeks
                </span>
              </span>
            </motion.div>

            <motion.div
              className="absolute -left-2 bottom-[16%] hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-soft/90 px-3.5 py-3 shadow-xl backdrop-blur-md sm:flex"
              animate={reduce ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-neon/10 text-neon-bright">
                <TrendingUp className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                  Avg. revenue lift
                </span>
                <span className="block text-xs font-semibold text-white">
                  +214%
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

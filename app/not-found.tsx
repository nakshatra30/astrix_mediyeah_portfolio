import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/[0.07] blur-[140px]" />

      <div className="relative w-full max-w-lg text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-10 text-[80px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[110px]">
          404
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-400">
          <Compass className="h-3.5 w-3.5 text-neon-bright" />
          Page not found
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
          That page has left orbit.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
          The link may be broken, or the page may have moved. Head back to
          familiar ground or start a conversation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonClasses()}>
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <Link href="/contact" className={buttonClasses({ variant: "secondary" })}>
            Start a project
          </Link>
        </div>
      </div>
    </main>
  );
}

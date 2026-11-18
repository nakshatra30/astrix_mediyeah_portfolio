const CLIENTS = [
  "NOCTURNE",
  "HELIX",
  "ORBIT",
  "VANTABLACK",
  "LUMEN",
  "KITE",
  "NOVA LABS",
  "STACKLINE",
];

export function LogoMarquee() {
  const row = [...CLIENTS, ...CLIENTS];

  return (
    <section
      className="relative border-y border-white/[0.06] bg-white/[0.012] py-8"
      aria-label="Selected clients"
    >
      <div className="mask-fade-x pause-on-hover overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-16 px-8">
          {row.map((client, index) => (
            <span
              key={`${client}-${index}`}
              className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.32em] text-zinc-600 transition-colors hover:text-zinc-300"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

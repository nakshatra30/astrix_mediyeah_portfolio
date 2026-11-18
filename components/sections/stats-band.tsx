import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/data/site";

export function StatsBand() {
  const items = [
    { value: stats.projects, suffix: "+", label: "Projects delivered" },
    { value: stats.clients, suffix: "+", label: "Brands partnered" },
    { value: stats.experience, suffix: "", label: "Years of craft" },
    { value: stats.satisfaction, suffix: "%", label: "Client satisfaction" },
  ];

  return (
    <section className="relative py-6">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(168,85,247,0.12),rgba(8,8,15,0.6)_45%,rgba(34,211,238,0.08))] px-6 py-10 backdrop-blur-xl sm:px-10">
            <div
              className="pointer-events-none absolute inset-0 bg-dots opacity-[0.35]"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
              {items.map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    <Counter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

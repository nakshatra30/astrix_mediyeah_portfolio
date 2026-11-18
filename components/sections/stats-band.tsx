import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export function StatsBand({
  projects,
  clients,
  experience,
  satisfaction,
}: {
  projects: number;
  clients: number;
  experience: number;
  satisfaction: number;
}) {
  const stats = [
    { value: projects, suffix: "+", label: "Projects delivered" },
    { value: clients, suffix: "+", label: "Brands partnered" },
    { value: experience, suffix: "", label: "Years of craft" },
    { value: satisfaction, suffix: "%", label: "Client satisfaction" },
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
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]">
                    {stat.label}
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

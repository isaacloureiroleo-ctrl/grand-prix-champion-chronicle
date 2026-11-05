import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { brazilDrivers, driverSlug } from "@/lib/brazilians";
import { useWikiBio } from "@/components/useWikiBio";
import { BrazilBadge } from "@/components/BrazilBadge";

export const Route = createFileRoute("/brasil_/$slug")({
  loader: ({ params }) => {
    const d = brazilDrivers.find((x) => driverSlug(x.name) === params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => {
    const n = loaderData?.name ?? "Piloto brasileiro";
    const desc = loaderData
      ? `${n} na Fórmula 1 (${loaderData.debut}–${loaderData.last}): equipes, corridas, vitórias, pódios e história.`
      : "Piloto brasileiro na Fórmula 1.";
    return {
      meta: [
        { title: `${n} — piloto brasileiro na F1` },
        { name: "description", content: desc },
        { property: "og:title", content: `${n} na Fórmula 1` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="p-10">
      Piloto não encontrado. <Link to="/brasil" className="text-primary">Voltar</Link>
    </main>
  ),
  component: DriverPage,
});

function DriverPage() {
  const d = Route.useLoaderData();
  const bio = useWikiBio(d.name);
  const idx = brazilDrivers.findIndex((x) => x.name === d.name);
  const prev = brazilDrivers[idx - 1];
  const next = brazilDrivers[idx + 1];
  const teams = d.teams.split("; ");
  const seasons = d.last - d.debut + 1;
  const winRate = d.starts ? ((d.wins / d.starts) * 100).toFixed(1) : "0";
  const podRate = d.starts ? ((d.podiums / d.starts) * 100).toFixed(1) : "0";

  const story: string[] = [];
  story.push(
    `${d.name} estreou na Fórmula 1 em ${d.debut}${d.last > d.debut ? ` e correu até ${d.last}, ao longo de ${seasons} temporadas` : ""}. Largou em ${d.starts} ${d.starts === 1 ? "Grande Prêmio" : "Grandes Prêmios"} e defendeu ${teams.length === 1 ? "uma equipe" : `${teams.length} equipes`}: ${teams.join(", ")}.`,
  );
  if (d.titles.length)
    story.push(
      `Foi campeão mundial ${d.titles.length === 1 ? "uma vez" : `${d.titles.length} vezes`}, em ${d.titles.join(", ")}, e está entre os maiores nomes da história do esporte.`,
    );
  if (d.wins)
    story.push(
      `Somou ${d.wins} ${d.wins === 1 ? "vitória" : "vitórias"} (${winRate}% das largadas), ${d.podiums} pódios (${podRate}%) e ${d.poles} pole positions, com ${d.points} pontos no total.`,
    );
  else if (d.podiums)
    story.push(
      `Não chegou a vencer, mas subiu ao pódio ${d.podiums} ${d.podiums === 1 ? "vez" : "vezes"}${d.poles ? ` e fez ${d.poles} pole${d.poles > 1 ? "s" : ""}` : ""}, somando ${d.points} pontos.`,
    );
  else
    story.push(
      d.points > 0
        ? `Não chegou ao pódio, mas marcou ${d.points} pontos na carreira.`
        : `Não chegou a marcar pontos no mundial.`,
    );
  if (d.last >= 2026) story.push(`Segue no grid na temporada atual.`);

  return (
    <main className="min-h-screen pb-24">
      <header className="stripe relative overflow-hidden border-b border-border px-6 py-12 md:py-16">
        <div className="relative mx-auto max-w-6xl pr-28">
          <Link to="/brasil" className="text-sm text-muted-foreground hover:text-primary">
            ← Pilotos do Brasil
          </Link>
          <p className="mt-6 font-display text-sm tracking-[0.3em] text-primary">
            {d.debut} — {d.last} · {d.titles.length ? `${d.titles.length}× CAMPEÃO MUNDIAL` : "PILOTO BRASILEIRO"}
          </p>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">{d.name.toUpperCase()}</h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.1fr_1fr]">
        <figure className="overflow-hidden rounded-sm border border-border bg-card">
          {bio === undefined ? (
            <div className="aspect-[4/5] animate-pulse bg-muted" />
          ) : bio?.image ? (
            <img src={bio.image} alt={d.name} className="max-h-[42rem] w-full object-contain" />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center p-8 text-center text-muted-foreground">
              Não há foto livre deste piloto na Wikipédia.
            </div>
          )}
          <figcaption className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            {bio?.image ? "Foto: Wikipédia / Wikimedia Commons" : d.name}
          </figcaption>
        </figure>

        <div>
          <div className="grid grid-cols-3 gap-4 border-b border-border pb-6">
            {[
              ["Corridas", d.starts],
              ["Vitórias", d.wins],
              ["Pódios", d.podiums],
              ["Poles", d.poles],
              ["Pontos", d.points],
              ["Títulos", d.titles.length],
            ].map(([l, v]) => (
              <div key={l}>
                <div className="font-display text-4xl text-primary">{v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-6 font-display text-3xl">A CARREIRA NA F1</h2>
          <div className="mt-3 space-y-4 text-lg leading-relaxed">
            {story.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>

          {d.titles.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {d.titles.map((y) => (
                <Link key={y} to="/temporada/$year" params={{ year: String(y) }}
                  className="rounded-sm border border-primary px-3 py-1 font-display text-xl text-primary hover:bg-primary hover:text-primary-foreground">
                  Temporada {y} →
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <h2 className="font-display text-3xl">EQUIPES</h2>
        <ol className="mt-4 grid gap-2 md:grid-cols-3">
          {teams.map((t) => (
            <li key={t} className="rounded-sm border border-border bg-card px-4 py-3 font-semibold">{t}</li>
          ))}
        </ol>
      </section>

      {bio?.extract && (
        <section className="mx-auto max-w-6xl px-6 pb-10">
          <h2 className="font-display text-3xl">BIOGRAFIA</h2>
          <div className="mt-3 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {bio.extract.split("\n").filter(Boolean).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a href={bio.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-primary">
            Texto da Wikipédia — ler mais ↗
          </a>
        </section>
      )}

      <nav className="mx-auto flex max-w-6xl justify-between gap-4 border-t border-border px-6 py-8">
        {prev ? (
          <Link to="/brasil/$slug" params={{ slug: driverSlug(prev.name) }} className="hover:text-primary">← {prev.name}</Link>
        ) : <span />}
        {next ? (
          <Link to="/brasil/$slug" params={{ slug: driverSlug(next.name) }} className="hover:text-primary">{next.name} →</Link>
        ) : <span />}
      </nav>
      <BrazilBadge />
    </main>
  );
}

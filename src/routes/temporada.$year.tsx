import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { champions } from "@/lib/champions";
import { Standings, useStandings } from "@/components/Standings";
import { useDriverPhoto } from "@/components/useDriverPhoto";
import { BrazilBadge } from "@/components/BrazilBadge";
import eraClassic from "@/assets/era-classic.jpg";
import eraRetro from "@/assets/era-retro.jpg";
import era2000s from "@/assets/era-2000s.jpg";
import eraModern from "@/assets/era-modern.jpg";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="font-display text-4xl text-primary">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export const Route = createFileRoute("/temporada/$year")({
  loader: ({ params }) => {
    const c = champions.find((x) => x.year === Number(params.year));
    if (!c) throw notFound();
    return c;
  },
  head: ({ params }) => ({
    meta: [
      { title: `Temporada ${params.year} da F1 — Campeão e classificação` },
      { name: "description", content: `Como foi o campeonato de Fórmula 1 de ${params.year}: campeão, equipe e tabela de pontos.` },
      { property: "og:title", content: `F1 ${params.year} — Campeão e classificação` },
      { property: "og:description", content: `Resumo e tabela completa da temporada ${params.year} da Fórmula 1.` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p>Temporada não encontrada.</p>
      <Link to="/" className="text-primary">← Voltar</Link>
    </main>
  ),
  component: Season,
});

function Season() {
  const c = Route.useLoaderData();
  const titles = champions.filter((x) => x.driver === c.driver);
  const nth = titles.findIndex((x) => x.year === c.year) + 1;
  const prev = champions.find((x) => x.year === c.year - 1);
  const next = champions.find((x) => x.year === c.year + 1);
  const { rows } = useStandings(c.year);
  const photo = useDriverPhoto(c.driver);
  const champ = rows?.[0];
  const vice = rows?.[1];
  const third = rows?.[2];
  const img = c.year < 1970 ? eraClassic : c.year < 1990 ? eraRetro : c.year < 2010 ? era2000s : eraModern;

  return (
    <main className="min-h-screen">
      <header className="stripe relative overflow-hidden border-b border-border px-6 py-16 md:py-24">
        <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[10rem] leading-none text-primary/10 md:text-[18rem]">
          {c.year}
        </div>
        <div className="relative mx-auto max-w-5xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Todos os campeões</Link>
          <p className="mt-6 font-display text-sm tracking-[0.3em] text-primary">TEMPORADA {c.year}</p>
          <h1 className="mt-2 font-display text-5xl leading-none md:text-8xl">{c.driver.toUpperCase()}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Campeão mundial pela {c.team} · {c.country}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-12">
        <figure className="overflow-hidden rounded-sm border border-border">
          {photo ? (
            <img src={photo} alt={c.driver} className="mx-auto max-h-[36rem] w-full bg-card object-contain" />
          ) : (
            <img src={img} alt={`Celebração do título de ${c.year}`} width={1600} height={912} className="aspect-[16/8] w-full object-cover" />
          )}
        </figure>
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {photo ? `${c.driver} · foto: Wikipédia / Wikimedia Commons` : "Ilustração · foto real indisponível"}
        </figcaption>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="font-display text-3xl">COMO FOI O CAMPEONATO</h2>
        {champ && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Pontos do campeão" value={champ.points} />
            <Stat label="Vitórias" value={champ.wins} />
            <Stat label="Vantagem p/ 2º" value={vice ? `${+(Number(champ.points) - Number(vice.points)).toFixed(1)}` : "—"} />
          </div>
        )}
        {champ && vice && (
          <p className="mt-6 max-w-3xl leading-relaxed">
            {c.driver} terminou {c.year} com {champ.points} pontos e {champ.wins} vitória{champ.wins === "1" ? "" : "s"}.
            {Number(champ.points) - Number(vice.points) <= 5
              ? ` Foi uma disputa apertadíssima: ${vice.name} ficou a apenas ${+(Number(champ.points) - Number(vice.points)).toFixed(1)} ponto(s) do título.`
              : Number(champ.points) - Number(vice.points) >= 40
                ? ` Foi uma temporada de domínio, com larga vantagem sobre o vice ${vice.name}.`
                : ` O vice-campeão foi ${vice.name}, ${+(Number(champ.points) - Number(vice.points)).toFixed(1)} pontos atrás.`}
            {third && ` ${third.name} completou o pódio do campeonato.`}
          </p>
        )}
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Em {c.year}, {c.driver} ({c.country}) conquistou o título mundial de pilotos correndo pela {c.team}.
          {titles.length === 1
            ? " Foi o único título da carreira dele."
            : ` Foi o ${nth}º de seus ${titles.length} títulos (${titles.map((t) => t.year).join(", ")}).`}
          {prev && prev.driver === c.driver && " Ele defendeu com sucesso a coroa do ano anterior."}
          {prev && prev.driver !== c.driver && ` Ele sucedeu ${prev.driver}, campeão em ${prev.year}.`}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="mb-6 font-display text-3xl">CLASSIFICAÇÃO FINAL</h2>
        <Standings year={c.year} />
      </section>

      <nav className="mx-auto flex max-w-5xl justify-between px-6 pb-20 font-display text-xl">
        {prev ? (
          <Link to="/temporada/$year" params={{ year: String(prev.year) }} className="hover:text-primary">← {prev.year}</Link>
        ) : <span />}
        {next ? (
          <Link to="/temporada/$year" params={{ year: String(next.year) }} className="hover:text-primary">{next.year} →</Link>
        ) : <span />}
      </nav>
    </main>
  );
}

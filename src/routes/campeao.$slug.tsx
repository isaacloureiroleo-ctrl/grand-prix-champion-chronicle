import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { champions, titleCounts } from "@/lib/champions";
import { driverSlug } from "@/lib/brazilians";
import { useWikiBio } from "@/components/useWikiBio";
import { BrazilBadge } from "@/components/BrazilBadge";

export const Route = createFileRoute("/campeao/$slug")({
  loader: ({ params }) => {
    const titles = champions
      .filter((c) => driverSlug(c.driver) === params.slug)
      .sort((a, b) => a.year - b.year);
    if (!titles.length) throw notFound();
    return { name: titles[0].driver, country: titles[0].country, titles };
  },
  head: ({ loaderData }) => {
    const n = loaderData?.name ?? "Campeão da F1";
    const desc = loaderData
      ? `${n}, campeão mundial de F1 em ${loaderData.titles.map((t) => t.year).join(", ")}: foto, biografia e títulos.`
      : "Campeão mundial de Fórmula 1.";
    return {
      meta: [
        { title: `${n} — campeão mundial de F1` },
        { name: "description", content: desc },
        { property: "og:title", content: `${n}, campeão de F1` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="p-10">
      Campeão não encontrado. <Link to="/" className="text-primary">Voltar</Link>
    </main>
  ),
  component: ChampionPage,
});

function ChampionPage() {
  const { name, country, titles } = Route.useLoaderData();
  const bio = useWikiBio(name);
  const ranking = titleCounts();
  const rank = ranking.findIndex(([n]) => n === name) + 1;
  const teams = [...new Set(titles.map((t) => t.team))];
  const years = titles.map((t) => t.year);
  const first = years[0];
  const last = years[years.length - 1];

  const story = [
    `${name} (${country}) foi campeão mundial de Fórmula 1 ${titles.length === 1 ? "uma vez" : `${titles.length} vezes`}${titles.length > 1 ? `, entre ${first} e ${last}` : `, em ${first}`}.`,
    `Conquistou ${titles.length === 1 ? "o título" : "os títulos"} pela${teams.length > 1 ? "s equipes" : ""} ${teams.join(", ")}.`,
    `É o ${rank}º colocado na lista de pilotos com mais títulos mundiais da história.`,
  ];

  const order = ranking.map(([n]) => n);
  const idx = order.indexOf(name);
  const prev = order[idx - 1];
  const next = order[idx + 1];

  return (
    <main className="min-h-screen pb-24">
      <header className="stripe relative overflow-hidden border-b border-border px-6 py-12 md:py-16">
        <div className="relative mx-auto max-w-6xl pr-28">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Todos os campeões
          </Link>
          <p className="mt-6 font-display text-sm tracking-[0.3em] text-primary">
            {titles.length}× CAMPEÃO MUNDIAL · {country.toUpperCase()}
          </p>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">{name.toUpperCase()}</h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.1fr_1fr]">
        <figure className="overflow-hidden rounded-sm border border-border bg-card">
          {bio === undefined ? (
            <div className="aspect-[4/5] animate-pulse bg-muted" />
          ) : bio?.image ? (
            <img src={bio.image} alt={name} className="max-h-[42rem] w-full object-contain" />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center p-8 text-center text-muted-foreground">
              Não há foto livre deste piloto na Wikipédia.
            </div>
          )}
          <figcaption className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            {bio?.image ? "Foto: Wikipédia / Wikimedia Commons" : name}
          </figcaption>
        </figure>

        <div>
          <div className="grid grid-cols-3 gap-4 border-b border-border pb-6">
            {[
              ["Títulos", titles.length],
              ["Primeiro", first],
              ["Último", last],
            ].map(([l, v]) => (
              <div key={l}>
                <div className="font-display text-4xl text-primary">{v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <h2 className="mt-6 font-display text-3xl">OS TÍTULOS</h2>
          <div className="mt-3 space-y-4 text-lg leading-relaxed">
            {story.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <div className="mt-5 grid gap-2">
            {titles.map((t) => (
              <Link
                key={t.year}
                to="/temporada/$year"
                params={{ year: String(t.year) }}
                className="flex items-center justify-between rounded-sm border border-border bg-card px-4 py-3 hover:border-primary"
              >
                <span className="font-display text-2xl text-primary">{t.year}</span>
                <span className="text-sm text-muted-foreground">{t.team} · ver temporada →</span>
              </Link>
            ))}
          </div>
        </div>
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
          <Link to="/campeao/$slug" params={{ slug: driverSlug(prev) }} className="hover:text-primary">← {prev}</Link>
        ) : <span />}
        {next ? (
          <Link to="/campeao/$slug" params={{ slug: driverSlug(next) }} className="hover:text-primary">{next} →</Link>
        ) : <span />}
      </nav>
      <BrazilBadge />
    </main>
  );
}

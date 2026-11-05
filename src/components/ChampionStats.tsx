import { Link } from "@tanstack/react-router";
import { championStats, type CareerStats } from "@/lib/championStats";
import { champions, titleCounts } from "@/lib/champions";
import { driverSlug } from "@/lib/brazilians";

const entries = Object.entries(championStats);

function leader(key: keyof CareerStats) {
  return [...entries].sort((a, b) => b[1][key] - a[1][key]).slice(0, 5);
}

const boards: { key: keyof CareerStats; title: string; unit: string }[] = [
  { key: "points", title: "Mais pontos", unit: "pts" },
  { key: "wins", title: "Mais vitórias", unit: "vitórias" },
  { key: "poles", title: "Mais poles", unit: "poles" },
  { key: "podiums", title: "Mais pódios", unit: "pódios" },
  { key: "starts", title: "Mais corridas", unit: "corridas" },
];

function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}

export function ChampionStats() {
  const rate = [...entries]
    .filter(([, s]) => s.starts >= 30)
    .sort((a, b) => b[1].wins / b[1].starts - a[1].wins / a[1].starts)
    .slice(0, 5);
  const teams = new Map<string, number>();
  for (const c of champions) for (const t of c.team.split(" / ")) teams.set(t, (teams.get(t) ?? 0) + 1);
  const topTeams = [...teams].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const countries = new Map<string, number>();
  for (const c of champions) countries.set(c.country, (countries.get(c.country) ?? 0) + 1);
  const topCountries = [...countries].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topTitles = titleCounts().slice(0, 5);

  const lists: { title: string; rows: [string, string][]; link?: boolean }[] = [
    ...boards.map((b) => ({
      title: b.title,
      link: true,
      rows: leader(b.key).map(([n, s]) => [n, `${fmt(s[b.key])} ${b.unit}`] as [string, string]),
    })),
    {
      title: "Mais títulos",
      link: true,
      rows: topTitles.map(([n, t]) => [n, `${t} títulos`] as [string, string]),
    },
    {
      title: "Melhor % de vitórias",
      link: true,
      rows: rate.map(([n, s]) => [n, `${((s.wins / s.starts) * 100).toFixed(1)}%`] as [string, string]),
    },
    { title: "Equipes com mais títulos", rows: topTeams.map(([t, n]) => [t, `${n} títulos`] as [string, string]) },
    { title: "Países com mais títulos", rows: topCountries.map(([t, n]) => [t, `${n} títulos`] as [string, string]) },
  ];

  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-16 pr-6 md:pr-32">
        <p className="font-display text-sm tracking-[0.3em] text-primary">NÚMEROS DOS CAMPEÕES</p>
        <h2 className="mt-2 font-display text-5xl md:text-6xl">ESTATÍSTICAS</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((l) => (
            <div key={l.title} className="rounded-sm border border-border bg-background p-5">
              <h3 className="font-display text-2xl">{l.title.toUpperCase()}</h3>
              <ol className="mt-3 space-y-2">
                {l.rows.map(([name, val], i) => (
                  <li key={name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="flex items-baseline gap-2">
                      <span className={`font-display text-xl ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{i + 1}</span>
                      {l.link ? (
                        <Link to="/campeao/$slug" params={{ slug: driverSlug(name) }} className={`hover:text-primary ${i === 0 ? "font-semibold" : ""}`}>{name}</Link>
                      ) : (
                        <span className={i === 0 ? "font-semibold" : ""}>{name}</span>
                      )}
                    </span>
                    <span className={i === 0 ? "font-semibold text-primary" : "text-muted-foreground"}>{val}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Comparação entre os {entries.length} campeões mundiais, com toda a carreira de cada um. Dados da base Ergast.
          Pontos somam só as corridas de domingo, sem sprints, pela pontuação de cada época. % de vitórias só para quem fez 30 corridas ou mais.
        </p>
      </div>
    </section>
  );
}

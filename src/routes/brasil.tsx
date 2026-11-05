import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { brazilDrivers, brazilTeams, brazilTotals } from "@/lib/brazilians";

export const Route = createFileRoute("/brasil")({
  head: () => ({
    meta: [
      { title: "Pilotos brasileiros na F1 — todos, com suas equipes" },
      {
        name: "description",
        content:
          "Todos os pilotos do Brasil que correram na Fórmula 1 desde 1950, com as equipes de cada um, vitórias, pódios e títulos.",
      },
      { property: "og:title", content: "Pilotos brasileiros na F1" },
      {
        property: "og:description",
        content: "Os 33 pilotos do Brasil na Fórmula 1 e as equipes que cada um defendeu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Brazil,
});

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Brazil() {
  const [q, setQ] = useState("");
  const needle = q.toLowerCase();
  const list = brazilDrivers.filter((d) => `${d.name} ${d.teams}`.toLowerCase().includes(needle));
  const champs = brazilDrivers.filter((d) => d.titles.length > 0);
  const teams = brazilTeams();
  const active = brazilDrivers.filter((d) => d.last >= 2026);

  return (
    <main className="min-h-screen pb-24">
      <header className="stripe relative overflow-hidden border-b border-border px-6 py-16 md:py-24">
        <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[9rem] leading-none text-primary/10 md:text-[16rem]">
          BR
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Todos os campeões
          </Link>
          <p className="mt-6 font-display text-sm tracking-[0.3em] text-primary">
            FÓRMULA 1 · 1950 — 2026
          </p>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-9xl">
            PILOTOS
            <br />
            <span className="text-primary">DO BRASIL</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Todo piloto brasileiro que largou em pelo menos uma corrida do mundial, com as equipes
            que cada um defendeu, ano a ano.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
            <Stat label="Pilotos" value={brazilTotals.drivers} />
            <Stat label="Títulos" value={brazilTotals.titles} />
            <Stat label="Vitórias" value={brazilTotals.wins} />
            <Stat label="Pódios" value={brazilTotals.podiums} />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl">CAMPEÕES DO MUNDO</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {champs.map((d) => (
            <div key={d.name} className="rounded-sm border border-border bg-card p-5">
              <div className="font-display text-4xl text-primary">{d.titles.length}×</div>
              <div className="mt-1 text-lg font-semibold">{d.name}</div>
              <div className="text-xs text-muted-foreground">
                {d.debut}–{d.last} · {d.wins} vitórias · {d.podiums} pódios
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {d.titles.map((y) => (
                  <Link
                    key={y}
                    to="/temporada/$year"
                    params={{ year: String(y) }}
                    className="rounded-sm border border-border px-2 py-1 font-display text-lg tracking-wider hover:border-primary hover:text-primary"
                  >
                    {y}
                  </Link>
                ))}
              </div>
              <div className="mt-3 text-sm text-muted-foreground">{d.teams}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 pr-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl">TODOS OS PILOTOS</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar piloto ou equipe…"
            className="w-full rounded-sm border border-input bg-card px-4 py-2 text-sm outline-none focus:border-primary md:w-80"
          />
        </div>

        <div className="mt-6 overflow-x-auto rounded-sm border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Piloto</th>
                <th className="px-3 py-2">Equipes</th>
                <th className="px-3 py-2 text-right">Corridas</th>
                <th className="px-3 py-2 text-right">Vitórias</th>
                <th className="px-3 py-2 text-right">Pódios</th>
                <th className="px-3 py-2 text-right">Poles</th>
                <th className="px-3 py-2 text-right">Pontos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((d) => (
                <tr key={d.name} className={d.titles.length ? "text-primary" : ""}>
                  <td className="px-3 py-3 align-top">
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {d.debut}–{d.last}
                      {d.titles.length ? ` · campeão ${d.titles.join(", ")}` : ""}
                      {d.last >= 2026 ? " · na temporada atual" : ""}
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-muted-foreground">{d.teams}</td>
                  <td className="px-3 py-3 text-right align-top">{d.starts}</td>
                  <td className="px-3 py-3 text-right align-top font-semibold">{d.wins}</td>
                  <td className="px-3 py-3 text-right align-top">{d.podiums}</td>
                  <td className="px-3 py-3 text-right align-top">{d.poles}</td>
                  <td className="px-3 py-3 text-right align-top">{d.points}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                    Nenhum piloto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Corridas = Grandes Prêmios largados. Pontos somados pela pontuação de cada época.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="font-display text-3xl">EQUIPES QUE TIVERAM BRASILEIROS</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {teams.map((t) => (
            <span
              key={t.team}
              className="rounded-sm border border-border bg-card px-3 py-2 text-sm"
              title={`${[...t.drivers].join(", ")}`}
            >
              <span className="font-semibold">{t.team}</span>{" "}
              <span className="text-muted-foreground">
                {t.from}–{t.to} · {t.drivers.size}{" "}
                {t.drivers.size === 1 ? "piloto" : "pilotos"}
              </span>
            </span>
          ))}
        </div>
      </section>

      {active.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="font-display text-3xl">NA TEMPORADA ATUAL</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {active.map((d) => (
              <div key={d.name} className="rounded-sm border border-primary/40 bg-card p-5">
                <div className="text-lg font-semibold">{d.name}</div>
                <div className="text-sm text-muted-foreground">{d.teams}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10 text-sm text-muted-foreground">
        <Link to="/" className="text-primary">
          ← Voltar para todos os campeões
        </Link>
        <p className="mt-3">
          Nomes, equipes, corridas, vitórias, pódios, poles e pontos coletados da base de
          estatísticas Ergast. Títulos conferidos com a lista de campeões do site.
        </p>
      </footer>
    </main>
  );
}

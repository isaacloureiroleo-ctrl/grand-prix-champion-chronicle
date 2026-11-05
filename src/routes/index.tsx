import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { champions, titleCounts } from "@/lib/champions";
import { driverSlug } from "@/lib/brazilians";
import { BrazilBadge } from "@/components/BrazilBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campeões da F1 — Todos os anos desde 1950" },
      { name: "description", content: "Lista completa dos campeões mundiais de Fórmula 1, de 1950 até hoje." },
      { property: "og:title", content: "Campeões da F1 — Todos os anos" },
      { property: "og:description", content: "Todos os campeões mundiais de Fórmula 1, ano a ano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const list = champions
    .filter((c) => `${c.year} ${c.driver} ${c.team} ${c.country}`.toLowerCase().includes(q.toLowerCase()))
    .reverse();
  const top = titleCounts().slice(0, 6);
  const latest = champions[champions.length - 1]!;

  return (
    <main className="min-h-screen">
      <header className="stripe relative overflow-hidden border-b border-border px-6 py-20 md:py-32">
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[16rem] leading-none text-primary/10 md:text-[24rem]">
          F1
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="font-display text-sm tracking-[0.3em] text-primary">FÓRMULA 1 · 1950 — 2024</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-9xl">
            CAMPEÕES
            <br />
            <span className="text-primary">DO MUNDO</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Mais de sete décadas de velocidade. Clique em qualquer temporada para ver a classificação completa daquele ano.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-border pt-6">
            <div>
              <div className="font-display text-4xl md:text-5xl">{champions.length}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Temporadas</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl">{titleCounts().length}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Campeões</div>
            </div>
            <div>
              <div className="font-display text-4xl text-primary md:text-5xl">{latest.driver.split(" ").pop()}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Atual · {latest.year}</div>
            </div>
          </div>
          <a href="#anos" className="mt-10 inline-block rounded-sm bg-primary px-6 py-3 font-display tracking-wider text-primary-foreground">
            VER TODOS OS ANOS →
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl">MAIORES CAMPEÕES</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {top.map(([name, n], i) => (
            <Link key={name} to="/campeao/$slug" params={{ slug: driverSlug(name) }} className="rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary">
              <div className="font-display text-5xl text-primary">{n}</div>
              <div className="text-sm font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">#{i + 1} em títulos · ver perfil →</div>
            </Link>
          ))}
        </div>
        <h3 className="mt-10 font-display text-2xl">TODOS OS CAMPEÕES</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {titleCounts().map(([name, n]) => (
            <Link key={name} to="/campeao/$slug" params={{ slug: driverSlug(name) }} className="rounded-sm border border-border bg-card px-3 py-2 text-sm hover:border-primary hover:text-primary">
              <span className="font-semibold">{name}</span> <span className="text-muted-foreground">{n}×</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="anos" className="mx-auto max-w-6xl px-6 pb-20 pr-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl">TODOS OS ANOS</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar piloto, equipe, país ou ano…"
            className="w-full rounded-sm border border-input bg-card px-4 py-2 text-sm outline-none focus:border-primary md:w-80"
          />
        </div>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {list.map((c) => (
            <li key={c.year}>
              <Link
                to="/temporada/$year"
                params={{ year: String(c.year) }}
                className="grid w-full grid-cols-[4.5rem_1fr_1.5rem] items-center gap-4 py-4 text-left transition-colors hover:bg-card md:grid-cols-[6rem_1fr_12rem_10rem_1.5rem]"
              >
                <span className="font-display text-3xl text-primary md:text-4xl">{c.year}</span>
                <div>
                  <div className="font-semibold">{c.driver}</div>
                  <div className="text-xs text-muted-foreground md:hidden">{c.team} · {c.country}</div>
                </div>
                <span className="hidden text-muted-foreground md:block">{c.team}</span>
                <span className="hidden text-right text-sm text-muted-foreground md:block">{c.country}</span>
                <span className="text-primary">→</span>
              </Link>
            </li>
          ))}
          {list.length === 0 && <li className="py-8 text-center text-muted-foreground">Nenhum resultado.</li>}
        </ul>
      </section>
      <BrazilBadge />
    </main>
  );
}

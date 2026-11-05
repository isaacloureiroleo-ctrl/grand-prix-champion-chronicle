import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { champions, titleCounts } from "@/lib/champions";

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

  return (
    <main className="min-h-screen">
      <header className="stripe border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm tracking-[0.3em] text-primary">FÓRMULA 1 · 1950 — 2024</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-8xl">
            CAMPEÕES <span className="text-primary">DO MUNDO</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {champions.length} temporadas, {titleCounts().length} pilotos campeões. Cada título, ano a ano.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl">MAIORES CAMPEÕES</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {top.map(([name, n], i) => (
            <div key={name} className="rounded-sm border border-border bg-card p-4">
              <div className="font-display text-5xl text-primary">{n}</div>
              <div className="text-sm font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">#{i + 1} em títulos</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
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
            <li key={c.year} className="group grid grid-cols-[4.5rem_1fr] items-center gap-4 py-4 transition-colors hover:bg-card md:grid-cols-[6rem_1fr_12rem_10rem]">
              <span className="font-display text-3xl text-primary md:text-4xl">{c.year}</span>
              <div>
                <div className="font-semibold">{c.driver}</div>
                <div className="text-xs text-muted-foreground md:hidden">{c.team} · {c.country}</div>
              </div>
              <span className="hidden text-muted-foreground md:block">{c.team}</span>
              <span className="hidden text-right text-sm text-muted-foreground md:block">{c.country}</span>
            </li>
          ))}
          {list.length === 0 && <li className="py-8 text-center text-muted-foreground">Nenhum resultado.</li>}
        </ul>
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { circuits, featuredLap } from "@/lib/circuits";
import { CircuitMap } from "@/components/CircuitMap";
import { BrazilBadge } from "@/components/BrazilBadge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/pistas")({
  head: () => ({ meta: [
    { title: "Pistas da F1 — circuitos históricos, traçados e melhores voltas" },
    { name: "description", content: "Todos os circuitos que receberam o Mundial de Fórmula 1 desde 1950, com imagens dos traçados, recordistas e melhores voltas em corrida." },
    { property: "og:title", content: "Pistas da F1 — a história em cada circuito" },
    { property: "og:description", content: "Explore os circuitos históricos da F1, seus traçados e melhores voltas registradas." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Tracks,
});

function Tracks() {
  const [query, setQuery] = useState("");
  const needle = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const list = circuits.filter(c => `${c.name} ${c.locality} ${c.countryLabel} ${c.gps.join(" ")}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(needle));
  const countries = new Set(circuits.map(c => c.country));
  return (
    <main className="min-h-screen pb-20">
      <header className="border-b border-border px-6 pb-10 pt-24 md:pb-14">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Todos os campeões</Link>
          <p className="mt-8 font-display text-sm text-primary">FÓRMULA 1 · DESDE 1950</p>
          <h1 className="mt-2 font-display text-7xl leading-none md:text-9xl">PISTAS <span className="text-primary">DA F1</span></h1>
          <div className="mt-8 flex flex-wrap gap-8 border-t border-border pt-5">
            <div><span className="font-display text-4xl">{circuits.length}</span><p className="text-xs uppercase text-muted-foreground">Circuitos históricos</p></div>
            <div><span className="font-display text-4xl">{countries.size}</span><p className="text-xs uppercase text-muted-foreground">Países e territórios</p></div>
            <div><span className="font-display text-4xl">1950–2026</span><p className="text-xs uppercase text-muted-foreground">Mundial de pilotos</p></div>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 pt-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl">TODOS OS CIRCUITOS <span className="text-muted-foreground">/ {list.length}</span></h2>
          <div className="relative w-full sm:w-80"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label="Buscar pista, GP ou país" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar pista, GP ou país…" className="bg-card pl-9" /></div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(c => {
            const lap = featuredLap(c);
            return <Link key={c.id} to="/pistas/$circuitId" params={{ circuitId: c.id }} className="group overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary">
              <CircuitMap circuit={c} />
              <div className="p-5">
                <p className="text-xs uppercase text-muted-foreground">{c.countryLabel} · {c.first}–{c.last}</p>
                <div className="mt-2 flex items-start justify-between gap-3"><h3 className="min-h-12 font-display text-2xl leading-tight">{c.name}</h3><ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" /></div>
                <div className="mt-4 border-t border-border pt-3"><p className="text-[11px] uppercase text-muted-foreground">{c.records.length ? "Recorde em corrida · por traçado" : c.reference ? "Melhor volta do último GP" : "Menor tempo disponível · corrida"}</p><p className="mt-1 font-display text-3xl text-primary">{lap?.time ?? "Não disponível"}</p><p className="text-sm">{lap?.driver}{lap ? ` · ${lap.year}` : ""}</p></div>
              </div>
            </Link>;
          })}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">Nenhuma pista encontrada.</p>}
      </section>
      <footer className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-6 text-xs leading-relaxed text-muted-foreground">
        <p>Circuitos e corridas: Jolpica / Ergast. Recordes e imagens dos traçados: Wikipédia / Wikimedia Commons. Consulta: 7 de novembro de 2026.</p>
        <p className="mt-2">Recordes são de corrida, não de classificação. Cada versão da pista tem seu próprio recorde. Quando não há recorde verificado, a melhor volta de um GP é identificada como tal. Inclui as 500 Milhas de Indianápolis que contaram para o Mundial de 1950 a 1960.</p>
      </footer>
      <BrazilBadge />
    </main>
  );
}
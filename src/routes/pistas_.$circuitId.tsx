import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Timer } from "lucide-react";
import { circuits, featuredLap } from "@/lib/circuits";
import { CircuitMap } from "@/components/CircuitMap";
import { BrazilBadge } from "@/components/BrazilBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pistas_/$circuitId")({
  loader: ({ params }) => {
    const circuit = circuits.find(c => c.id === params.circuitId);
    if (!circuit) throw notFound();
    return circuit;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Circuito não encontrado";
    const description = `${name} na Fórmula 1: imagem do traçado, melhores voltas em corrida, recordistas e história dos Grandes Prêmios.`;
    return { meta: [ { title: `${name} — traçado e melhores voltas na F1` }, { name: "description", content: description }, { property: "og:title", content: `${name} — Pistas da F1` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" } ] };
  },
  notFoundComponent: () => <main className="px-6 pt-24"><h1 className="font-display text-4xl">Pista não encontrada</h1><Link to="/pistas" className="mt-6 block text-primary">← Todas as pistas</Link></main>,
  component: CircuitPage,
});

function CircuitPage() {
  const c = Route.useLoaderData();
  const lap = featuredLap(c);
  const index = circuits.findIndex(x => x.id === c.id);
  const previous = circuits[index - 1];
  const next = circuits[index + 1];
  return (
    <main className="min-h-screen pb-20">
      <header className="border-b border-border px-6 pb-8 pt-24">
        <div className="mx-auto max-w-6xl">
          <Link to="/pistas" className="text-sm text-muted-foreground hover:text-primary">← Todas as pistas</Link>
          <p className="mt-7 font-display text-sm uppercase text-primary">{c.countryLabel} · {c.locality}</p>
          <h1 className="mt-2 max-w-4xl break-words font-display text-5xl leading-none md:text-7xl">{c.name}</h1>
          <div className="mt-7 flex flex-wrap gap-8"><div><p className="font-display text-3xl">{c.first}</p><p className="text-xs uppercase text-muted-foreground">Primeira corrida</p></div><div><p className="font-display text-3xl">{c.last}</p><p className="text-xs uppercase text-muted-foreground">Última corrida</p></div><div><p className="font-display text-3xl">{c.races}</p><p className="text-xs uppercase text-muted-foreground">Corridas no Mundial</p></div></div>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.3fr_1fr]">
        <figure className="min-w-0">
          <CircuitMap circuit={c} large />
          <figcaption className="mt-3 break-words text-xs leading-relaxed text-muted-foreground">
            <a href={c.imageSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{c.imageName}</a><br />{c.imageCredit} · {c.imageLicense}
          </figcaption>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Imagem de uma versão do circuito. O traçado mudou em algumas épocas; o mapa não representa necessariamente cada volta listada abaixo.{c.id === "long_beach" ? " O mapa mostra a configuração IndyCar atual, diferente da utilizada pela F1." : ""}{c.id === "indianapolis" ? " O mapa mostra o circuito misto; as 500 Milhas utilizavam o oval." : ""}</p>
        </figure>
        <div>
          <h2 className="flex items-center gap-3 font-display text-3xl"><Timer className="size-6 text-primary" />{c.records.length ? "RECORDE EM CORRIDA" : c.reference ? "MELHOR VOLTA DO ÚLTIMO GP" : "MENOR TEMPO DISPONÍVEL"}</h2>
          <p className="mt-5 font-display text-6xl text-primary">{lap?.time}</p><p className="mt-2 text-2xl font-semibold">{lap?.driver}</p><p className="mt-2 text-muted-foreground">{lap?.year}{lap && "layout" in lap ? ` · ${lap.layout}` : ""}</p>
          {lap && <a href={lap.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">Conferir a volta na fonte <ExternalLink className="size-4" /></a>}
          {!c.records.length && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Não há recorde por versão verificado nesta coleção. Este tempo é {c.reference ? "a melhor volta da última corrida do Mundial nesta pista" : "a menor melhor volta em corrida disponível na base Jolpica, que pode reunir traçados diferentes"}, não um recorde absoluto de toda a história.</p>}
          <div className="mt-8 border-t border-border pt-5"><h2 className="font-display text-2xl">A PISTA NO MUNDIAL</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.name}, em {c.locality}, {c.countryLabel}, recebeu {c.races} {c.races === 1 ? "corrida válida" : "corridas válidas"} pelo Mundial de pilotos. Sua primeira participação foi em {c.first}{c.first !== c.last ? `, e a mais recente registrada foi em ${c.last}` : ""}. Foram {c.years.length} {c.years.length === 1 ? "temporada" : "temporadas"} com provas neste circuito.</p><p className="mt-3 text-sm text-muted-foreground">Grandes Prêmios: {c.gps.join(" · ")}.</p><a href={c.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">História do circuito <ExternalLink className="size-4" /></a></div>
        </div>
      </section>
      {c.records.length > 1 && <section className="mx-auto max-w-6xl px-6 pb-10"><h2 className="font-display text-3xl">RECORDES POR VERSÃO DA PISTA</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.records.map((r,i) => <div key={i} className="rounded-sm border border-border bg-card p-5"><p className="text-xs text-muted-foreground">{r.layout}</p><p className="mt-3 font-display text-3xl text-primary">{r.time}</p><p className="mt-1 font-semibold">{r.driver}</p><p className="text-sm text-muted-foreground">{r.year}</p></div>)}</div></section>}
      {c.history.length > 0 && <section className="mx-auto max-w-6xl px-6 pb-10"><h2 className="font-display text-3xl">QUEM FEZ A MELHOR VOLTA EM CADA GP</h2><p className="mt-2 text-sm text-muted-foreground">Tempos em corrida disponíveis na Jolpica desde 2004. Não inclui classificação, treinos ou sprints.</p><div className="mt-5 overflow-x-auto border-y border-border"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-card text-xs uppercase text-muted-foreground"><tr><th className="p-3">Ano / GP</th><th className="p-3">Piloto</th><th className="p-3">Equipe</th><th className="p-3 text-right">Melhor volta</th></tr></thead><tbody className="divide-y divide-border">{c.history.map(r => <tr key={r.date}><td className="p-3"><span className="font-display text-2xl">{r.year}</span><p className="text-xs text-muted-foreground">{r.race}</p></td><td className="p-3 font-semibold">{r.driver}</td><td className="p-3 text-muted-foreground">{r.team}</td><td className="p-3 text-right font-semibold text-primary"><a href={r.source} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">{r.time}</a></td></tr>)}</tbody></table></div></section>}
      <section className="mx-auto max-w-6xl px-6 pb-10"><h2 className="font-display text-3xl">TEMPORADAS NESTA PISTA</h2><div className="mt-4 flex flex-wrap gap-2">{c.years.map(y => <span key={y} className="border-b border-border px-2 py-1 font-display text-xl text-muted-foreground">{y}</span>)}</div></section>
      <footer className="mx-auto max-w-6xl border-t border-border px-6 pt-6"><div className="flex flex-wrap justify-between gap-4">{previous ? <Button asChild variant="ghost"><Link to="/pistas/$circuitId" params={{ circuitId: previous.id }}><ArrowLeft />Pista anterior</Link></Button> : <span />}{next && <Button asChild variant="ghost"><Link to="/pistas/$circuitId" params={{ circuitId: next.id }}>Próxima pista<ArrowRight /></Link></Button>}</div><p className="mt-6 text-xs text-muted-foreground">Fontes: Jolpica / Ergast e Wikipédia / Wikimedia Commons. Consulta em 7 de novembro de 2026. Recordes dependem da configuração da pista.</p></footer>
      <BrazilBadge />
    </main>
  );
}
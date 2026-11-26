import { useState } from "react";
import { useStandings } from "@/components/Standings";

export function Season2026FloatingTable() {
  const [open, setOpen] = useState(false);
  const { rows, err } = useStandings(2026);

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <section className="mb-3 w-[min(92vw,420px)] max-h-[75vh] overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
          <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div>
              <h2 className="font-display text-xl">F1 · CLASSIFICAÇÃO 2026</h2>
              <p className="text-xs text-muted-foreground">Tabela de pilotos · pontos acumulados</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar tabela" className="rounded px-2 py-1 text-xl hover:bg-muted">×</button>
          </header>
          <div className="max-h-[calc(75vh-70px)] overflow-auto">
            {err ? <p className="p-4 text-sm text-muted-foreground">Não foi possível carregar a classificação.</p> : !rows ? <p className="p-4 text-sm text-muted-foreground">Carregando pontos…</p> : rows.length === 0 ? <p className="p-4 text-sm text-muted-foreground">A classificação de 2026 ainda não está disponível.</p> : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card text-xs uppercase text-muted-foreground">
                  <tr><th className="px-3 py-2 text-left">#</th><th className="px-3 py-2 text-left">Piloto</th><th className="px-2 py-2 text-left">Equipe</th><th className="px-3 py-2 text-right">Pts</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((r, i) => <tr key={r.name} className={i === 0 ? "font-semibold text-primary" : ""}>
                    <td className="px-3 py-2">{r.position}</td><td className="px-3 py-2 whitespace-nowrap">{r.name}</td><td className="px-2 py-2 text-xs text-muted-foreground">{r.team}</td><td className="px-3 py-2 text-right font-semibold tabular-nums">{r.points}</td>
                  </tr>)}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg transition hover:scale-105" aria-expanded={open}>
        <span aria-hidden="true">🏆</span><span>{open ? "Fechar tabela" : "Tabela 2026"}</span>
      </button>
    </div>
  );
}

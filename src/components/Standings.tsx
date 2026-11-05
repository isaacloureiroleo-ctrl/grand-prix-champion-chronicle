import { useEffect, useState } from "react";

type Row = { position: string; points: string; wins: string; name: string; team: string };

const cache = new Map<number, Row[]>();

export function useStandings(year: number) {
  const [rows, setRows] = useState<Row[] | null>(cache.get(year) ?? null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (cache.has(year)) return;
    fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings/?limit=100`)
      .then((r) => r.json())
      .then((d) => {
        const list = d?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
        const parsed: Row[] = list.map((s: any) => ({
          position: s.position ?? s.positionText,
          points: s.points,
          wins: s.wins,
          name: `${s.Driver.givenName} ${s.Driver.familyName}`,
          team: s.Constructors?.map((c: any) => c.name).join(" / ") ?? "",
        }));
        cache.set(year, parsed);
        setRows(parsed);
      })
      .catch(() => setErr(true));
  }, [year]);
  return { rows, err };
}

export function Standings({ year }: { year: number }) {
  const { rows, err } = useStandings(year);

  if (err) return <p className="py-4 text-sm text-muted-foreground">Não foi possível carregar a tabela.</p>;
  if (!rows) return <p className="py-4 text-sm text-muted-foreground">Carregando classificação de {year}…</p>;

  return (
    <div className="overflow-x-auto rounded-sm border border-border bg-background">
      <table className="w-full text-sm">
        <thead className="bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Pos</th>
            <th className="px-3 py-2">Piloto</th>
            <th className="px-3 py-2">Equipe</th>
            <th className="px-3 py-2 text-right">Vitórias</th>
            <th className="px-3 py-2 text-right">Pontos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className={i === 0 ? "text-primary font-semibold" : ""}>
              <td className="px-3 py-2 font-display text-lg">{r.position}</td>
              <td className="px-3 py-2">{r.name}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.team}</td>
              <td className="px-3 py-2 text-right">{r.wins}</td>
              <td className="px-3 py-2 text-right font-semibold">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

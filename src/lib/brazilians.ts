export type BrazilDriver = {
  name: string;
  debut: number;
  last: number;
  teams: string;
  starts: number;
  wins: number;
  podiums: number;
  poles: number;
  points: number;
  titles: number[];
};

// Pilotos com nacionalidade brasileira que largaram em ao menos uma corrida do
// mundial de F1 (1950-2026). Coletado da base de estatisticas Ergast.
export const brazilDrivers: BrazilDriver[] = [
  { name: "Ayrton Senna", debut: 1984, last: 1994, teams: "Toleman (1984–1984); Lotus (1985–1987); McLaren (1988–1993); Williams (1994–1994)", starts: 161, wins: 41, podiums: 80, poles: 65, points: 614.0, titles: [1988, 1990, 1991] },
  { name: "Nelson Piquet", debut: 1978, last: 1991, teams: "Brabham (1978–1985); Ensign (1978–1978); McLaren (1978–1978); Williams (1986–1987); Lotus (1988–1989); Benetton (1990–1991)", starts: 205, wins: 23, podiums: 60, poles: 24, points: 485.5, titles: [1981, 1983, 1987] },
  { name: "Emerson Fittipaldi", debut: 1970, last: 1980, teams: "Lotus (1970–1973); McLaren (1974–1975); Fittipaldi (1976–1980)", starts: 143, wins: 14, podiums: 35, poles: 6, points: 281.0, titles: [1972, 1974] },
  { name: "Rubens Barrichello", debut: 1993, last: 2011, teams: "Jordan (1993–1996); Stewart (1997–1999); Ferrari (2000–2005); Honda (2006–2008); Brawn (2009–2009); Williams (2010–2011)", starts: 326, wins: 11, podiums: 68, poles: 14, points: 658.0, titles: [] },
  { name: "Felipe Massa", debut: 2002, last: 2017, teams: "Sauber (2002–2005); Ferrari (2006–2013); Williams (2014–2017)", starts: 268, wins: 11, podiums: 41, poles: 16, points: 1167.0, titles: [] },
  { name: "Carlos Pace", debut: 1972, last: 1977, teams: "March (1972–1972); Surtees (1973–1974); Brabham (1974–1977)", starts: 71, wins: 1, podiums: 6, poles: 1, points: 58.0, titles: [] },
  { name: "Nelson Piquet Jr.", debut: 2008, last: 2009, teams: "Renault (2008–2009)", starts: 28, wins: 0, podiums: 1, poles: 0, points: 19.0, titles: [] },
  { name: "Roberto Moreno", debut: 1987, last: 1995, teams: "AGS (1987–1987); Coloni (1989–1989); Benetton (1990–1991); Euro Brun (1990–1990); Jordan (1991–1991); Minardi (1991–1991); Andrea Moda (1992–1992); Forti (1995–1995)", starts: 43, wins: 0, podiums: 1, poles: 0, points: 15.0, titles: [] },
  { name: "Maurício Gugelmin", debut: 1988, last: 1992, teams: "March (1988–1989); Leyton House (1990–1991); Jordan (1992–1992)", starts: 75, wins: 0, podiums: 1, poles: 0, points: 10.0, titles: [] },
  { name: "Bruno Senna", debut: 2010, last: 2012, teams: "HRT (2010–2010); Renault (2011–2011); Williams (2012–2012)", starts: 46, wins: 0, podiums: 0, poles: 0, points: 33.0, titles: [] },
  { name: "Gabriel Bortoleto", debut: 2025, last: 2026, teams: "Sauber (2025–2025); Audi (2026–2026)", starts: 42, wins: 0, podiums: 0, poles: 0, points: 33.0, titles: [] },
  { name: "Felipe Nasr", debut: 2015, last: 2016, teams: "Sauber (2015–2016)", starts: 40, wins: 0, podiums: 0, poles: 0, points: 29.0, titles: [] },
  { name: "Cristiano da Matta", debut: 2003, last: 2004, teams: "Toyota (2003–2004)", starts: 28, wins: 0, podiums: 0, poles: 0, points: 13.0, titles: [] },
  { name: "Christian Fittipaldi", debut: 1992, last: 1994, teams: "Minardi (1992–1993); Footwork (1994–1994)", starts: 40, wins: 0, podiums: 0, poles: 0, points: 12.0, titles: [] },
  { name: "Pedro Diniz", debut: 1995, last: 2000, teams: "Forti (1995–1995); Ligier (1996–1996); Arrows (1997–1998); Sauber (1999–2000)", starts: 99, wins: 0, podiums: 0, poles: 0, points: 10.0, titles: [] },
  { name: "Antônio Pizzonia", debut: 2003, last: 2005, teams: "Jaguar (2003–2003); Williams (2004–2005)", starts: 20, wins: 0, podiums: 0, poles: 0, points: 8.0, titles: [] },
  { name: "Wilson Fittipaldi", debut: 1972, last: 1975, teams: "Brabham (1972–1973); Fittipaldi (1975–1975)", starts: 34, wins: 0, podiums: 0, poles: 0, points: 3.0, titles: [] },
  { name: "Ricardo Zonta", debut: 1999, last: 2005, teams: "BAR (1999–2000); Jordan (2001–2001); Toyota (2004–2005)", starts: 36, wins: 0, podiums: 0, poles: 0, points: 3.0, titles: [] },
  { name: "Hernando da Silva Ramos", debut: 1955, last: 1956, teams: "Gordini (1955–1956)", starts: 7, wins: 0, podiums: 0, poles: 0, points: 2.0, titles: [] },
  { name: "Chico Landi", debut: 1951, last: 1956, teams: "Ferrari (1951–1951); Maserati (1952–1956)", starts: 6, wins: 0, podiums: 0, poles: 0, points: 1.5, titles: [] },
  { name: "Chico Serra", debut: 1981, last: 1983, teams: "Fittipaldi (1981–1982); Arrows (1983–1983)", starts: 18, wins: 0, podiums: 0, poles: 0, points: 1.0, titles: [] },
  { name: "Gino Bianco", debut: 1952, last: 1952, teams: "Maserati (1952–1952)", starts: 4, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Fritz d'Orey", debut: 1959, last: 1959, teams: "Maserati (1959–1959); Tec-Mec (1959–1959)", starts: 3, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Luiz Bueno", debut: 1973, last: 1973, teams: "Surtees (1973–1973)", starts: 1, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Alex Ribeiro", debut: 1976, last: 1977, teams: "Hesketh (1976–1976); March (1977–1977)", starts: 10, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Ingo Hoffmann", debut: 1976, last: 1977, teams: "Fittipaldi (1976–1977)", starts: 3, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Raul Boesel", debut: 1982, last: 1983, teams: "March (1982–1982); Ligier (1983–1983)", starts: 23, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Ricardo Rosset", debut: 1996, last: 1998, teams: "Footwork (1996–1996); Tyrrell (1998–1998)", starts: 27, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Tarso Marques", debut: 1996, last: 2001, teams: "Minardi (1996–2001)", starts: 25, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Luciano Burti", debut: 2000, last: 2001, teams: "Jaguar (2000–2001); Prost (2001–2001)", starts: 15, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Enrique Bernoldi", debut: 2001, last: 2002, teams: "Arrows (2001–2002)", starts: 28, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Lucas di Grassi", debut: 2010, last: 2010, teams: "Virgin (2010–2010)", starts: 19, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
  { name: "Pietro Fittipaldi", debut: 2020, last: 2020, teams: "Haas (2020–2020)", starts: 2, wins: 0, podiums: 0, poles: 0, points: 0.0, titles: [] },
];

export const brazilTotals = {
  drivers: 33,
  titles: 8,
  wins: 101,
  podiums: 293,
  starts: 1896,
};

export function brazilTeams() {
  const m = new Map<string, { team: string; from: number; to: number; drivers: Set<string> }>();
  for (const d of brazilDrivers) {
    for (const part of d.teams.split("; ")) {
      const [team, span] = part.split(" (");
      const [from, to] = (span ?? "").replace(")", "").split("–");
      if (!from) continue;
      const e = m.get(team) ?? { team, from: +from, to: +to, drivers: new Set<string>() };
      e.from = Math.min(e.from, +from);
      e.to = Math.max(e.to, +to);
      e.drivers.add(d.name);
      m.set(team, e);
    }
  }
  return [...m.values()].sort((a, b) => b.drivers.size - a.drivers.size || a.from - b.from);
}

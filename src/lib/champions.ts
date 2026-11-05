export type Champion = { year: number; driver: string; country: string; team: string };

const raw = `1950|Giuseppe Farina|Itália|Alfa Romeo
1951|Juan Manuel Fangio|Argentina|Alfa Romeo
1952|Alberto Ascari|Itália|Ferrari
1953|Alberto Ascari|Itália|Ferrari
1954|Juan Manuel Fangio|Argentina|Maserati / Mercedes
1955|Juan Manuel Fangio|Argentina|Mercedes
1956|Juan Manuel Fangio|Argentina|Ferrari
1957|Juan Manuel Fangio|Argentina|Maserati
1958|Mike Hawthorn|Reino Unido|Ferrari
1959|Jack Brabham|Austrália|Cooper
1960|Jack Brabham|Austrália|Cooper
1961|Phil Hill|EUA|Ferrari
1962|Graham Hill|Reino Unido|BRM
1963|Jim Clark|Reino Unido|Lotus
1964|John Surtees|Reino Unido|Ferrari
1965|Jim Clark|Reino Unido|Lotus
1966|Jack Brabham|Austrália|Brabham
1967|Denny Hulme|Nova Zelândia|Brabham
1968|Graham Hill|Reino Unido|Lotus
1969|Jackie Stewart|Reino Unido|Matra
1970|Jochen Rindt|Áustria|Lotus
1971|Jackie Stewart|Reino Unido|Tyrrell
1972|Emerson Fittipaldi|Brasil|Lotus
1973|Jackie Stewart|Reino Unido|Tyrrell
1974|Emerson Fittipaldi|Brasil|McLaren
1975|Niki Lauda|Áustria|Ferrari
1976|James Hunt|Reino Unido|McLaren
1977|Niki Lauda|Áustria|Ferrari
1978|Mario Andretti|EUA|Lotus
1979|Jody Scheckter|África do Sul|Ferrari
1980|Alan Jones|Austrália|Williams
1981|Nelson Piquet|Brasil|Brabham
1982|Keke Rosberg|Finlândia|Williams
1983|Nelson Piquet|Brasil|Brabham
1984|Niki Lauda|Áustria|McLaren
1985|Alain Prost|França|McLaren
1986|Alain Prost|França|McLaren
1987|Nelson Piquet|Brasil|Williams
1988|Ayrton Senna|Brasil|McLaren
1989|Alain Prost|França|McLaren
1990|Ayrton Senna|Brasil|McLaren
1991|Ayrton Senna|Brasil|McLaren
1992|Nigel Mansell|Reino Unido|Williams
1993|Alain Prost|França|Williams
1994|Michael Schumacher|Alemanha|Benetton
1995|Michael Schumacher|Alemanha|Benetton
1996|Damon Hill|Reino Unido|Williams
1997|Jacques Villeneuve|Canadá|Williams
1998|Mika Häkkinen|Finlândia|McLaren
1999|Mika Häkkinen|Finlândia|McLaren
2000|Michael Schumacher|Alemanha|Ferrari
2001|Michael Schumacher|Alemanha|Ferrari
2002|Michael Schumacher|Alemanha|Ferrari
2003|Michael Schumacher|Alemanha|Ferrari
2004|Michael Schumacher|Alemanha|Ferrari
2005|Fernando Alonso|Espanha|Renault
2006|Fernando Alonso|Espanha|Renault
2007|Kimi Räikkönen|Finlândia|Ferrari
2008|Lewis Hamilton|Reino Unido|McLaren
2009|Jenson Button|Reino Unido|Brawn
2010|Sebastian Vettel|Alemanha|Red Bull
2011|Sebastian Vettel|Alemanha|Red Bull
2012|Sebastian Vettel|Alemanha|Red Bull
2013|Sebastian Vettel|Alemanha|Red Bull
2014|Lewis Hamilton|Reino Unido|Mercedes
2015|Lewis Hamilton|Reino Unido|Mercedes
2016|Nico Rosberg|Alemanha|Mercedes
2017|Lewis Hamilton|Reino Unido|Mercedes
2018|Lewis Hamilton|Reino Unido|Mercedes
2019|Lewis Hamilton|Reino Unido|Mercedes
2020|Lewis Hamilton|Reino Unido|Mercedes
2021|Max Verstappen|Holanda|Red Bull
2022|Max Verstappen|Holanda|Red Bull
2023|Max Verstappen|Holanda|Red Bull
2024|Max Verstappen|Holanda|Red Bull`;

export const champions: Champion[] = raw.split("\n").map((l) => {
  const [y = "0", driver = "", country = "", team = ""] = l.split("|");
  return { year: +y, driver, country, team };
});

export function titleCounts() {
  const m = new Map<string, number>();
  champions.forEach((c) => m.set(c.driver, (m.get(c.driver) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

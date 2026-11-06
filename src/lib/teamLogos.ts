// Logos reais das equipes (Wikipédia / Wikimedia Commons). Equipes sem logo conferido mostram o nome.
const W = "https://upload.wikimedia.org/wikipedia/";
export const teamLogos: Record<string, string> = {
  "Alfa Romeo": W + "en/2/2a/Alfa_Romeo_logo.png",
  Ferrari: W + "en/d/df/Scuderia_Ferrari_HP_logo_24.svg",
  Maserati: W + "commons/7/78/Maserati_logo_2.svg",
  Mercedes: W + "commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
  Cooper: W + "commons/b/b0/Cooper_car_company.png",
  BRM: W + "en/b/bd/BritishRacingMotorsLogo.png",
  Lotus: W + "en/2/2f/Lotus_Cars_logo.svg",
  McLaren: W + "en/0/03/McLarenF1Team.png",
  Williams: W + "commons/1/12/Atlassian_Williams_F1_Team_logo.svg",
  Benetton: W + "commons/6/6d/United_Colors_of_Benetton_-_logo_%28Italy%2C_1989-1996%29.svg",
  Renault: W + "en/1/1d/Renault_F1_Team_logo_2019.svg",
  Brawn: W + "commons/2/24/Brawn_GP_logo.svg",
  Tyrrell: W + "commons/7/7d/Tyrrell_Racing_logo.svg",
  Matra: W + "commons/a/af/Matra_sports_logo.svg",
  "Red Bull": W + "commons/9/9f/Red_Bull_Racing_-_2005_Logo.png",
};

export const teamColorVar = (team: string) => `var(--team-${team.toLowerCase().replace(/\s+/g, "-")})`;

/** Equipe com mais títulos do piloto; empate fica com a do título mais recente. */
export function bestTeam(teamsOfTitles: string[]) {
  const m = new Map<string, number>();
  teamsOfTitles.forEach((t) => t.split(" / ").forEach((x) => m.set(x, (m.get(x) ?? 0) + 1)));
  let best = "", n = 0;
  teamsOfTitles.forEach((t) => t.split(" / ").forEach((x) => { if ((m.get(x) ?? 0) >= n) { n = m.get(x)!; best = x; } }));
  return best;
}

export function titleTeams(teamsOfTitles: string[]) {
  const out: string[] = [];
  teamsOfTitles.forEach((t) => t.split(" / ").forEach((x) => !out.includes(x) && out.push(x)));
  return out;
}

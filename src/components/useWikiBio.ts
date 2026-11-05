import { useEffect, useState } from "react";

// Títulos da Wikipédia em português quando o nome do piloto não bate direto.
const overrides: Record<string, string> = {
  "Alex Ribeiro": "Alex Dias Ribeiro",
  "Hernando da Silva Ramos": "Hermano da Silva Ramos",
};

export type WikiBio = { image: string | null; extract: string; url: string };
const cache = new Map<string, WikiBio | null>();

async function query(host: string, title: string) {
  const r = await fetch(
    `https://${host}/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages|extracts|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=1400&titles=${encodeURIComponent(title)}`,
  );
  const d = await r.json();
  const p: any = Object.values(d?.query?.pages ?? {})[0];
  if (!p || "missing" in p) return null;
  return { image: p.thumbnail?.source ?? null, extract: p.extract ?? "", url: p.fullurl ?? "" };
}

export function useWikiBio(driver: string) {
  const [bio, setBio] = useState<WikiBio | null | undefined>(cache.get(driver));
  useEffect(() => {
    if (cache.has(driver)) return setBio(cache.get(driver));
    setBio(undefined);
    const title = overrides[driver] ?? driver;
    (async () => {
      const pt = await query("pt.wikipedia.org", title).catch(() => null);
      let result = pt;
      if (!pt?.image) {
        const en = await query("en.wikipedia.org", driver).catch(() => null);
        if (en?.image) result = pt ? { ...pt, image: en.image } : en;
      }
      cache.set(driver, result);
      setBio(result);
    })();
  }, [driver]);
  return bio;
}

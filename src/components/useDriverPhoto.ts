import { useEffect, useState } from "react";

const overrides: Record<string, string> = {
  "Alan Jones": "Alan Jones (racing driver)",
  "Jim Clark": "Jim Clark",
  "Phil Hill": "Phil Hill",
};

const cache = new Map<string, string | null>();

export function useDriverPhoto(driver: string) {
  const [url, setUrl] = useState<string | null | undefined>(cache.get(driver));
  useEffect(() => {
    if (cache.has(driver)) return setUrl(cache.get(driver));
    const title = overrides[driver] ?? driver;
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=1200&titles=${encodeURIComponent(title)}`,
    )
      .then((r) => r.json())
      .then((d) => {
        const page: any = Object.values(d?.query?.pages ?? {})[0];
        const src = page?.thumbnail?.source ?? null;
        cache.set(driver, src);
        setUrl(src);
      })
      .catch(() => setUrl(null));
  }, [driver]);
  return url;
}

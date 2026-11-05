import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { brazilDrivers, brazilTotals } from "@/lib/brazilians";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /brasil instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/brasil");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Brazilian drivers", () => {
  it("lists every Brazilian who started a world championship race", () => {
    expect(brazilDrivers.length).toBe(33);
    expect(brazilTotals.drivers).toBe(33);
    expect(brazilTotals.titles).toBe(8);
  });

  it("records each driver's teams with the years he drove for them", () => {
    const senna = brazilDrivers.find((d) => d.name === "Ayrton Senna");
    expect(senna?.teams).toContain("McLaren (1988–1993)");
    expect(senna?.teams).toContain("Toleman (1984–1984)");
    expect(senna?.titles).toEqual([1988, 1990, 1991]);

    const piquet = brazilDrivers.find((d) => d.name === "Nelson Piquet");
    expect(piquet?.teams).toContain("Brabham (1978–1985)");
    expect(piquet?.wins).toBe(23);
  });

  it("keeps the driver racing in the current season flagged", () => {
    const current = brazilDrivers.filter((d) => d.last >= 2026);
    expect(current.map((d) => d.name)).toEqual(["Gabriel Bortoleto"]);
    expect(current[0]?.teams).toContain("Audi (2026–2026)");
  });
});

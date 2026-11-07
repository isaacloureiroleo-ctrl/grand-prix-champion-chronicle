import { describe, expect, it } from "vitest";
import { circuits, featuredLap } from "@/lib/circuits";

describe("Historical F1 circuits", () => {
  it("includes every circuit from the collected championship catalog", () => {
    expect(circuits).toHaveLength(78);
    expect(new Set(circuits.map(c => c.id)).size).toBe(78);
    expect(circuits.find(c => c.id === "interlagos")?.first).toBe(1973);
    expect(circuits.find(c => c.id === "indianapolis")?.first).toBe(1950);
  });
  it("keeps verified records separate for different Bahrain layouts", () => {
    const c = circuits.find(c => c.id === "bahrain");
    expect(c?.records[0]?.driver).toBe("Pedro de la Rosa");
    expect(c?.records[0]?.time).toBe("1:31.447");
    expect(c?.records.find(r => r.driver === "George Russell")?.time).toBe("0:55.404");
    expect(c && featuredLap(c)?.time).toBe("1:31.447");
  });
  it("identifies a historical race fastest lap instead of inventing an absolute record", () => {
    const c = circuits.find(c => c.id === "donington");
    expect(c?.records).toEqual([]);
    expect(c?.reference?.driver).toBe("Ayrton Senna");
    expect(c?.reference?.year).toBe(1993);
    expect(c?.reference?.kind).toBe("last-race");
  });
});
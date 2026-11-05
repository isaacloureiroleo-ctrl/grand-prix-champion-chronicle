import { Link } from "@tanstack/react-router";
import { brazilTotals } from "@/lib/brazilians";

export function BrazilBadge() {
  return (
    <Link
      to="/brasil"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-sm border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm transition-colors hover:border-primary"
    >
      <span className="flex h-7 w-1.5 flex-col overflow-hidden rounded-[1px]">
        <span className="h-1/3 bg-brazil-green" />
        <span className="h-1/3 bg-brazil-yellow" />
        <span className="h-1/3 bg-brazil-blue" />
      </span>
      <span className="text-left">
        <span className="block font-display text-xl leading-none tracking-widest">BRASIL</span>
        <span className="block text-[11px] text-muted-foreground">
          {brazilTotals.drivers} pilotos
        </span>
      </span>
    </Link>
  );
}

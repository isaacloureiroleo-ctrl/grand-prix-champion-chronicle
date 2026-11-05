import { Link } from "@tanstack/react-router";

export function BrazilBadge() {
  return (
    <Link
      to="/brasil"
      aria-label="Pilotos brasileiros"
      className="fixed bottom-16 right-0 z-50 flex items-center gap-1.5 rounded-l-sm border border-r-0 border-border bg-card/95 px-1 py-3 shadow-lg backdrop-blur-sm transition-colors hover:border-primary"
    >
      <span className="flex h-14 w-1 flex-col overflow-hidden rounded-[1px]">
        <span className="h-1/3 bg-brazil-green" />
        <span className="h-1/3 bg-brazil-yellow" />
        <span className="h-1/3 bg-brazil-blue" />
      </span>
      <span className="font-display text-base leading-none tracking-[0.2em] [writing-mode:vertical-rl]">
        BRASIL
      </span>
    </Link>
  );
}

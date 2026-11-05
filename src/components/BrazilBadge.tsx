import { Link } from "@tanstack/react-router";

export function BrazilBadge() {
  return (
    <Link
      to="/brasil"
      aria-label="Pilotos brasileiros"
      className="fixed top-0 right-0 z-50 flex flex-col items-center gap-1.5 rounded-bl-md border border-r-0 border-b border-border bg-card/95 px-4 pb-3 pt-2.5 shadow-lg backdrop-blur-sm transition-colors hover:border-primary"
    >
      <span className="flex h-1.5 w-16 overflow-hidden rounded-[1px]">
        <span className="w-1/3 bg-brazil-green" />
        <span className="w-1/3 bg-brazil-yellow" />
        <span className="w-1/3 bg-brazil-blue" />
      </span>
      <span className="font-display text-2xl leading-none tracking-[0.22em] text-foreground">
        BRASIL
      </span>
    </Link>
  );
}

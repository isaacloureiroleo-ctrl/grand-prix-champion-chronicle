import { Link } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TracksTab() {
  return (
    <nav aria-label="Pistas da Fórmula 1" className="fixed right-[7.4rem] top-0 z-50">
      <Button asChild variant="outline" className="h-[3.75rem] gap-2 rounded-t-none border-t-0 bg-card/95 px-4 font-display text-2xl backdrop-blur-sm">
        <Link to="/pistas" activeProps={{ className: "text-primary border-primary" }}><Flag className="size-5" />PISTAS</Link>
      </Button>
    </nav>
  );
}
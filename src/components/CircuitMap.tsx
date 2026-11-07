import { useState } from "react";
import { MapPin } from "lucide-react";
import type { Circuit } from "@/lib/circuits";

export function CircuitMap({ circuit, large = false }: { circuit: Circuit; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`circuit-map flex items-center justify-center overflow-hidden ${large ? "min-h-72 p-5 md:min-h-96 md:p-10" : "aspect-[4/3] p-5"}`}>
      {failed ? (
        <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
          <MapPin className="size-8" />
          <span>Imagem indisponível</span>
          <a href={circuit.imageSource} target="_blank" rel="noreferrer" className="underline">Ver traçado na fonte</a>
        </div>
      ) : (
        <img src={circuit.image} alt={`Traçado de ${circuit.name}`} loading={large ? "eager" : "lazy"}
          onError={() => setFailed(true)} className={large ? "h-72 w-full object-contain md:h-96" : "h-full w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-105"} />
      )}
    </div>
  );
}
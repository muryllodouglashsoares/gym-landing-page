import type { ReactNode } from "react";

/** Rótulo de seção com traços laterais (padrão do design FORJA). */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div className="w-6 h-px bg-ember" />
      <span className="font-display font-bold text-ember text-xs uppercase tracking-[0.35em]">
        {children}
      </span>
      <div className="w-6 h-px bg-ember" />
    </div>
  );
}

/**
 * Título padrão de seção (h2), no tamanho e peso definidos no design FORJA
 * (fonte da verdade: Figma). Centraliza o `clamp()` de fonte que antes
 * estava duplicado em cada seção da página.
 */
export function SectionHeading({
  children,
  className = "",
  tight = false,
}: {
  children: ReactNode;
  /** Classes extras (ex.: margens), específicas de cada seção. */
  className?: string;
  /** Aplica leading-[0.9], usado nas seções com título em múltiplas linhas. */
  tight?: boolean;
}) {
  return (
    <h2
      className={`font-display font-black text-ice uppercase ${tight ? "leading-[0.9] " : ""}${className}`}
      style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
    >
      {children}
    </h2>
  );
}

/** Logotipo FORJA (bloco chanfrado + wordmark). */
export function BrandMark() {
  return (
    <>
      <div
        className="w-8 h-8 flex items-center justify-center bg-ember"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)" }}
      >
        <span className="font-display font-black text-charcoal text-sm leading-none">F</span>
      </div>
      <div>
        <span className="font-display font-black text-ice text-xl tracking-[0.22em]">FORJA</span>
        <div className="text-steel-400 text-[9px] tracking-[0.4em] uppercase -mt-0.5">
          Training Studio
        </div>
      </div>
    </>
  );
}

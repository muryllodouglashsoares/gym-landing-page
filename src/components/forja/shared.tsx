import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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

/**
 * Conta de 0 até `value` quando o elemento entra na viewport (uma única
 * vez). Se o usuário preferir menos movimento, mostra o valor final direto,
 * sem contagem.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(node);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
          setDisplay((value * eased).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Anima a entrada do conteúdo quando ele entra na viewport, uma única vez.
 * Some elementos de tela pequena continuam com opacidade normal antes da
 * hidratação (a classe reveal-init evita "flash" de conteúdo sem estilo).
 * Respeita prefers-reduced-motion via CSS (ver .reveal-init/.reveal-visible
 * em styles.css) — se o usuário pedir menos movimento, o conteúdo aparece
 * imediatamente, sem depender do observer.
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  variant = "up",
  style,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** "up": sobe + aparece (padrão). "fade": só opacidade — usar quando o
   * elemento já tem um transform próprio permanente (ex.: scale fixo). */
  variant?: "up" | "fade";
  /** Estilos extras do elemento (mesclados com o delay da animação). */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const initClass = variant === "fade" ? "reveal-fade-init" : "reveal-init";
  const visibleClass = variant === "fade" ? "reveal-fade-visible" : "reveal-visible";

  return (
    <div
      ref={ref}
      className={`${initClass} ${visible ? visibleClass : ""} ${className}`.trim()}
      style={{ ...style, ...(delayMs ? { animationDelay: `${delayMs}ms` } : {}) }}
    >
      {children}
    </div>
  );
}

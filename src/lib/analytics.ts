/**
 * Google Analytics 4 (via gtag.js), carregado apenas se
 * VITE_GA_MEASUREMENT_ID estiver definida no ambiente.
 *
 * Este é um projeto de portfólio, mas como está no ar recebendo tráfego
 * real (recrutadores, links compartilhados), medir visitas é útil tanto
 * para demonstrar domínio de stack quanto para ter dado real de audiência.
 *
 * Para ativar: defina VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX" nas variáveis
 * de ambiente do provedor de deploy (ou em um .env local, ver .env.example).
 * Sem essa variável, nenhum script de analytics é carregado — não há
 * coleta de dados por padrão.
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Dispara um pageview manual (útil em navegação client-side do TanStack Router). */
export function trackPageview(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag)
    return;
  window.gtag("event", "page_view", { page_path: path });
}

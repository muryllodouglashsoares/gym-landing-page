// As importações com extensão ".ts" neste arquivo permitem que os testes
// (`npm test`, node:test) o carreguem sem bundler. O tsconfig já habilita
// `allowImportingTsExtensions` e o Vite resolve normalmente.
import { contactSchema, HONEYPOT_FIELD } from "./contact-schema.ts";

/**
 * Lógica do envio de contato, sem dependência de framework nem de
 * variáveis de ambiente: a URL do webhook é recebida por parâmetro. Quem
 * chama (contact.server.ts, roda só no servidor) é que lê o segredo.
 * Assim a regra pode ser testada com `fetch` simulado, sem tocar o
 * webhook real.
 */

export type ContactResult = { ok: true } | { ok: false; error: string };

export const CONTACT_MESSAGES = {
  invalid: "Confira os dados informados e tente novamente.",
  unavailable:
    "Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.",
} as const;

export const WEBHOOK_TIMEOUT_MS = 8000;

type Logger = Pick<Console, "error">;

export interface ContactDeps {
  /** Valor de CONTACT_WEBHOOK_URL (lido no servidor). */
  webhookUrl: string | undefined;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  now?: () => Date;
  logger?: Logger;
}

/** Honeypot preenchido => provável bot. Checado ANTES da validação para que
 * bots não consigam diferenciar "detectado" de "dados inválidos". */
function isHoneypotTripped(raw: unknown): boolean {
  if (typeof raw !== "object" || raw === null) return false;
  const value = (raw as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

function parseWebhookUrl(value: string | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export async function processContactSubmission(
  raw: unknown,
  deps: ContactDeps,
): Promise<ContactResult> {
  const {
    webhookUrl,
    fetchImpl = fetch,
    timeoutMs = WEBHOOK_TIMEOUT_MS,
    now = () => new Date(),
    logger = console,
  } = deps;

  // 1. Honeypot: finge sucesso, não processa nem registra nada.
  if (isHoneypotTripped(raw)) return { ok: true };

  // 2. Validação no servidor (o `contactSchema` descarta chaves extras).
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? CONTACT_MESSAGES.invalid,
    };
  }

  // 3. Destino ausente/ inválido: falha explícita. Os logs nunca incluem a
  // URL nem dados do lead (apenas o motivo).
  const url = parseWebhookUrl(webhookUrl);
  if (!url) {
    logger.error(
      "[contato] CONTACT_WEBHOOK_URL ausente ou inválida; mensagem NÃO encaminhada.",
    );
    return { ok: false, error: CONTACT_MESSAGES.unavailable };
  }

  // 4. Encaminhamento ao webhook, com timeout.
  try {
    const response = await fetchImpl(url.toString(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        origem: "site-forja-contato",
        enviadoEm: now().toISOString(),
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      logger.error(
        "[contato] Webhook respondeu com erro. status:",
        response.status,
      );
      return { ok: false, error: CONTACT_MESSAGES.unavailable };
    }
    return { ok: true };
  } catch (error) {
    logger.error(
      "[contato] Falha ao chamar o webhook:",
      error instanceof Error ? error.name : "erro desconhecido",
    );
    return { ok: false, error: CONTACT_MESSAGES.unavailable };
  }
}

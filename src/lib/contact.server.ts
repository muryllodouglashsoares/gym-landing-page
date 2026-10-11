import { createServerFn } from "@tanstack/react-start";

import { processContactSubmission } from "./contact-handler";

/**
 * Server function do formulário de contato. A entrada chega como `unknown`
 * de propósito: a validação (e o honeypot) ficam em
 * `processContactSubmission`, que responde com um resultado estruturado
 * — `{ ok: true }` ou `{ ok: false, error }` — em vez de lançar exceções
 * cujas mensagens iriam parar na tela do usuário.
 *
 * `CONTACT_WEBHOOK_URL` é lida somente aqui, no servidor, e nunca é
 * incluída em respostas nem em logs.
 */
export const submitContactRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }) =>
    processContactSubmission(data, {
      webhookUrl: process.env.CONTACT_WEBHOOK_URL,
    }),
  );

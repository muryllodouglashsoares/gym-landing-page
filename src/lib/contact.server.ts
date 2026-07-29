import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { contactSchema } from "./contact-schema";

/**
 * Payload aceito pelo servidor: os campos do formulário + um campo honeypot
 * ("empresa"). O honeypot fica escondido de usuários reais via CSS, mas
 * bots de preenchimento automático costumam preenchê-lo. Se vier preenchido,
 * respondemos com sucesso normalmente (para não sinalizar ao bot que foi
 * detectado) mas não encaminhamos a mensagem.
 */
const submissionSchema = contactSchema.extend({
  empresa: z.string().optional(),
});

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }) => {
    const { empresa, ...contact } = data;

    // Honeypot preenchido => provável bot. Finge sucesso sem processar.
    if (empresa && empresa.trim().length > 0) {
      return { ok: true as const };
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      // Sem destino configurado ainda. Registramos no log do servidor para
      // não perder o lead, mas avisamos claramente o time de que a
      // integração final (e-mail, CRM, WhatsApp Business API etc.) precisa
      // ser conectada antes de ir para produção.
      console.error(
        "[contato] CONTACT_WEBHOOK_URL não configurada. Mensagem recebida mas NÃO encaminhada:",
        contact,
      );
      throw new Error(
        "Formulário ainda não conectado a um destino de envio (defina CONTACT_WEBHOOK_URL).",
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...contact,
        origem: "site-forja-contato",
        enviadoEm: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("[contato] Webhook respondeu com erro:", response.status);
      throw new Error("Não foi possível enviar sua mensagem agora. Tente novamente.");
    }

    return { ok: true as const };
  });

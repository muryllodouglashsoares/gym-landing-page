import { z } from "zod";

/**
 * Modalidades aceitas no formulário. Fonte única: o <select> de
 * Contato.tsx e o schema (cliente e servidor) usam esta lista, então um
 * valor fora dela é rejeitado também no servidor.
 */
export const MODALIDADE_OPTIONS = [
  "Musculação",
  "Funcional",
  "Cross Training",
  "Personal Training",
  "Cardio",
] as const;

/** Nome do campo honeypot (ver contact-handler.ts). */
export const HONEYPOT_FIELD = "empresa";

/**
 * Schema do formulário de contato. Usado tanto no cliente (validação
 * inline via react-hook-form) quanto no servidor (defesa em profundidade —
 * nunca confiar apenas na validação do cliente). Todos os campos têm
 * limite de tamanho para que o servidor nunca encaminhe payloads
 * arbitrariamente grandes ao webhook.
 */
export const contactSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail")
    .max(254, "E-mail muito longo")
    .email("Informe um e-mail válido"),
  telefone: z
    .string()
    .trim()
    .max(30, "Telefone muito longo")
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const digits = value.replace(/\D/g, "").length;
        // 10–11 dígitos (DDD + número) ou até 15 (formato internacional).
        return digits >= 10 && digits <= 15;
      },
      { message: "Informe um telefone válido com DDD" },
    ),
  modalidade: z
    .union([z.enum(MODALIDADE_OPTIONS), z.literal("")], {
      errorMap: () => ({ message: "Selecione uma modalidade válida" }),
    })
    .optional(),
  mensagem: z.string().trim().max(1000, "Mensagem muito longa").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const CONTACT_FORM_DEFAULTS: ContactFormValues = {
  nome: "",
  email: "",
  telefone: "",
  modalidade: "",
  mensagem: "",
};

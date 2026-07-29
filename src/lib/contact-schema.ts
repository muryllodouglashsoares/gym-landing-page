import { z } from "zod";

/**
 * Schema do formulário de contato. Usado tanto no cliente (validação
 * inline via react-hook-form) quanto no servidor (defesa em profundidade —
 * nunca confiar apenas na validação do cliente).
 */
export const contactSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z.string().trim().min(1, "Informe seu e-mail").email("Informe um e-mail válido"),
  telefone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.replace(/\D/g, "").length >= 10, {
      message: "Informe um telefone válido com DDD",
    }),
  modalidade: z.string().trim().optional(),
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

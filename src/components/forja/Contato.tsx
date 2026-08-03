import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CONTACT,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  MAPS_QUERY_URL,
  MAPS_EMBED_URL,
} from "./data";
import { IconPin, IconPhone, IconWhatsapp, IconInstagram } from "./icons";
import { SectionLabel, SectionHeading, Reveal } from "./shared";
import {
  contactSchema,
  CONTACT_FORM_DEFAULTS,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { submitContactRequest } from "@/lib/contact.server";

const inputClass =
  "w-full bg-steel-800 border border-steel-600 text-ice px-4 py-3 text-sm placeholder-steel-400 focus:outline-none focus:border-ember transition-colors";
const errorClass = "text-destructive text-xs mt-1.5";

export function Contato() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  // Campo honeypot: não é controlado pelo react-hook-form de propósito — só
  // interessa seu valor no momento do submit, para detectar bots.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: CONTACT_FORM_DEFAULTS,
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await submitContactRequest({
        data: { ...values, empresa: honeypotRef.current?.value ?? "" },
      });
      setSent(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
      );
    }
  });

  const infos = [
    { icon: <IconPin />, label: "Endereço", value: CONTACT.address },
    { icon: <IconPhone />, label: "Telefone", value: CONTACT.phone },
    { icon: <IconWhatsapp />, label: "WhatsApp", value: CONTACT.whatsapp },
  ];

  return (
    <section id="contato" className="py-24 lg:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionLabel>Contato</SectionLabel>
            <SectionHeading tight className="mb-8">
              VAMOS
              <br />
              <span className="text-ember">FORJAR</span>
              <br />
              JUNTOS.
            </SectionHeading>

            <div className="space-y-5 mb-10">
              {infos.map(({ icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="text-ember flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="font-display font-bold text-steel-400 text-[10px] uppercase tracking-widest mb-0.5">
                      {label}
                    </div>
                    <div className="text-ice text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                {
                  icon: <IconWhatsapp />,
                  label: "WhatsApp",
                  href: WHATSAPP_URL,
                },
                {
                  icon: <IconInstagram />,
                  label: "Instagram",
                  href: INSTAGRAM_URL,
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 border border-steel-700 px-5 py-2.5 text-steel-300 hover:border-ember hover:text-ember transition-all"
                >
                  {icon}
                  <span className="font-display font-bold text-xs uppercase tracking-widest">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            <div
              className="relative mt-10 border border-steel-700 overflow-hidden"
              style={{ height: "200px" }}
            >
              <iframe
                src={MAPS_EMBED_URL}
                title="Mapa com a localização da FORJA Training Studio"
                loading="lazy"
                className="w-full h-full"
                style={{ border: 0, filter: "grayscale(60%) contrast(1.1)" }}
              />
              <a
                href={MAPS_QUERY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-charcoal/90 border border-steel-600 text-ice text-xs font-display font-bold uppercase tracking-widest px-3 py-2 hover:border-ember hover:text-ember transition-colors"
              >
                Ver no Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="border border-steel-700 bg-steel-900 p-8 lg:p-10">
              <h3
                className="font-display font-black text-ice uppercase mb-6"
                style={{ fontSize: "1.6rem", letterSpacing: "0.05em" }}
              >
                Agendar Aula Experimental
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <div
                    className="font-display font-black text-ember mb-3"
                    style={{ fontSize: "2rem" }}
                  >
                    MENSAGEM ENVIADA!
                  </div>
                  <p className="text-steel-400 text-sm">
                    Nossa equipe entrará em contato em até 2 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  {/* Honeypot: invisível e inacessível para usuários reais, mas
                      visível para bots de preenchimento automático. */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    ref={honeypotRef}
                    name="empresa"
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                  />

                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      aria-label="Seu nome completo"
                      aria-invalid={!!errors.nome}
                      className={inputClass}
                      {...register("nome")}
                    />
                    {errors.nome && (
                      <p className={errorClass}>{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="E-mail"
                        aria-label="E-mail"
                        aria-invalid={!!errors.email}
                        className={inputClass}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className={errorClass}>{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Telefone / WhatsApp"
                        aria-label="Telefone ou WhatsApp"
                        aria-invalid={!!errors.telefone}
                        className={inputClass}
                        {...register("telefone")}
                      />
                      {errors.telefone && (
                        <p className={errorClass}>{errors.telefone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="modalidade"
                      className="font-display font-bold text-steel-400 text-[10px] uppercase tracking-widest"
                    >
                      Modalidade de Interesse
                    </label>
                    <select
                      id="modalidade"
                      className={inputClass}
                      style={{ background: "#1a1a1a" }}
                      {...register("modalidade")}
                    >
                      <option value="">Selecione...</option>
                      <option>Musculação</option>
                      <option>Funcional</option>
                      <option>Cross Training</option>
                      <option>Personal Training</option>
                      <option>Cardio</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Conte um pouco sobre seus objetivos..."
                      aria-label="Seus objetivos"
                      rows={4}
                      className={`${inputClass} resize-none`}
                      {...register("mensagem")}
                    />
                    {errors.mensagem && (
                      <p className={errorClass}>{errors.mensagem.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p role="alert" className={errorClass}>
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-ember font-display font-black text-charcoal text-sm uppercase tracking-widest hover:bg-ember-light transition-colors btn-ember disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar e Agendar Aula"}
                  </button>
                  <p className="text-steel-400 text-xs text-center">
                    Primeira aula experimental gratuita · Sem compromisso
                  </p>
                  <p className="text-steel-500 text-[11px] text-center leading-relaxed">
                    Este é um projeto de portfólio: a FORJA não é uma academia
                    real. Ao enviar, seus dados são armazenados em uma planilha
                    para fins de demonstração técnica — evite incluir
                    informações reais ou sensíveis.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

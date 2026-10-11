import { useState } from "react";
import { FAQS } from "./data";
import { IconChevron } from "./icons";
import {
  SectionLabel,
  SectionHeading,
  Reveal,
  SECTION_PADDING,
} from "./shared";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className={`${SECTION_PADDING} bg-steel-900`}>
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>
            PERGUNTAS
            <br />
            <span className="text-ember">FREQUENTES.</span>
          </SectionHeading>
        </Reveal>

        <div className="space-y-0 border-t border-steel-700">
          {FAQS.map(({ q, a }, i) => (
            <Reveal
              key={q}
              delayMs={i * 50}
              variant="fade"
              className="border-b border-steel-700"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-pergunta-${i}`}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-resposta-${i}`}
                >
                  <span
                    className={`font-display font-bold text-sm uppercase tracking-wide transition-colors ${
                      open === i ? "text-ember" : "text-ice"
                    }`}
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {q}
                  </span>
                  <span
                    className={`flex-shrink-0 transition-colors ${open === i ? "text-ember" : "text-steel-400"}`}
                  >
                    <IconChevron open={open === i} />
                  </span>
                </button>
              </h3>
              {/* Altura animada via grid (0fr → 1fr): a resposta nunca é
                  cortada, mesmo com texto longo, zoom ou fonte ampliada.
                  `inert` esconde a resposta fechada do teclado e dos
                  leitores de tela. */}
              <div
                id={`faq-resposta-${i}`}
                role="region"
                aria-labelledby={`faq-pergunta-${i}`}
                className="accordion-content"
                data-open={open === i}
                inert={open !== i}
              >
                <div>
                  <p
                    className="text-steel-400 text-sm leading-relaxed pb-5"
                    style={{ fontWeight: 300 }}
                  >
                    {a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

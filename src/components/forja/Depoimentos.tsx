import { useState } from "react";
import { TESTIMONIALS } from "./data";
import { IconStar, IconArrowLeft, IconArrowRight } from "./icons";
import { SectionLabel, SectionHeading, Reveal } from "./shared";

export function Depoimentos() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  const current = TESTIMONIALS[index];

  return (
    <section className="py-24 lg:py-36 bg-charcoal">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-14">
          <SectionLabel>Depoimentos</SectionLabel>
          <SectionHeading>
            QUEM JÁ FOI
            <br />
            <span className="text-ember">FORJADO.</span>
          </SectionHeading>
        </Reveal>

        <Reveal variant="fade" className="border border-steel-700 bg-steel-900 p-8 md:p-12 relative">
          <div
            className="absolute top-6 left-8 text-ember/10 leading-none pointer-events-none font-display font-black"
            style={{ fontSize: "8rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </div>
          <div className="testimonial-slide relative" aria-live="polite" aria-atomic="true">
            <div className="flex gap-1 mb-6 text-ember" aria-hidden="true">
              {[...Array(current.stars)].map((_, i) => (
                <IconStar key={i} />
              ))}
            </div>
            <span className="sr-only">Avaliação: {current.stars} de 5 estrelas.</span>
            <blockquote className="text-ice leading-relaxed mb-8" style={{ fontWeight: 300, fontSize: "1.1rem" }}>
              "{current.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="font-display font-extrabold text-ice uppercase"
                  style={{ fontSize: "1.1rem", letterSpacing: "0.05em" }}
                >
                  {current.name}
                </div>
                <div className="text-steel-400 text-sm mt-0.5">{current.role}</div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Depoimento anterior"
                  className="w-10 h-10 border border-steel-600 text-ice hover:border-ember hover:text-ember transition-all flex items-center justify-center"
                >
                  <IconArrowLeft />
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo depoimento"
                  className="w-10 h-10 border border-steel-600 text-ice hover:border-ember hover:text-ember transition-all flex items-center justify-center"
                >
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Ver depoimento de ${t.name}`}
              aria-current={i === index ? "true" : undefined}
              className="transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                height: 3,
                background: i === index ? "#f97316" : "#606060",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

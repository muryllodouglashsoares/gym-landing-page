import { IMAGES, IMAGE_SRCSETS, IMAGE_DIMENSIONS, TIMELINE } from "./data";
import { SectionLabel, SectionHeading, Reveal, AnimatedNumber } from "./shared";

export function About() {
  return (
    <section id="sobre" className="py-24 lg:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal variant="fade" className="relative">
            <div
              className="absolute pointer-events-none"
              style={{
                top: -16,
                left: -16,
                width: 80,
                height: 80,
                borderTop: "2px solid #f97316",
                borderLeft: "2px solid #f97316",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -16,
                right: -16,
                width: 80,
                height: 80,
                borderBottom: "2px solid #f97316",
                borderRight: "2px solid #f97316",
              }}
            />
            <img
              src={IMAGES.about}
              srcSet={IMAGE_SRCSETS.about}
              sizes="(min-width: 1024px) 45vw, 100vw"
              width={IMAGE_DIMENSIONS.about.width}
              height={IMAGE_DIMENSIONS.about.height}
              alt="Interior da FORJA Training Studio com equipamentos premium"
              className="w-full object-cover"
              style={{ height: "520px", filter: "brightness(0.85) saturate(0.8)" }}
              loading="lazy"
            />
            <div className="absolute bg-ember text-charcoal p-5" style={{ bottom: 32, right: -20 }}>
              <div
                className="font-display font-black leading-none mb-0.5"
                style={{ fontSize: "2.5rem" }}
              >
                <AnimatedNumber value={8} suffix="+" />
              </div>
              <div className="font-display font-bold uppercase text-[10px] tracking-widest">
                Anos de
              </div>
              <div className="font-display font-bold uppercase text-[10px] tracking-widest">
                Excelência
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <SectionLabel>Nossa História</SectionLabel>
            <SectionHeading tight className="mb-6">
              MOLDADOS
              <br />
              PELO <span className="text-ember">FERRO.</span>
            </SectionHeading>
            <p className="text-steel-300 leading-relaxed mb-5" style={{ fontWeight: 300 }}>
              A FORJA nasceu de uma convicção: o treinamento de alta performance não deveria ser
              exclusividade de atletas profissionais. Cada pessoa que entra aqui merece o melhor —
              equipamentos, metodologia e suporte humano.
            </p>
            <p className="text-steel-300 leading-relaxed mb-10" style={{ fontWeight: 300 }}>
              Nossa missão é simples: transformar limitações em combustível. Você chega como é. Sai
              como pode ser.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-12">
              {["Disciplina", "Performance", "Resultado"].map((pillar) => (
                <div key={pillar} className="border border-steel-700 px-3 py-3 text-center">
                  <span className="font-display font-bold text-ice text-xs uppercase tracking-widest">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-0">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div key={year} className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0 w-10">
                    <div className="font-display font-black text-ember text-sm leading-none mt-0.5">
                      {year}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-steel-700 mt-2 mb-0" />
                    )}
                  </div>
                  <div
                    className={`pb-6 ${i < TIMELINE.length - 1 ? "border-b border-steel-700" : ""} w-full`}
                  >
                    <div className="font-display font-bold text-ice text-sm uppercase tracking-wide mb-1.5 mt-0.5">
                      {title}
                    </div>
                    <div className="text-steel-400 text-sm leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { PLANS } from "./data";
import { IconCheck } from "./icons";
import { SectionLabel, SectionHeading, Reveal } from "./shared";

export function Planos() {
  return (
    <section id="planos" className="py-24 lg:py-36 bg-steel-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-16">
          <SectionLabel>Planos</SectionLabel>
          <SectionHeading className="mb-4">
            INVISTA NA SUA
            <br />
            <span className="text-ember">TRANSFORMAÇÃO.</span>
          </SectionHeading>
          <p className="text-steel-400 max-w-md mx-auto" style={{ fontWeight: 300 }}>
            Sem taxa de matrícula nos primeiros 3 dias. Cancele quando quiser.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              delayMs={i * 90}
              variant="fade"
              className={`relative p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-2 border-ember bg-steel-900"
                  : "border border-steel-700 bg-steel-800 hover:border-steel-400"
              }`}
              style={plan.highlight ? { transform: "scale(1.03)" } : undefined}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ember font-display font-black text-charcoal px-5 py-1 text-xs uppercase tracking-widest">
                  Mais Popular
                </div>
              )}
              <div className="font-display font-bold text-steel-400 text-xs uppercase tracking-[0.3em] mb-1">
                {plan.name}
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-steel-400 text-sm mt-1">R$</span>
                <span
                  className={`font-display font-black leading-none ${plan.highlight ? "text-ember" : "text-ice"}`}
                  style={{ fontSize: "3.5rem" }}
                >
                  {plan.price}
                </span>
                <span className="text-steel-400 text-sm mb-1">{plan.period}</span>
              </div>
              <p className="text-steel-400 text-sm mb-6 leading-relaxed">{plan.desc}</p>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="text-ember mt-0.5 flex-shrink-0">
                      <IconCheck />
                    </span>
                    <span className="text-ice-dim text-sm">{f}</span>
                  </div>
                ))}
                {plan.missing.map((m) => (
                  <div key={m} className="flex items-start gap-3 opacity-30">
                    <span className="text-steel-500 mt-0.5 flex-shrink-0 text-sm leading-none">
                      —
                    </span>
                    <span className="text-steel-500 text-sm">{m}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contato"
                className={`block text-center py-3.5 font-display font-black text-sm uppercase tracking-widest transition-all btn-ember ${
                  plan.highlight
                    ? "bg-ember text-charcoal hover:bg-ember-light animate-glow-pulse"
                    : "border border-steel-600 text-ice hover:border-ember hover:text-ember"
                }`}
              >
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

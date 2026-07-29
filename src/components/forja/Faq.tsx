import { useState } from "react";
import { FAQS } from "./data";
import { IconChevron } from "./icons";
import { SectionLabel, SectionHeading } from "./shared";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-36 bg-steel-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>
            PERGUNTAS
            <br />
            <span className="text-ember">FREQUENTES.</span>
          </SectionHeading>
        </div>

        <div className="space-y-0 border-t border-steel-700">
          {FAQS.map(({ q, a }, i) => (
            <div key={q} className="border-b border-steel-700">
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
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
              <div className="accordion-content" style={{ maxHeight: open === i ? "300px" : "0" }}>
                <p className="text-steel-400 text-sm leading-relaxed pb-5" style={{ fontWeight: 300 }}>
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

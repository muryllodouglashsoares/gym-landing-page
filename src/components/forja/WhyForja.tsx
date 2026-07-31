import { IconShield, IconUser, IconClipboard, IconFlame, IconHeart, IconStar } from "./icons";
import { SectionLabel, SectionHeading, Reveal } from "./shared";

const REASONS = [
  {
    icon: <IconShield />,
    title: "Equipamentos Premium",
    desc: "Parceiros Hammer Strength e Life Fitness. Manutenção semanal garantida.",
  },
  {
    icon: <IconUser />,
    title: "Treinadores Certificados",
    desc: "Todos com CREF ativo e especializações internacionais. Atualização constante.",
  },
  {
    icon: <IconClipboard />,
    title: "Treinos Personalizados",
    desc: "Planilha individualizada para cada aluno. Periodização real, não genérica.",
  },
  {
    icon: <IconFlame />,
    title: "Ambiente Climatizado",
    desc: "Ar-condicionado central e ventilação de precisão. Conforto máximo no treino.",
  },
  {
    icon: <IconHeart />,
    title: "Acompanhamento",
    desc: "App exclusivo para registro de treino. Feedback semanal com seu coach.",
  },
  {
    icon: <IconStar />,
    title: "Resultados Reais",
    desc: "+500 histórias de transformação. Galeria de antes/depois disponível no estúdio.",
  },
];

export function WhyForja() {
  return (
    <section className="py-24 lg:py-36 bg-charcoal relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-100px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <SectionLabel>Por Que FORJA</SectionLabel>
            <SectionHeading tight className="mb-6">
              O AÇO SE
              <br />
              <span className="text-ember">DIFERENCIA</span>
              <br />
              NO FOGO.
            </SectionHeading>
            <p className="text-steel-400 leading-relaxed" style={{ fontWeight: 300 }}>
              Não somos uma academia qualquer. Somos um laboratório de transformação humana.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {REASONS.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delayMs={i * 70} className="card-lift border border-steel-700 p-6 group">
                <div className="text-ember mb-4">{icon}</div>
                <h3
                  className="font-display font-extrabold text-ice uppercase mb-2"
                  style={{ fontSize: "1.1rem", letterSpacing: "0.05em" }}
                >
                  {title}
                </h3>
                <p className="text-steel-400 text-sm leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { IconDumbbell, IconFlame, IconCross, IconUser, IconHeart, IconClipboard } from "./icons";
import { SectionLabel, SectionHeading } from "./shared";

const MODALIDADES = [
  {
    icon: <IconDumbbell />,
    title: "Musculação",
    desc: "Equipamentos olímpicos de última geração. Zona livre e máquinas premium para todos os níveis.",
  },
  {
    icon: <IconFlame />,
    title: "Funcional",
    desc: "Treinos que simulam movimentos reais. Força, mobilidade e resistência integradas.",
  },
  {
    icon: <IconCross />,
    title: "Cross Training",
    desc: "Alta intensidade e variedade infinita. Sessões em grupo que desafiam seus limites.",
  },
  {
    icon: <IconUser />,
    title: "Personal",
    desc: "Treinador exclusivo, periodização individualizada e atenção total ao seu progresso.",
  },
  {
    icon: <IconHeart />,
    title: "Cardio",
    desc: "Esteiras, bikes, elípticos e remos de última geração. Zona cardio climatizada.",
  },
  {
    icon: <IconClipboard />,
    title: "Avaliação Física",
    desc: "Bioimpedância, antropometria e teste de capacidade aeróbica. Evolução mensurável.",
  },
];

export function Modalidades() {
  return (
    <section id="modalidades" className="py-24 lg:py-36 bg-steel-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionLabel>Modalidades</SectionLabel>
          <SectionHeading>
            ESCOLHA SUA
            <br />
            <span className="text-ember">BATALHA.</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-700">
          {MODALIDADES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="card-lift bg-steel-900 p-8 border border-transparent group cursor-pointer"
            >
              <div className="text-steel-400 group-hover:text-ember transition-colors mb-5">
                {icon}
              </div>
              <h3
                className="font-display font-extrabold text-ice uppercase mb-3"
                style={{ fontSize: "1.35rem", letterSpacing: "0.05em" }}
              >
                {title}
              </h3>
              <p className="text-steel-400 text-sm leading-relaxed">{desc}</p>
              <div className="mt-5 w-8 h-0.5 bg-ember scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

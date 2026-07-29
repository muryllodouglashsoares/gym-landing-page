import { TEAM, IMAGES, IMAGE_SRCSETS, IMAGE_DIMENSIONS } from "./data";
import { SectionLabel, SectionHeading } from "./shared";

export function Equipe() {
  return (
    <section id="equipe" className="py-24 lg:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Equipe</SectionLabel>
            <SectionHeading tight>
              FORJADOS
              <br />
              PARA <span className="text-ember">GUIAR.</span>
            </SectionHeading>
          </div>
          <p className="text-steel-400 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
            Nosso time é selecionado por excelência técnica e vocação para transformar vidas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map(({ key, name, role, bio }) => (
            <div key={name} className="card-lift border border-steel-700 group overflow-hidden">
              <div className="relative overflow-hidden" style={{ height: "320px" }}>
                <img
                  src={IMAGES[key]}
                  srcSet={IMAGE_SRCSETS[key]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  width={IMAGE_DIMENSIONS[key].width}
                  height={IMAGE_DIMENSIONS[key].height}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(40%) brightness(0.8)" }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="font-display font-black text-ice uppercase leading-tight"
                    style={{ fontSize: "1.35rem" }}
                  >
                    {name}
                  </h3>
                  <div className="font-display font-bold text-ember text-xs uppercase tracking-widest mt-0.5">
                    {role}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-steel-400 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

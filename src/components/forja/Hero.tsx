import { IMAGES, IMAGE_SRCSETS, IMAGE_DIMENSIONS, HERO_STATS } from "./data";

const EMBERS = [
  { left: "18%", bottom: "12%", dur: "3.2s", delay: "0s", drift: "14px", size: 3 },
  { left: "26%", bottom: "8%", dur: "4s", delay: "0.6s", drift: "-10px", size: 2 },
  { left: "34%", bottom: "15%", dur: "3.6s", delay: "1.2s", drift: "18px", size: 2 },
  { left: "42%", bottom: "10%", dur: "2.8s", delay: "0.3s", drift: "-14px", size: 3 },
  { left: "50%", bottom: "6%", dur: "4.2s", delay: "1.8s", drift: "10px", size: 2 },
  { left: "58%", bottom: "14%", dur: "3.4s", delay: "0.9s", drift: "-18px", size: 2 },
  { left: "64%", bottom: "9%", dur: "3.8s", delay: "2.1s", drift: "12px", size: 3 },
  { left: "72%", bottom: "11%", dur: "4.4s", delay: "0.4s", drift: "-8px", size: 2 },
];

function EmberParticles() {
  return (
    <>
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-ember animate-ember-rise pointer-events-none"
          style={
            {
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              "--dur": e.dur,
              "--drift": e.drift,
              animationDelay: e.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBg}
          srcSet={IMAGE_SRCSETS.heroBg}
          sizes="100vw"
          width={IMAGE_DIMENSIONS.heroBg.width}
          height={IMAGE_DIMENSIONS.heroBg.height}
          alt="Interior do FORJA Training Studio"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.22) saturate(0.6)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,10,0.98) 35%, rgba(10,10,10,0.75) 65%, rgba(10,10,10,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)" }}
        />
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-80px",
          left: "25%",
          width: "520px",
          height: "280px",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "20%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
      />
      <EmberParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-28">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 border border-ember/30 px-4 py-2 mb-8">
              <div
                className="w-1.5 h-1.5 rounded-full bg-ember"
                style={{ animation: "glowPulse 2s ease-in-out infinite" }}
              />
              <span className="font-display font-semibold text-ember text-[11px] uppercase tracking-[0.35em]">
                São Paulo · Training Studio Premium
              </span>
            </div>

            <h1
              className="font-display font-black text-ice uppercase leading-[0.88] mb-7"
              style={{ fontSize: "clamp(3.8rem, 9vw, 7rem)" }}
            >
              NÃO
              <br />
              TREINE.
              <br />
              <span className="text-ember">SE FORJE.</span>
            </h1>

            <p
              className="text-steel-300 leading-relaxed mb-10 max-w-lg"
              style={{ fontSize: "1.05rem", fontWeight: 300 }}
            >
              Aqui, cada treino é um teste. Cada gota de suor, uma vitória. Você não vem apenas
              malhar — vem se transformar de dentro pra fora.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#planos"
                className="btn-ember animate-glow-pulse font-display font-black px-9 py-3.5 bg-ember text-charcoal text-sm uppercase tracking-widest hover:bg-ember-light transition-colors"
              >
                Ver Planos
              </a>
              <a
                href="#sobre"
                className="font-display font-bold px-9 py-3.5 border border-steel-400 text-ice text-sm uppercase tracking-widest hover:border-ember hover:text-ember transition-all"
              >
                Conhecer a FORJA
              </a>
            </div>

            <div className="flex gap-10 flex-wrap">
              {HERO_STATS.map(({ num, label }) => (
                <div key={label} className="border-l-2 border-ember/30 pl-4">
                  <div
                    className="font-display font-black text-ember leading-tight"
                    style={{ fontSize: "1.75rem" }}
                  >
                    {num}
                  </div>
                  <div className="text-steel-400 text-xs uppercase tracking-widest mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative flex-shrink-0">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                border: "1px solid rgba(249,115,22,0.15)",
                transform: "translate(-10px, -10px)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: "1px solid #222", transform: "translate(10px, 10px)" }}
            />
            <img
              src={IMAGES.heroAthlete}
              srcSet={IMAGE_SRCSETS.heroAthlete}
              sizes="(min-width: 1280px) 320px, 288px"
              width={IMAGE_DIMENSIONS.heroAthlete.width}
              height={IMAGE_DIMENSIONS.heroAthlete.height}
              alt="Atleta em treino intenso na FORJA"
              loading="lazy"
              className="relative w-72 xl:w-80 object-cover"
              style={{ filter: "grayscale(70%) contrast(1.15) brightness(0.85)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 40%), linear-gradient(to right, transparent 60%, rgba(249,115,22,0.08) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-pulse">
        <span className="text-steel-400 text-[10px] uppercase tracking-[0.4em]">Role</span>
        <div className="w-px h-12 bg-gradient-to-b from-ember/50 to-transparent" />
      </div>
    </section>
  );
}

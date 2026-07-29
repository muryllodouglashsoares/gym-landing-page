export function CtaFinal() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden" style={{ background: "#f97316" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(0,0,0,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="inline-block border border-charcoal/20 font-display font-bold text-charcoal text-[10px] uppercase tracking-[0.4em] px-5 py-2 mb-8">
          Começe Agora · Primeira Semana Grátis
        </div>
        <h2
          className="font-display font-black text-charcoal uppercase leading-[0.88] mb-6"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
        >
          SUA FORJA
          <br />
          COMEÇA
          <br />
          HOJE.
        </h2>
        <p
          className="text-charcoal/70 mb-12 max-w-lg mx-auto"
          style={{ fontWeight: 300, fontSize: "1.1rem" }}
        >
          Sem desculpas. Sem amanhã. Cada dia sem treinar é um dia a menos para ser quem você quer
          ser.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contato"
            className="px-12 py-4 bg-charcoal font-display font-black text-ice text-sm uppercase tracking-widest hover:bg-steel-900 transition-colors btn-ember"
          >
            Agendar Aula Experimental
          </a>
          <a
            href="#planos"
            className="px-12 py-4 border-2 border-charcoal/30 font-display font-black text-charcoal text-sm uppercase tracking-widest hover:border-charcoal transition-colors"
          >
            Ver Planos
          </a>
        </div>
      </div>
    </section>
  );
}

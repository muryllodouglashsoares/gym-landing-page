import { CONTACT, WHATSAPP_URL, INSTAGRAM_URL } from "./data";
import { IconInstagram, IconWhatsapp } from "./icons";
import { BrandMark } from "./shared";

const FOOTER_LINKS = ["Sobre", "Modalidades", "Planos", "Equipe", "Galeria", "Contato"];

export function Footer() {
  return (
    <footer className="border-t border-steel-700 py-12 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-10 items-center mb-10">
          <div className="flex items-center gap-3">
            <BrandMark />
          </div>

          <div className="flex flex-wrap gap-6 md:justify-center">
            {FOOTER_LINKS.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="font-display font-bold text-steel-400 hover:text-ember text-xs uppercase tracking-widest transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 border border-steel-700 flex items-center justify-center text-steel-400 hover:border-ember hover:text-ember transition-all"
            >
              <IconInstagram />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 border border-steel-700 flex items-center justify-center text-steel-400 hover:border-ember hover:text-ember transition-all"
            >
              <IconWhatsapp />
            </a>
          </div>
        </div>

        <div className="border-t border-steel-700 pt-6 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-steel-400 text-xs">
            © {new Date().getFullYear()} FORJA Training Studio. Todos os direitos reservados.
          </p>
          <p className="text-steel-400 text-xs">
            {CONTACT.address} · {CONTACT.cref}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { NAV_LINKS } from "./data";
import { BrandMark } from "./shared";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #222" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
        <a href="#hero" className="flex items-center gap-3">
          <BrandMark />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display font-bold text-steel-300 hover:text-ice text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="hidden lg:block btn-ember font-display font-black px-7 py-2.5 bg-ember text-charcoal text-sm uppercase tracking-widest hover:bg-ember-light transition-colors"
        >
          Agendar Aula
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-ice"
          aria-label="Menu"
          aria-expanded={open}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className="block h-0.5 bg-ice transition-all duration-300 origin-center"
              style={{ transform: open ? "translateY(9px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-0.5 bg-ice transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-0.5 bg-ice transition-all duration-300 origin-center"
              style={{ transform: open ? "translateY(-9px) rotate(-45deg)" : "none" }}
            />
          </div>
        </button>
      </div>

      <div
        className="lg:hidden overflow-hidden transition-all duration-300 bg-steel-900 border-t border-steel-700"
        style={{ maxHeight: open ? "400px" : "0" }}
      >
        <div className="px-6 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-display font-extrabold text-ice text-xl uppercase tracking-widest border-b border-steel-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center py-4 bg-ember font-display font-black text-charcoal text-sm uppercase tracking-widest"
          >
            Agendar Aula
          </a>
        </div>
      </div>
    </nav>
  );
}
